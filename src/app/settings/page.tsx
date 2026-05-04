import { requireUser } from "@/lib/server";
import { Button } from "@/design";

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  await requireUser();

  return (
    <div className="min-h-screen bg-cream">
      <div className="container mx-auto px-4 py-12">
        <h1 className="mb-6 font-serif text-[clamp(32px,4vw,48px)] font-semibold leading-[1.15] tracking-[-0.02em] text-ink">
          Configurações
        </h1>
        
        <div className="grid gap-8 md:grid-cols-2">
          {/* Account Settings */}
          <div className="rounded-[20px] border border-terracotta-light bg-white/80 px-8 py-10">
            <h2 className="mb-4 font-serif text-[clamp(24px,3vw,32px)] font-semibold text-terracotta">
              Conta
            </h2>
            
            <p className="mb-6 text-base leading-[1.7] text-terracotta-light/80">
              Esta página está em construção. Aqui você poderá gerenciar suas preferências de conta.
            </p>
            
            <div className="space-y-4">
              <p><strong>Preferências de notificação:</strong> Em construção</p>
              <p><strong>Idioma:</strong> Português (Brasil)</p>
              <p><strong>Fuso horário:</strong> Horário de Brasília</p>
            </div>
          </div>
          
          {/* Security Settings */}
          <div className="rounded-[20px] border border-terracotta-light bg-white/80 px-8 py-10">
            <h2 className="mb-4 font-serif text-[clamp(24px,3vw,32px)] font-semibold text-terracotta">
              Segurança
            </h2>
            
            <p className="mb-6 text-base leading-[1.7] text-terracotta-light/80">
              Esta página está em construção. Aqui você poderá gerenciar sua senha e segurança da conta.
            </p>
            
            <Button 
              variant="secondary" 
              size="md"
              className="w-full max-w-xs"
            >
              Alterar Senha
            </Button>
            
            <Button 
              variant="secondary" 
              size="md"
              className="w-full max-w-xs mt-4"
            >
              Configurar Verificação em Duas Etapas
            </Button>
          </div>
        </div>
        
        <div className="mt-8">
          <Button 
            variant="danger" 
            size="md"
            className="w-full max-w-xs"
          >
            Excluir Conta
          </Button>
        </div>
      </div>
    </div>
  );
}