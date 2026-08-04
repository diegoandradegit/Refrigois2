// Conteudo da landing.
//
// Regra deste arquivo: se um item nao muda a decisao de quem esta lendo, ele
// nao entra. Pagina de anuncio nao e catalogo. Cada bloco a mais e mais um
// motivo para o visitante rolar sem ler e sair.
//
// Area de atendimento: Parana. Nao citamos a cidade-sede na copy, porque quem
// busca de Cascavel ou de Londrina precisa se sentir atendido, e nao avisado
// de que a empresa fica longe.

/**
 * Dados oficiais, os mesmos do site principal.
 *
 * Nao ha link de WhatsApp nesta pagina de proposito: cada saida alternativa
 * divide a atencao e reduz o preenchimento do formulario, que e o objetivo
 * unico daqui. Telefone e e-mail aparecem so no rodape, como identificacao da
 * empresa, e nao como chamada concorrente.
 */
export const EMPRESA_DADOS = {
  razao: 'Refrigóis Refrigeração Comercial',
  cnpj: '41.179.761/0001-30',
  endereco: 'Rua Pioneira Gertrude Heck Fritzen, 5821 — Conj. João de Barro I',
  cidade: 'Maringá - PR, 87053-124',
  telefone: '(44) 99936-8420',
  telefoneLink: '+5544999368420',
  email: 'contato@refrigois.com.br',
};

export const ENDPOINT_LEAD =
  import.meta.env.VITE_ENDPOINT_LEAD ??
  'https://mpdlwheqvggbfxkhbtqg.supabase.co/functions/v1/lead-landing';

/** Usado so no seletor do formulario. Nao vira secao de cards na pagina. */
export const SEGMENTOS = [
  'Açougue',
  'Supermercado ou mercearia',
  'Restaurante ou cozinha industrial',
  'Padaria ou confeitaria',
  'Distribuidora de bebidas',
  'Bar, choperia ou adega',
  'Hortifrúti',
  'Farmácia ou laboratório',
  'Indústria ou logística',
];

/**
 * Lista de aplicacoes em texto corrido, e nao em grade de cards.
 * Serve para dois publicos: quem chega buscando o proprio caso ("camara fria
 * para acougue", "para chopp") e o Google, que precisa ver que a pagina cobre
 * a categoria inteira, e nao um nicho so.
 */
export const APLICACOES =
  'carnes e resfriados em açougue, estoque de supermercado e mercearia, cozinha de restaurante, padaria e confeitaria, bebidas em distribuidora, barril de chopp em bar e choperia, hortifrúti, medicamentos e imunobiológicos em farmácia e laboratório, congelados e insumos de indústria';

