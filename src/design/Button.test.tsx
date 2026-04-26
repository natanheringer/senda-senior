import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './Button';

describe('Button Component', () => {
  test('renders primary button with correct styles', () => {
    render(<Button>Primary Button</Button>);
    
    const button = screen.getByRole('button', { name: /primary button/i });
    expect(button).toBeInTheDocument();
    
    // Check for primary variant classes (terracotta background, white text)
    expect(button).toHaveClass('bg-terracotta');
    expect(button).toHaveClass('text-white');
  });

  test('renders secondary button with correct styles', () => {
    render(<Button variant="secondary">Secondary Button</Button>);
    
    const button = screen.getByRole('button', { name: /secondary button/i });
    expect(button).toBeInTheDocument();
    
    // Check for secondary variant classes (border, green text)
    expect(button).toHaveClass('border-[1.5px]');
    expect(button).toHaveClass('border-green');
    expect(button).toHaveClass('text-green');
  });

  test('renders ghost button with correct styles', () => {
    render(<Button variant="ghost">Ghost Button</Button>);
    
    const button = screen.getByRole('button', { name: /ghost button/i });
    expect(button).toBeInTheDocument();
    
    // Check for ghost variant classes (transparent background)
    expect(button).toHaveClass('bg-transparent');
    expect(button).toHaveClass('text-green');
  });

  test('renders danger button with correct styles', () => {
    render(<Button variant="danger">Danger Button</Button>);
    
    const button = screen.getByRole('button', { name: /danger button/i });
    expect(button).toBeInTheDocument();
    
    // Check for danger variant classes
    expect(button).toHaveClass('border-[1.5px]');
    expect(button).toHaveClass('bg-[var(--color-danger-soft)]');
    expect(button).toHaveClass('text-[var(--color-danger)]');
  });

  test('renders different sizes correctly', () => {
    // Test small size
    render(<Button size="sm">Small Button</Button>);
    const smButton = screen.getByRole('button', { name: /small button/i });
    expect(smButton).toHaveClass('text-[13px]');
    expect(smButton).toHaveClass('px-5');
    expect(smButton).toHaveClass('py-2.5');

    // Test medium size (default)
    render(<Button size="md">Medium Button</Button>);
    const mdButton = screen.getByRole('button', { name: /medium button/i });
    expect(mdButton).toHaveClass('text-[15px]');
    expect(mdButton).toHaveClass('px-9');
    expect(mdButton).toHaveClass('py-[17px]');

    // Test large size
    render(<Button size="lg">Large Button</Button>);
    const lgButton = screen.getByRole('button', { name: /large button/i });
    expect(lgButton).toHaveClass('text-[16px]');
    expect(lgButton).toHaveClass('px-11');
    expect(lgButton).toHaveClass('py-5');
  });

  test('handles click events', async () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Clickable Button</Button>);
    
    const button = screen.getByRole('button', { name: /clickable button/i });
    await userEvent.click(button);
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('respects disabled state', () => {
    render(<Button disabled>Disabled Button</Button>);
    
    const button = screen.getByRole('button', { name: /disabled button/i });
    expect(button).toBeDisabled();
    expect(button).toHaveClass('disabled:opacity-60');
    expect(button).toHaveClass('disabled:cursor-not-allowed');
  });

  test('renders with leading and trailing icons', () => {
    const Icon = () => <span>icon</span>;
    render(
      <Button leadingIcon={<Icon />} trailingIcon={<Icon />}>
        Button with Icons
      </Button>
    );
    
    const button = screen.getByRole('button', { name: /button with icons/i });
    expect(button).toBeInTheDocument();
    
    // Check that icons are rendered
    const icons = button.querySelectorAll('span');
    expect(icons).toHaveLength(3); // leading icon, text, trailing icon
    expect(icons[0].textContent).toBe('icon');
    expect(icons[2].textContent).toBe('icon');
  });
});