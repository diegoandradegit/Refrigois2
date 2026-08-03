// Conteudo da landing em um arquivo so.
//
// A base tecnica veio do servico de instalacao de camara fria do site
// principal (mesmo levantamento, mesmas etapas, mesma garantia). O texto foi
// reescrito para pagina de anuncio: mais direto, focado em quem chega frio
// pelo Google e esta comparando fornecedores na mesma aba.

export const WHATSAPP = '5544999368420';
export const TELEFONE = '+5544999368420';

export function linkWhatsApp(mensagem: string): string {
  return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(mensagem)}`;
}

/** Endpoint que grava o lead. Configuravel para nao ficar preso ao ambiente. */
export const ENDPOINT_LEAD =
  import.meta.env.VITE_ENDPOINT_LEAD ??
  'https://mpdlwheqvggbfxkhbtqg.supabase.co/functions/v1/lead-landing';

/** Bloco 2 — o visitante precisa se reconhecer em segundos. */
export const SEGMENTOS = [
  {
    slug: 'acougues',
    nome: 'Açougue',
    linha: 'Resfriados com temperatura estável e porta abrindo o dia inteiro',
  },
  {
    slug: 'supermercados',
    nome: 'Supermercado',
    linha: 'Estoque de alto giro, resfriados e congelados no mesmo espaço',
  },
  {
    slug: 'restaurantes',
    nome: 'Restaurante',
    linha: 'Espaço reduzido e produto que entra ainda quente da produção',
  },
  {
    slug: 'padarias',
    nome: 'Padaria',
    linha: 'Porta abrindo dezenas de vezes por dia sem perder temperatura',
  },
  {
    slug: 'distribuidoras',
    nome: 'Distribuidora',
    linha: 'Câmara com porta de vidro para exposição e autosserviço',
  },
  {
    slug: 'farmacias',
    nome: 'Farmácia',
    linha: 'Controle rigoroso e registro de temperatura para fiscalização',
  },
];

/** Bloco 3 — o custo de errar. É o bloco que converte em serviço técnico. */
export const ERROS = [
  {
    erro: 'Capacidade calculada pelo tamanho da câmara',
    consequencia:
      'O cálculo correto parte da carga térmica: o que entra, em que temperatura e com que frequência. Dimensionar pelo volume dá conta no dia da entrega e falha no primeiro dia de calor.',
  },
  {
    erro: 'Painel fino demais para a temperatura de trabalho',
    consequencia:
      'A câmara até alcança a temperatura, mas o compressor trabalha mais para manter. A diferença não aparece na entrega — aparece na conta de energia, todo mês, pelos próximos anos.',
  },
  {
    erro: 'Condensadora em local sem ventilação',
    consequencia:
      'Sem troca de calor adequada, o sistema perde rendimento justamente quando mais se precisa dele. É a causa mais comum de câmara que não segura temperatura em dia quente.',
  },
  {
    erro: 'Infraestrutura elétrica improvisada',
    consequencia:
      'Funciona no começo e vira chamado recorrente depois. Refazer a elétrica com a câmara já montada custa muito mais do que fazer certo na instalação.',
  },
];

/** Bloco 4 — etapa com nome próprio é prova de método. */
export const ETAPAS = [
  {
    titulo: 'Levantamento',
    texto:
      'Conversamos sobre o que será armazenado, em que temperatura e com que movimento. Avaliamos o espaço, o local para a condensadora e a capacidade elétrica existente.',
  },
  {
    titulo: 'Projeto e proposta',
    texto:
      'Definimos capacidade do sistema, espessura do painel, tipo de porta e sistema de degelo. Você recebe a especificação do que será instalado, item por item.',
  },
  {
    titulo: 'Execução',
    texto:
      'Montagem dos painéis, unidades condensadora e evaporadora, tubulação frigorífica, dreno e ligação elétrica. Acompanhado por quem fez o projeto, não por terceiros.',
  },
  {
    titulo: 'Partida e entrega',
    texto:
      'Sistema em operação, parâmetros ajustados, temperatura conferida em regime e a rotina de uso explicada — o que evita chamado desnecessário depois.',
  },
];

/** Bloco 5 — obra real com foto. É o que portal de cotação não tem. */
export const OBRAS = [
  {
    titulo: 'Câmara frigorífica industrial',
    linha: 'Painéis isotérmicos e sistema dimensionado para alto volume',
    imagem: 'camara-frigorifica-industrial',
    alt: 'Câmara frigorífica industrial construída em painéis isotérmicos pela Refrigóis',
  },
  {
    titulo: 'Câmara com portas de vidro',
    linha: 'Exposição e autosserviço sem abrir a câmara inteira',
    imagem: 'camara-fria-portas-vidro',
    alt: 'Câmara fria com portas de vidro para distribuidora de bebidas',
  },
  {
    titulo: 'Câmara resfriada com prateleiras',
    linha: 'Organização interna pensada para o giro do produto',
    imagem: 'camara-fria-prateleiras',
    alt: 'Interior de câmara fria com prateleiras em aço inox',
  },
  {
    titulo: 'Refrigeração para supermercado',
    linha: 'Resfriados e congelados na mesma operação',
    imagem: 'refrigeracao-de-supermercado',
    alt: 'Sistema de refrigeração instalado em supermercado',
  },
  {
    titulo: 'Refrigeração para açougue',
    linha: 'Balcões e câmara integrados ao fluxo da loja',
    imagem: 'acougue-sao-jose-balcao-1',
    alt: 'Balcão refrigerado e câmara instalados em açougue',
  },
  {
    titulo: 'Refrigeração para farmácia',
    linha: 'Controle rigoroso para produtos termossensíveis',
    imagem: 'refrigeracao-para-farmacia',
    alt: 'Equipamento de refrigeração instalado em farmácia',
  },
];

/** Bloco 6 — cada item responde a um receio concreto, não é lista de adjetivos. */
export const DIFERENCIAIS = [
  {
    titulo: 'Você fala com quem fabrica',
    texto:
      'Seu contato não é distribuído para uma lista de fornecedores. Quem atende é quem projeta, fabrica e instala.',
  },
  {
    titulo: 'Atendemos longe de verdade',
    texto:
      'Obras entregues em Guaíra, Cascavel, Londrina e Foz do Iguaçu. Não é área de atendimento no papel — é obra executada.',
  },
  {
    titulo: 'Projeto sob medida',
    texto:
      'A câmara é dimensionada para o seu produto, o seu movimento e o espaço que você tem, e não escolhida de um catálogo fechado.',
  },
  {
    titulo: 'Depois da entrega continua',
    texto:
      'Manutenção, higienização e reforma com equipe própria. A mesma empresa que instalou é quem assiste.',
  },
  {
    titulo: '12 meses de garantia',
    texto: 'Garantia de 12 meses para a instalação completa.',
  },
  {
    titulo: '15 anos de estrada',
    texto:
      'Refrigeração comercial é o que fazemos desde sempre — não é uma linha a mais dentro de outra atividade.',
  },
];

/** Bloco 7 — ficha curta. Serve ao comprador técnico e sinaliza competência ao leigo. */
export const FICHA = [
  { rotulo: 'Resfriados', valor: '0 °C a 5 °C' },
  { rotulo: 'Congelados', valor: '−18 °C a −25 °C' },
  { rotulo: 'Painel isotérmico', valor: 'EPS ou PUR, espessura conforme o projeto' },
  { rotulo: 'Degelo', valor: 'Elétrico ou a gás quente' },
  { rotulo: 'Portas', valor: 'Giro, correr ou vidro (walk-in cooler / beer cave)' },
  { rotulo: 'Porte', valor: 'De pequeno comércio a industrial' },
];

/** Bloco 8 — cada pergunta remove um motivo de não preencher o formulário. */
export const FAQ = [
  {
    p: 'O que vocês precisam saber para dimensionar a câmara?',
    r: 'Quatro informações resolvem a maior parte do cálculo: o que será armazenado, em que temperatura, quantas vezes a porta abre por dia e se o produto entra frio ou ainda quente. Com isso, mais o espaço disponível e o ponto de instalação da condensadora, o dimensionamento sai de base técnica em vez de estimativa.',
  },
  {
    p: 'Dá para instalar câmara fria em espaço pequeno?',
    r: 'Dá, e é situação comum em restaurantes e padarias. O que limita não costuma ser o espaço interno, e sim encontrar um local ventilado para a condensadora dissipar calor. Esse ponto é avaliado no levantamento, antes de qualquer definição.',
  },
  {
    p: 'Vocês atendem fora de Maringá?',
    r: 'Sim. A base é Maringá e atendemos todo o Paraná para projetos agendados. Já executamos obras em Guaíra, Cascavel, Londrina e Foz do Iguaçu.',
  },
  {
    p: 'A câmara pode ser ampliada depois?',
    r: 'Em muitos casos sim, por ser construída em painéis modulares. Mas a ampliação precisa considerar se o sistema comporta a nova carga térmica. Aumentar o volume sem reavaliar a capacidade resulta em câmara que não alcança a temperatura desejada.',
  },
  {
    p: 'Vocês instalam câmara com porta de vidro?',
    r: 'Sim. É a configuração conhecida como walk-in cooler ou beer cave, usada em distribuidoras, bares e lojas de conveniência. Permite exposição e autosserviço sem abrir a câmara inteira a cada retirada.',
  },
  {
    p: 'Qual a diferença entre câmara resfriada e de congelados?',
    r: 'A resfriada trabalha entre 0 °C e 5 °C e serve para carnes frescas, hortifrúti, laticínios e bebidas. A de congelados vai de −18 °C a −25 °C. A diferença não é só o ajuste do termostato: muda a capacidade do sistema, a espessura do painel e o tipo de degelo.',
  },
  {
    p: 'Vocês fazem manutenção depois de instalar?',
    r: 'Fazemos, com equipe própria — manutenção preventiva, corretiva, higienização e reforma. A instalação tem 12 meses de garantia.',
  },
];