/** Prova. Tres obras grandes; seis fotos pequenas viram enfeite. */
export const OBRAS = [
  {
    titulo: 'Câmara expositora de bebidas',
    tipo: 'walk-in cooler',
    imagem: 'obras/autosservico-bebidas-mercado',
    linha:
      'Autosserviço com portas de vidro: o cliente pega a bebida gelada sem que ninguém abra a câmara inteira. Iluminação em cada porta e prateleiras dimensionadas para giro alto.',
    alt: 'Câmara fria expositora com portas de vidro e prateleiras cheias de bebidas em mercado',
  },
  {
    titulo: 'Câmara expositora para açougue',
    tipo: 'carnes resfriadas',
    imagem: 'obras/expositora-carnes-acougue',
    linha:
      'Peças à vista, na temperatura de trabalho, com controlador digital no painel. Prateleiras em altura útil para carne embalada e produto de venda rápida.',
    alt: 'Câmara expositora com portas de vidro exibindo cortes de carne resfriada em açougue',
  },
  {
    titulo: 'Bebidas e carnes na mesma linha',
    tipo: 'duas temperaturas',
    imagem: 'obras/expositora-bebidas-carnes',
    linha:
      'Duas faixas de temperatura lado a lado, cada uma com o próprio controle. Bebidas de um lado, carnes do outro, sem misturar a operação nem o consumo de energia.',
    alt: 'Expositores com portas de vidro, com bebidas de um lado e carnes do outro',
  },
  {
    titulo: 'Câmara dupla: resfriados e congelados',
    tipo: 'duas câmaras geminadas',
    imagem: 'obras/camara-dupla-resfriado-congelado',
    linha:
      'Duas câmaras compartilhando parede, cada uma com evaporador e controle próprios. Resolve resfriado e congelado no mesmo espaço, ocupando menos área do que duas separadas.',
    alt: 'Duas câmaras frias geminadas em painel isotérmico, com portas frigoríficas e evaporadores',
  },
  {
    titulo: 'Beer cave de conveniência',
    tipo: 'bebidas e chopp',
    imagem: 'obras/camara-expositora-conveniencia',
    linha:
      'Câmara de bebidas construída dentro da loja, com porta de vidro em toda a frente e expositor de gelo ao lado. O estoque gelado vira vitrine.',
    alt: 'Câmara fria de bebidas com portas de vidro instalada em loja de conveniência',
  },
  {
    titulo: 'Acabamento sob medida',
    tipo: 'walk-in cooler',
    imagem: 'obras/camara-expositora-preta',
    linha:
      'A mesma câmara pode receber o acabamento que a loja pede. Aqui, revestimento preto do piso ao teto para acompanhar o projeto visual do salão.',
    alt: 'Câmara fria expositora com acabamento externo preto e portas de vidro',
  },
  {
    titulo: 'Montagem em painel isotérmico',
    tipo: 'execução',
    imagem: 'obras/montagem-camara-loja',
    linha:
      'Painéis encaixados e vedados no local, dentro da loja pronta. Sem obra civil e sem parede erguida: a câmara é construída no ponto onde vai trabalhar.',
    alt: 'Técnico da Refrigóis montando painéis isotérmicos de câmara fria dentro de uma loja',
  },
  {
    titulo: 'Vãos abertos para as portas de vidro',
    tipo: 'execução',
    imagem: 'obras/montagem-paineis-expositora',
    linha:
      'Os vãos são recortados no painel de acordo com o número de portas do projeto. É esta etapa que define quantas portas a loja terá de frente para o cliente.',
    alt: 'Estrutura de câmara fria em painel isotérmico com vãos recortados para portas de vidro',
  },
];

/** Selos de confianca do hero. Curtos: sao lidos em movimento, nao estudados. */
export const SELOS = [
  'Projeto sob medida',
  'Fabricação própria',
  'Instalação completa',
  'Atendimento em todo o Paraná',
];

/**
 * Diferenciais como argumento comercial: o titulo diz o que e, a linha de
 * baixo diz por que isso muda alguma coisa para quem esta comprando.
 */
export const DIFERENCIAIS = [
  {
    titulo: 'Projeto sob medida',
    texto:
      'A câmara é desenhada para o seu espaço e o seu volume, em vez de você ter que adaptar a loja a um tamanho de catálogo.',
  },
  {
    titulo: 'Fabricação própria',
    texto:
      'Sem intermediário entre o que foi combinado e o que é entregue. Você fala com quem projeta e com quem fabrica.',
  },
  {
    titulo: 'Instalação completa',
    texto:
      'Painéis, unidades, tubulação, dreno e elétrica com a mesma equipe. Ninguém empurra responsabilidade para o eletricista da obra.',
  },
  {
    titulo: 'Cálculo de carga térmica',
    texto:
      'A capacidade sai de cálculo, não de estimativa pelo tamanho. É o que separa câmara que segura temperatura no verão da que não segura.',
  },
  {
    titulo: '12 meses de garantia',
    texto:
      'Garantia na instalação completa, com manutenção e higienização feitas pela mesma equipe que montou.',
  },
  {
    titulo: '15 anos de refrigeração comercial',
    texto:
      'É o que fazemos desde sempre, e não uma linha a mais dentro de outra atividade.',
  },
];

/**
 * O que mais encontramos ao corrigir instalacao de terceiros.
 * Tres, e nao quatro: o quarto item enfraquecia os outros tres.
 */
