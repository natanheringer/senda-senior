import type { ManualChapter } from './types'

/**
 * Conteúdo do Manual Prevent Care.
 *
 * ⚠️  Este conteúdo é DEMO/curadoria. Quando a editora finalizar
 *     a versão definitiva e migrarmos para Supabase, esta constante
 *     vira uma função `getManualChapters()` que consulta a tabela
 *     `manual_chapters` (com RLS por entitlement do usuário).
 *
 *     A interface pública (`ManualChapter`) deve permanecer estável
 *     para que `DigitalReader` e rotas não precisem mudar.
 */
export const manualChapters: ManualChapter[] = [
  {
    slug: 'apresentacao',
    title: 'Apresentação: Cuidar antes é um ato de amor',
    subtitle: 'Introdução ao Prevent Care',
    content: [
      'Você tem pais ativos, autônomos e independentes. Conversas sobre o futuro ainda parecem prematuras. Mas a verdade é que a maioria das famílias só começa a planejar o cuidado após um imprevisto, como uma queda, uma internação ou uma decisão tomada sob pressão extrema.',
      'O Prevent Care propõe o caminho inverso.',
      'Este manual foi criado para famílias como a sua, que entendem que o envelhecimento é um processo natural e que merece estratégia, diálogo e organização. Não é alarmismo. É inteligência emocional transformada em ação prática.',
      'Para quem é este manual:',
      '• Filhos de pais idosos totalmente autônomos;',
      '• Famílias que desejam evitar decisões precipitadas;',
      '• Pessoas que querem envelhecer com mais segurança e dignidade;',
      '• Profissionais que acompanham famílias em transição e buscam estruturação.',
      'Você não precisa ler tudo de uma vez. Este é um guia de reflexão, conversa e ação. Alguns capítulos convidam à observação, e outros, à decisão imediata. O mais importante é dar o primeiro passo.',
    ],
  },
  {
    slug: '1-entendendo-prevent-care',
    title: 'Cap. 1: Entendendo o Prevent Care',
    subtitle: 'Autonomia hoje, planejamento agora',
    content: [
      'Prevent Care é o cuidado que começa antes da urgência. É a escolha consciente de enxergar o envelhecimento não como um problema que surge de repente, mas como um processo natural, contínuo e previsível que merece planejamento estratégico e antecipado.',
      'Em termos simples, cuidado preventivo é se organizar enquanto ainda está tudo bem, para que as decisões importantes não precisem ser tomadas no susto, no cansaço, na culpa ou na dor excruciante de um corredor de hospital.',
      'Cuidar de forma preventiva significa organizar informações antes que se dispersem, fortalecer diálogos enquanto há autonomia completa intelectual, observar sinais com atenção (e não apenas com desespero reativo), e focar legalmente no dia de amanhã.',
      '### Autonomia e Lucidez',
      'Um dos obstáculos mais comuns é a ideia de que este planejamento significa assumir que o idoso “não dá mais conta sozinho”. Muitas famílias agem ativamente dizendo "Eles estão bem, não é o momento para essa conversa". O problema é que essas frases vêm de uma falsa sensação de invulnerabilidade. No entanto, estar bem hoje no ápice da lucidez é exatamente o momento fundamental para ditar regras para o amanhã.',
      'A premissa mestre: **Quando o idoso participa das referidas decisões com lucidez, ele blinda o controle de suas escolhas futuras perante parentes desconexos.**',
      '### O que muda na prática',
      'Na vida real evitar decisões em crise reduz despesas avassaladoras em urgências, bloqueia a paralisia decisória dos parentes (se perguntando se assinam ou não) e alivia as culpas emocionais das gerações.',
    ],
  },
  {
    slug: '2-comunicacao-e-parceria',
    title: 'Cap. 2: Comunicação Familiar',
    subtitle: 'Como iniciar conversas limpas e vitais',
    content: [
      'A comunicação é a matéria-prima do Prevent Care. Antes de criar planilhas ou delegar funções logísticas existe a etapa emocional mais fundamental: solidificar a parceria do cuidado.',
      'O objetivo não é sequestrar o controle paterno/materno, mas engajá-los na estruturação das escolhas. Conversas estruturadas quebram o ciclo natural brasileiro de falha: susto → desespero na pressa → decisão difícil cega → culpa generalizada → brigas de irmãos.',
      '### Abrindo com empatia',
      'A ordem central é que usar linguagem de proteção vale mil vezes mais que usar linguagens corretivas. Nunca comece com "você não consegue mais"; inicie sempre focando na segurança: "o que te garante paz nessa rotina?".',
      '1. **Onde e Como:** "Mãe, onde ficam esses exames e a lista antiga apenas para se eu precisar pegar nas pressas e te levar pro médico?" (Isso introduz indiretamente organização sistêmica).',
      '2. **Líder de Vontade:** "Se você fosse sedado hoje, quem você queria de fato que tomasse a decisão por você?"',
      '3. **Âncoras de Dignidade:** "Quais coisas do seu dia que te fazem sentir livre? Café sozinho na varanda? Lavar com as próprias mãos a camisa predileta?" Entenda, anote os ritos que deverão ser lutados até o limite pela família.',
    ],
  },
  {
    slug: '3-vitalidade-em-dia',
    title: 'Cap. 3: Vitalidade e Inteligência em Dia',
    subtitle: 'Saúde não se foca apenas em reativo',
    content: [
      'As consultas preventivas aos médicos anuais (foco Geriátrico contínuo) são engrenagens pesadas pela integridade física. O objetivo principal do acompanhamento é antecipar as comorbidades de atrito contínuo, não debelar um câncer ou enfarte surpresa.',
      'A desorganização caótica das fichas e remédios é a principal fábrica de estresse agudo da terceira idade. É inadmissível que idosos não tenham listas dinâmicas validadas em nuvem com seus descendentes.',
      '### O Histórico Ativo',
      'Mantenha ativamente o Documento Mestre. Todos os irmãos, cuidadores ou netos mais velhos precisam do QR ou link instantâneo das restrições e dosagens pesadas.',
      'Centralizar previne interações cruzadas de iatrogenia severa nas internações aleatórias. Ter em punhos uma cartilha completa do portador agiliza de modo letal a tomada de ação da enfermagem nos plantões difíceis das UTIs.',
    ],
  },
]

export function getChapterBySlug(slug: string): ManualChapter | undefined {
  return manualChapters.find((c) => c.slug === slug)
}

export function getChapterSlugs(): string[] {
  return manualChapters.map((c) => c.slug)
}
