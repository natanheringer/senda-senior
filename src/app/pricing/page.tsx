import { requireUser } from "@/lib/server";
import { Button } from "@/design";

export const dynamic = "force-dynamic";

export default async function PricingPage() {
  await requireUser();

  return (
    <div className="min-h-screen bg-cream">
      <div className="container mx-auto px-4 py-12">
        <h1 className="mb-6 font-serif text-[clamp(32px,4vw,48px)] font-semibold leading-[1.15] tracking-[-0.02em] text-ink">
          Planos e Preços
        </h1>
        
        <div className="rounded-[20px] border border-terracotta-light bg-white/80 px-8 py-10">
          <h2 className="mb-4 font-serif text-[clamp(24px,3vw,32px)] font-semibold text-terracotta">
            Escolha o plano ideal para suas necessidades
          </h2>
          
          <p className="mb-6 text-base leading-[1.7] text-terracotta-light/80">
            Esta página está em construção. Aqui você poderá visualizar nossos planos de assinatura e comparar os recursos disponíveis.
          </p>
          
          <div className="grid gap-6 md:grid-cols-3">
            {/* Free Plan */}
            <div className="rounded-[16px] border border-terracotta-light/50 bg-white/70 p-6">
              <h3 className="mb-3 font-serif text-[clamp(20px,2.5vw,24px)] font-semibold text-terracotta">
                Gratuito
              </h3>
              <p className="mb-4 text-base leading-[1.6] text-terracotta-light/80">
                Ideal para quem está começando a organizar documentos essenciais
              </p>
              <ul className="space-y-2 mb-6 text-sm leading-[1.6] text-terracotta-light/80">
                <li>• Até 1GB de armazenamento</li>
                <li>• Classificação automática de documentos</li>
                <li>• Acesso básico ao manual prevent care</li>
                <li>• Suporte por email</li>
              </ul>
              <Button 
                variant="secondary" 
                size="sm"
                className="w-full"
              >
                Começar Grátis
              </Button>
            </div>
            
            {/* Premium Plan */}
            <div className="rounded-[16px] border border-terracotta-light/50 bg-white/70 p-6">
              <h3 className="mb-3 font-serif text-[clamp(20px,2.5vw,24px)] font-semibold text-terracotta">
                Premium
              </h3>
              <p className="mb-4 text-base leading-[1.6] text-terracotta-light/80">
                Para famílias que precisam de organização completa e avançada
              </p>
              <ul className="space-y-2 mb-6 text-sm leading-[1.6] text-terracotta-light/80">
                <li>• Até 10GB de armazenamento</li>
                <li>• Classificação avançada com IA</li>
                <li>• Acesso completo ao manual prevent care</li>
                <li>• Checklist de cuidados personalizado</li>
                <li>• Suporte prioritário</li>
                <li>• Compartilhamento seguro com familiares</li>
              </ul>
              <Button 
                variant="primary" 
                size="sm"
                className="w-full"
              >
                Assinar Premium
              </Button>
            </div>
            
            {/* Enterprise Plan */}
            <div className="rounded-[16px] border border-terracotta-light/50 bg-white/70 p-6">
              <h3 className="mb-3 font-serif text-[clamp(20px,2.5vw,24px)] font-semibold text-terracotta">
                Enterprise
              </h3>
              <p className="mb-4 text-base leading-[1.6] text-terracotta-light/80">
                Para profissionais e instituições que atendem múltiplas famílias
              </p>
              <ul className="space-y-2 mb-6 text-sm leading-[1.6] text-terracotta-light/80">
                <li>• Armazenamento ilimitado</li>
                <li>• Gestão de múltiplos usuários e famílias</li>
                <li>• Relatórios e analytics avançados</li>
                <li>• Integração com sistemas existentes</li>
                <li>• Suporte dedicado 24/7</li>
                <li>• Treinamento e implementação personalizada</li>
              </ul>
              <Button 
                variant="secondary" 
                size="sm"
                className="w-full"
              >
                Solicitar Demonstração
              </Button>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-base leading-[1.7] text-terracotta-light/80">
              Todos os planos incluem atualizações regulares e novos recursos conforme lançados.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}