export const ERROS = [
  {
    titulo: 'Capacidade calculada pelo tamanho da câmara',
    texto:
      'O cálculo certo parte da carga térmica: o que entra, em que temperatura e com que frequência a porta abre. Dimensionar pelo volume dá conta na entrega e falha no primeiro dia de calor.',
  },
  {
    titulo: 'Condensadora em local sem ventilação',
    texto:
      'Sem troca de calor adequada, o sistema perde rendimento justamente quando você mais precisa dele. É a causa mais comum de câmara que não segura temperatura no verão.',
  },
  {
    titulo: 'Painel fino demais para a temperatura de trabalho',
    texto:
      'A câmara alcança a temperatura, mas o compressor trabalha mais para manter. A diferença não aparece na entrega. Aparece na conta de luz, todo mês, pelos próximos anos.',
  },
];

/** Jornada em seis passos: mostra que existe metodo, e que nada e improviso. */
export const ETAPAS = [
  {
    titulo: 'Solicitação',
    texto: 'Você preenche o formulário. Retornamos para entender a operação.',
  },
  {
    titulo: 'Análise',
    texto: 'Levantamento do produto, da temperatura, do movimento e do espaço.',
  },
  {
    titulo: 'Projeto',
    texto: 'Capacidade, painel, porta e degelo definidos e especificados item a item.',
  },
  {
    titulo: 'Fabricação',
    texto: 'Produção na nossa estrutura, na medida do que foi projetado.',
  },
  {
    titulo: 'Instalação',
    texto: 'Montagem, tubulação, dreno e elétrica com equipe própria.',
  },
  {
    titulo: 'Entrega',
    texto: 'Partida assistida, temperatura conferida em regime e rotina explicada.',
  },
];

/** Cada pergunta remove um motivo concreto de nao pedir o orcamento. */
export const FAQ = [
  {
    p: 'Vocês atendem a minha cidade?',
    r: 'Atendemos todo o Paraná. Já executamos obras em Guaíra, Cascavel, Londrina e Foz do Iguaçu, então distância não é impedimento para projeto agendado.',
  },
  {
    p: 'Vocês fazem projeto personalizado ou é tamanho de catálogo?',
    r: 'Personalizado. A câmara é montada em painéis, na medida do seu ponto: definimos capacidade, espessura de painel, tipo de porta e degelo a partir do que você armazena e de quanto espaço existe. Isso vale para qualquer tipo, da resfriada de açougue à expositora com portas de vidro.',
  },
  {
    p: 'Que tipos de câmara fria vocês fabricam?',
    r: 'Resfriadas, de congelados, modulares e desmontáveis, expositoras com portas de vidro (walk-in cooler), câmaras de bebidas e chopp (beer cave) e frigoríficas industriais. O tipo é definido no levantamento, a partir do que você armazena e do espaço disponível.',
  },
  {
    p: 'A instalação é feita por vocês mesmos?',
    r: 'Sim, do começo ao fim: painéis, unidades condensadora e evaporadora, tubulação frigorífica, dreno e ligação elétrica, com a nossa equipe. A instalação tem 12 meses de garantia.',
  },
  {
    p: 'Quanto tempo leva?',
    r: 'Depende do porte e da agenda de fabricação, e por isso o prazo é fechado junto com o projeto, no levantamento. O que podemos garantir é que o prazo sai por escrito antes de a produção começar.',
  },
  {
    p: 'E depois de instalar, quem dá assistência?',
    r: 'A mesma equipe. Fazemos manutenção preventiva, corretiva, higienização e reforma, então você não fica procurando quem atende o equipamento depois.',
  },
  {
    p: 'Como faço para solicitar o orçamento?',
    r: 'Preencha o formulário com nome e telefone. Retornamos o contato para o levantamento, e o orçamento sai daí, não de tabela. Sem compromisso e sem cadastro.',
  },
];

/**
 * Bloco sobre a empresa.
 *
 * Mesma copy do site principal, de proposito: quem ve o anuncio, pesquisa a
 * Refrigois no Google e cai no site institucional precisa encontrar a mesma
 * historia, com as mesmas palavras. Versao diferente do mesmo assunto levanta
 * duvida justamente em quem estava conferindo antes de fechar.
 */
