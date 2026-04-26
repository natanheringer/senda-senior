// Mock Supabase client
const mockSupabase = {
  auth: {
    getUser: vi.fn(),
  },
  storage: {
    from: vi.fn().mockReturnValue({
      createSignedUploadUrl: vi.fn(),
      createSignedDownloadUrl: vi.fn(),
      statObject: vi.fn(),
      removeObject: vi.fn(),
    }),
  },
  from: vi.fn().mockReturnValue({
    select: vi.fn().mockReturnThis(),
    eq: vi.fn().mockReturnThis(),
    single: vi.fn().mockResolvedValue({ data: null, error: null }),
    insert: vi.fn().mockReturnThis(),
    update: vi.fn().mockReturnThis(),
    delete: vi.fn().mockReturnThis(),
    upsert: vi.fn().mockResolvedValue({ data: [], error: null }),
  }),
};

// Mock the supabase client
vi.mock('@/lib/supabase/client', () => ({
  supabase: mockSupabase,
}));

// Mock the classifier functions
vi.mock('./classifier', () => ({
  classifyFileName: vi.fn(),
  getUserOverrides: vi.fn(),
  setUserOverrides: vi.fn(),
  clearOverrideCache: vi.fn(),
  extractOverridePattern: vi.fn(),
  createOverride: vi.fn(),
}));

// Mock the validation functions
vi.mock('./validation', () => ({
  validateFileName: vi.fn(),
  validateFileSize: vi.fn(),
  validateFileType: vi.fn(),
  VAULT_LIMITS: {},
}));

// Mock the mappers
vi.mock('./mappers', () => ({
  toVaultFile: vi.fn(),
  toVaultCategory: vi.fn(),
  toVaultTag: vi.fn(),
}));

import { 
  prepareUpload, 
  confirmUpload, 
  getDownloadUrl, 
  updateMetadata, 
  softDelete, 
  restore,
  loadUserOverrides
} from './actions';
import { supabase } from '@/lib/supabase/client';

