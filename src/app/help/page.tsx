import { requireUser } from "@/lib/server";


export const dynamic = "force-dynamic";

export default async function HelpPage() {
  await requireUser();

  return (
    <div className="min-h-screen bg-cream">
      <div className="container mx-auto px-4 py-12">
        <h1 className="mb-6 font-serif text-[clamp(32px,4vw,48px)] font-semibold leading-[1.15] tracking-[-0.02em] text-ink">
          Ajuda e Suporte
        </h1>
        
        <div className="grid gap-8 md:grid-cols-2">
          {/* FAQ Section */}
          <div className="rounded-[20px] border border-terracotta-light bg-white/80 px-8 py-10">
            <h2 className="mb-4 font-serif text-[clamp(24px,3vw,32px)] font-semibold text-terracotta">
              Perguntas Frequentes
            </h2>
            
            <p className="mb-6 text-base leading-[1.7] text-terracotta-light/80">
              Esta página está em construção. Aqui você encontrará respostas para as dúvidas mais comuns sobre o uso da Senda Sênior.
            </p>
            
            <div className="space-y-4">
              <div className="border-b pb-3">
                <h3 className="font-semibold text-terracotta mb-2">Como faço para começar a usar a plataforma?</h3>
                <p className="text-terracotta-light/80">Resposta em construção...</p>
              </div>
              
              <div className="border-b pb-3">
                <h3 className="font-semibold text-terracotta mb-2">Quais tipos de documentos posso armazenar?</h3>
                <p className="text-terracotta-light/80">Resposta em construção...</p>
              </div>
              
              <div className="border-b pb-3">
                <h3 className="font-semibold text-terracotta mb-2">Meus dados estão seguros?</h3>
                <p className="text-terracotta-light/80">Resposta em construção...</p>
              </div>
            </div>
          </div>
          
          {/* Support Contact */}
          <div className="rounded-[20px] border border-terracotta-light bg-white/80 px-8 py-10">
            <h2 className="mb-4 font-serif text-[clamp(24px,3vw,32px)] font-semibold text-terracotta">
              Fale Conosco
            </h2>
            
            <p className="mb-6 text-base leading-[1.7] text-terracotta-light/80">
              Esta página está em construção. Aqui você encontrará nossos canais de suporte para ajudar com qualquer dúvida ou problema.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  {/* Placeholder for icon */}
                  <div className="w-6 h-6 rounded-[8px] bg-terracotta-light flex items-center justify-center">
                    <span className="text-white text-xs">📧</span>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-terracotta mb-1">Email de Suporte</h3>
                  <p className="text-terracotta-light/80">suporte@sendasenior.com.br</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-6 h-6 rounded-[8px] bg-terracotta-light flex items-center justify-center">
                    <span className="text-white text-xs">📞</span>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-terracotta mb-1">Telefone</h3>
                  <p className="text-terracotta-light/80">+55 (11) 99999-9999</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-6 h-6 rounded-[8px] bg-terracotta-light flex items-center justify-center">
                    <span className="text-white text-xs">💬</span>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-terracotta mb-1">Chat Online</h3>
                  <p className="text-terracotta-light/80">Disponível em horário comercial</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}