export const EMPRESA = {
  chapeu: 'Quem faz a Refrigóis',
  titulo: '15 anos de experiência em refrigeração comercial',
  foto: '/images/sobre/robert-escritorio.webp',
  fotoAlt: 'Robert Góis, fundador da Refrigóis, no escritório da empresa',
  fotoSecundaria: '/images/sobre/robert-loja.webp',
  fotoSecundariaAlt: 'Robert Góis atendendo em loja, junto aos expositores de bebidas',
  paragrafos: [
    'À frente da Refrigóis está Robert Góis, profissional com 15 anos de experiência em refrigeração comercial. Ao longo desse tempo, atendendo açougues, mercados, padarias, restaurantes e distribuidoras, ele consolidou o padrão que define a empresa: rigor técnico, transparência e compromissos cumpridos.',
    'Honestidade, respeito e dedicação orientam cada atendimento, do primeiro orçamento à manutenção anos depois. Homem de família e de fé, Robert leva esses valores para a gestão e conduz cada projeto pessoalmente, por entender que a confiança é a base de toda relação comercial duradoura.',
    'Ao falar com a Refrigóis, você trata diretamente com quem domina o assunto e assume a responsabilidade pelo resultado. É essa seriedade que sustenta a fidelidade e a indicação dos clientes.',
  ],
  assinatura: {
    nome: 'Robert Góis',
    papel: 'Fundador · Refrigóis Refrigeração Comercial',
  },
  valores: [
    { titulo: 'Honestidade', texto: 'O combinado é cumprido, do prazo ao orçamento.' },
    { titulo: 'Respeito', texto: 'Cada cliente atendido conforme a operação exige.' },
    { titulo: 'Dedicação', texto: 'Presença real, do projeto à manutenção.' },
  ],
} as const;

/**
 * Faixa que corre com os segmentos atendidos.
 *
 * Nao e enfeite: quem chega buscando "camara fria para conveniencia" precisa
 * ver a palavra dele na tela. A faixa cobre a categoria inteira sem ocupar uma
 * secao, e o movimento tira o ar parado da pagina.
 */
/**
 * Tipos de camara fria.
 *
 * Camara fria nao e uma coisa so, e cada tipo tem um nome proprio pelo qual as
 * pessoas buscam — inclusive os em ingles, que o mercado usa no dia a dia. Quem
 * procura "beer cave" ou "walk-in cooler" precisa achar esse termo na pagina,
 * senao acha que a empresa nao faz aquilo.
 */
export const TIPOS = [
  {
    nome: 'Câmara resfriada',
    etiqueta: '0 °C a 5 °C',
    linha: 'Carnes frescas, laticínios, hortifrúti e bebidas.',
  },
  {
    nome: 'Câmara de congelados',
    etiqueta: '−18 °C a −25 °C',
    linha: 'Estoque congelado e ilhas de apoio.',
  },
  {
    nome: 'Câmara expositora',
    etiqueta: 'walk-in cooler',
    linha: 'Portas de vidro: exposição e autosserviço sem abrir a câmara inteira.',
  },
  {
    nome: 'Câmara de bebidas e chopp',
    etiqueta: 'beer cave',
    linha: 'Bares, choperias, adegas e conveniências, com o barril na temperatura certa.',
  },
  {
    nome: 'Câmara modular',
    etiqueta: 'desmontável',
    linha: 'Painéis encaixados: pode ser ampliada ou remontada em outro ponto.',
  },
  {
    nome: 'Câmara frigorífica',
    etiqueta: 'industrial',
    linha: 'Grande volume, para indústria, logística e distribuição.',
  },
];

export const SEGMENTOS_FAIXA = [
  'Mercado',
  'Padaria',
  'Açougue',
  'Conveniência',
  'Restaurante',
  'Distribuidora',
  'Choperia',
  'Hortifrúti',
  'Confeitaria',
  'Farmácia',
  'Sorveteria',
  'Indústria',
];