describe('Vault Actions', () => {
  const mockUser = { id: 'test-user-id', email: 'test@example.com' };
  const mockFile = new File(['test content'], 'test.pdf', { type: 'application/pdf' });

  beforeEach(() => {
    vi.clearAllMocks();
    
    // Mock auth user
    mockSupabase.auth.getUser.mockResolvedValue({ data: { user: mockUser }, error: null });
    
    // Mock storage functions
    mockSupabase.storage.from().createSignedUploadUrl.mockResolvedValue({ 
      data: { signedURL: 'https://example.com/upload' }, 
      error: null 
    });
    mockSupabase.storage.from().createSignedDownloadUrl.mockResolvedValue({ 
      data: { signedURL: 'https://example.com/download' }, 
      error: null 
    });
    mockSupabase.storage.from().statObject.mockResolvedValue({ 
      data: { size: 1024 }, 
      error: null 
    });
    
    // Mock database operations
    mockSupabase.from().select().eq().single().mockResolvedValue({ 
      data: { id: 'test-file-id', user_id: mockUser.id }, 
      error: null 
    });
    mockSupabase.from().insert().mockResolvedValue({ 
      data: [{ id: 'test-file-id' }], 
      error: null 
    });
    mockSupabase.from().update().mockResolvedValue({ 
      data: [{ id: 'test-file-id' }], 
      error: null 
    });
    mockSupabase.from().upsert().mockResolvedValue({ 
      data: [], 
      error: null 
    });
    
    // Mock classifier functions
    require('./classifier').classifyFileName.mockReturnValue({ 
      category: 'juridico', 
      confidence: 0.8, 
      alternatives: [] 
    });
    require('./classifier').getUserOverrides.mockReturnValue([]);
  });

  test('prepareUpload creates signed URL and file record', async () => {
    const result = await prepareUpload(mockFile, 'juridico');
    
    expect(result).toHaveProperty('uploadUrl');
    expect(result).toHaveProperty('fileId');
    expect(mockSupabase.storage.from).toHaveBeenCalledWith('vault-files');
    expect(mockSupabase.storage.from().createSignedUploadUrl).toHaveBeenCalled();
    expect(mockSupabase.from().insert).toHaveBeenCalled();
  });

  test('confirmUpdate updates file metadata', async () => {
    const result = await confirmUpload('test-file-id');
    
    expect(result).toHaveProperty('id', 'test-file-id');
    expect(mockSupabase.from().update).toHaveBeenCalledWith({
      confirmed_at: expect.any(String),
      storage_path: expect.any(String),
    });
    expect(mockSupabase.from().update).toHaveBeenCalledWith(
      { id: 'test-file-id' },
      expect.any(Object)
    );
  });

  test('getDownloadUrl returns signed download URL', async () => {
    const result = await getDownloadUrl('test-file-id');
    
    expect(result).toBe('https://example.com/download');
    expect(mockSupabase.storage.from().createSignedDownloadUrl).toHaveBeenCalled();
  });

  test('updateMetadata handles category changes and creates overrides', async () => {
    // Mock existing file with different category
    mockSupabase.from().select().eq().single().mockResolvedValueOnce({ 
      data: { 
        id: 'test-file-id', 
        user_id: mockUser.id,
        category: 'saude' // Different from new category
      }, 
      error: null 
    });
    
    // Mock override creation
    require('./classifier').extractOverridePattern.mockReturnValue('test_pattern');
    require('./classifier').createOverride.mockReturnValue({
      user_id: mockUser.id,
      pattern: 'test_pattern',
      category: 'juridico',
      weight: 5,
    });
    
    const result = await updateMetadata('test-file-id', { 
      category: 'juridico' // Changing from saude to juridico
    });
    
    expect(result).toHaveProperty('id', 'test-file-id');
    expect(result).toHaveProperty('category', 'juridico');
    
    // Should have called upsert for override creation
    expect(mockSupabase.from().upsert).toHaveBeenCalledWith(
      'vault_classifier_overrides',
      expect.arrayContaining([
        expect.objectContaining({
          user_id: mockUser.id,
          pattern: 'test_pattern',
          category: 'juridico',
          weight: 5,
        })
      ]),
      { onConflict: 'user_id,pattern' }
    );
  });

  test('loadUserOverrides fetches and sets user overrides', async () => {
    const mockOverrides = [
      { user_id: 'test-user', pattern: 'test1', category: 'juridico', weight: 5 },
      { user_id: 'test-user', pattern: 'test2', category: 'saude', weight: 3 },
    ];
    
    mockSupabase.from().select().eq().mockResolvedValue({ 
      data: mockOverrides, 
      error: null 
    });
    
    await loadUserOverrides();
    
    expect(mockSupabase.from).toHaveBeenCalledWith('vault_classifier_overrides');
    expect(mockSupabase.from().select).toHaveBeenCalledWith('*');
    expect(mockSupabase.from().eq).toHaveBeenCalledWith('user_id', mockUser.id);
    expect(require('./classifier').setUserOverrides).toHaveBeenCalledWith(mockOverrides);
  });

  test('softDelete marks file as deleted', async () => {
    const result = await softDelete('test-file-id');
    
    expect(result).toHaveProperty('id', 'test-file-id');
    expect(mockSupabase.from().update).toHaveBeenCalledWith({
      deleted_at: expect.any(String),
    });
  });

  test('restore removes deletion marker', async () => {
    const result = await restore('test-file-id');
    
    expect(result).toHaveProperty('id', 'test-file-id');
    expect(mockSupabase.from().update).toHaveBeenCalledWith({
      deleted_at: null,
    });
  });

  test('handles authentication errors', async () => {
    // Mock unauthenticated user
    mockSupabase.auth.getUser.mockResolvedValue({ data: { user: null }, error: { message: 'Unauthorized' } });
    
    await expect(prepareUpload(mockFile, 'juridico')).rejects.toThrow('Unauthorized');
  });

  test('handles storage errors', async () => {
    // Mock storage error
    mockSupabase.storage.from().createSignedUploadUrl.mockResolvedValue({ 
      data: null, 
      error: { message: 'Storage error' } 
    });
    
    await expect(prepareUpload(mockFile, 'juridico')).rejects.toThrow('Storage error');
  });
});