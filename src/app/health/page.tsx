import { requireUser } from "@/lib/server";
import { Button } from "@/design";

export const dynamic = "force-dynamic";

export default async function HealthPage() {
  await requireUser();

  return (
    <div className="min-h-screen bg-cream">
      <div className="container mx-auto px-4 py-12">
        <h1 className="mb-6 font-serif text-[clamp(32px,4vw,48px)] font-semibold leading-[1.15] tracking-[-0.02em] text-ink">
          Saúde
        </h1>
        
        <div className="rounded-[20px] border border-terracotta-light bg-white/80 px-8 py-10">
          <h2 className="mb-4 font-serif text-[clamp(24px,3vw,32px)] font-semibold text-terracotta">
            Organize seus documentos de saúde
          </h2>
          
          <p className="mb-6 text-base leading-[1.7] text-terracotta-light/80">
            Esta página está em construção. Aqui você poderá armazenar e organizar documentos como:
          </p>
          
          <div className="space-y-3 pl-5">
            <p>• Laudos e exames médicos</p>
            <p>• Receitas e comprovantes de medicamentos</p>
            <p>• Histórico de internações e cirurgias</p>
            <p>• Planos de saúde e cartões de convênio</p>
            <p>• Documentos de plano de cuidados e directives antecipadas</p>
          </div>
          
          <Button 
            variant="primary" 
            size="md"
            className="w-full max-w-xs"
          >
            Adicionar Documento de Saúde
          </Button>
        </div>
      </div>
    </div>
  );
}