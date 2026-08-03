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
    titulo: 'Câmara frigorífica industrial',
    imagem: 'camara-frigorifica-industrial',
    alt: 'Câmara frigorífica em painéis isotérmicos construída pela Refrigóis',
  },
  {
    titulo: 'Câmara com portas de vidro',
    imagem: 'camara-fria-portas-vidro',
    alt: 'Câmara fria com portas de vidro para distribuidora de bebidas',
  },
  {
    titulo: 'Câmara resfriada para açougue',
    imagem: 'camara-fria-prateleiras',
    alt: 'Interior de câmara fria resfriada com prateleiras em aço inox',
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

/** Sequencia real, e por isso vai numerada. */
export const ETAPAS = [
  {
    titulo: 'Levantamento',
    texto:
      'O que será armazenado, em que temperatura e com que movimento. Espaço disponível, ponto da condensadora e capacidade elétrica.',
  },
  {
    titulo: 'Projeto',
    texto:
      'Capacidade do sistema, espessura do painel, tipo de porta e degelo. Você recebe a especificação item por item.',
  },
  {
    titulo: 'Execução',
    texto:
      'Painéis, unidades, tubulação frigorífica, dreno e elétrica. Acompanhado por quem fez o projeto, não por terceiros.',
  },
  {
    titulo: 'Partida',
    texto:
      'Sistema em operação, parâmetros ajustados, temperatura conferida em regime e a rotina de uso explicada.',
  },
];

/** Cinco perguntas, cada uma removendo um motivo de nao preencher. */
export const FAQ = [
  {
    p: 'O que vocês precisam saber para dimensionar?',
    r: 'Quatro informações resolvem a maior parte do cálculo: o que será armazenado, em que temperatura, quantas vezes a porta abre por dia e se o produto entra frio ou ainda quente. Com isso, mais o espaço e o ponto da condensadora, o dimensionamento sai de base técnica em vez de estimativa.',
  },
  {
    p: 'Vocês atendem a minha cidade?',
    r: 'Atendemos todo o Paraná. Já executamos obras em Guaíra, Cascavel, Londrina e Foz do Iguaçu, então distância não é impedimento para projeto agendado.',
  },
  {
    p: 'A câmara pode ser ampliada ou mudar de lugar depois?',
    r: 'Pode. Ela é montada em painéis modulares encaixados, então dá para ampliar, remontar em outro ponto ou levar junto numa mudança de endereço. A ressalva é técnica: aumentar o volume exige reavaliar se o sistema comporta a nova carga térmica, porque câmara ampliada sem revisão de capacidade não alcança a temperatura desejada.',
  },
  {
    p: 'Dá para instalar em espaço pequeno?',
    r: 'Dá, e é situação comum em restaurantes e padarias. O que costuma limitar não é o espaço interno, e sim achar um local ventilado para a condensadora dissipar calor. Isso é avaliado no levantamento, antes de qualquer definição.',
  },
  {
    p: 'Qual a diferença entre câmara resfriada e de congelados?',
    r: 'A resfriada trabalha entre 0 °C e 5 °C, para carnes frescas, hortifrúti, laticínios e bebidas. A de congelados vai de −18 °C a −25 °C. A diferença não está no ajuste do termostato: muda a capacidade do sistema, a espessura do painel e o tipo de degelo.',
  },
  {
    p: 'Tem garantia? Vocês fazem manutenção depois?',
    r: 'A instalação tem 12 meses de garantia. Manutenção, higienização e reforma são feitas pela nossa própria equipe, então quem instalou é quem assiste.',
  },
];

/**
 * Bloco sobre a empresa. Em servico tecnico, o comprador quer saber com quem
 * vai falar antes de mandar o contato — e a foto de quem responde faz mais por
 * isso do que qualquer adjetivo. Texto encurtado a partir do site principal:
 * la ele apresenta a empresa, aqui ele so precisa responder "posso confiar?".
 */
export const EMPRESA = {
  nome: 'Robert Góis',
  papel: 'Fundador da Refrigóis',
  foto: '/images/sobre/robert-escritorio.webp',
  paragrafos: [
    'São 15 anos de refrigeração comercial atendendo açougues, mercados, padarias, restaurantes e distribuidoras em todo o Paraná.',
    'Cada projeto passa pelas mãos de quem responde por ele. Você fala com quem dimensiona, acompanha a obra e volta se precisar de manutenção anos depois.',
  ],
  numeros: [
    { valor: '15', rotulo: 'anos de refrigeração comercial' },
    { valor: 'PR', rotulo: 'atendimento em todo o estado' },
    { valor: '12', rotulo: 'meses de garantia na instalação' },
  ],
};
