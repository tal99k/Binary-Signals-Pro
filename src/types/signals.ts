export interface TradingSignal {
  id: string;
  timestamp: string;
  direction: 'CALL' | 'PUT';
  asset: string;
  timeframe: string;
  entryPrice: number;
  expirationTime: string;
  confidence: number;
  strategy: string;
  triggers: string[];
  filters: string[];
  reasoning: string;
  source: string;
  candleId: string;
  candleCloseTime: string;
  technicalAnalysis: TechnicalAnalysis;
}

export interface TechnicalAnalysis {
  trend: 'ALTA' | 'BAIXA' | 'LATERAL';
  emaAlignment: boolean;
  adxStrength: number;
  macdSignal: 'COMPRA' | 'VENDA' | 'NEUTRO';
  rsiValue: number;
  volumeConfirmation: boolean;
  fibonacciLevel: string;
  supportResistance: string;
  priceAction: string;
  manipulation: string;
  supplyDemand: string;
}

export interface CandleInfo {
  id: string;
  openTime: Date;
  closeTime: Date;
  timeframe: string;
  secondsRemaining: number;
  isClosed: boolean;
}

export interface Strategy {
  id: string;
  name: string;
  description: string;
  triggers: string[];
  filters: string[];
  winRate: number;
  technicalSetup: string[];
}

export interface AnalysisConfig {
  timeframe: '1m' | '2m' | '3m' | '5m';
  enabledStrategies: string[];
  minConfidence: number;
  autoAnalysis: boolean;
  currentAsset: string;
  waitForCandleClose: boolean;
}

// Estratégias Avançadas com Análise Técnica Profunda
export const STRATEGIES: Strategy[] = [
  {
    id: 'trend-following-ema',
    name: 'Tendência com EMAs + ADX',
    description: 'Operação a favor da tendência usando EMA50/200, ADX>25, MACD confirmado e RSI',
    triggers: [
      'EMA50 > EMA200 (viés de compra) ou EMA50 < EMA200 (viés de venda)',
      'ADX > 25 (mercado direcional)',
      'MACD cruzando na direção da tendência',
      'RSI acima de 50 (compra) ou abaixo de 50 (venda)',
      'Volume acima da média'
    ],
    filters: [
      'Bollinger Bands confirmando expansão',
      'Fibonacci em zona de confluência (61.8%, 100%, 161.8%)',
      'High/Low (14) respeitando suporte/resistência',
      'ATR indicando volatilidade adequada',
      'ROC + Bull/Bear Power confirmando momentum'
    ],
    winRate: 85,
    technicalSetup: [
      'Tendência definida por EMAs',
      'Força confirmada por ADX',
      'Direção validada por MACD',
      'Momentum por RSI e Volume'
    ]
  },
  {
    id: 'fibonacci-confluence',
    name: 'Confluência de Fibonacci + Zonas',
    description: 'Reversão em zonas de confluência: Fibonacci + High/Low + Pivô + Volume',
    triggers: [
      'Preço em zona de Fibonacci (61.8%, 78.6%)',
      'High/Low (14) batendo no mesmo nível',
      'Candle de reversão (martelo, engolfo, estrela cadente)',
      'Stochastic/Williams %R em zona extrema',
      'CCI confirmando divergência'
    ],
    filters: [
      'Volume diminuindo na aproximação da zona',
      'Volume explodindo na reversão',
      'RSI + Bollinger confirmando',
      'Ultimate Oscillator validando reversão',
      'Zona testada pelo menos 2x anteriormente'
    ],
    winRate: 82,
    technicalSetup: [
      'Múltiplas confluências técnicas',
      'Padrão de reversão claro',
      'Volume confirmando movimento'
    ]
  },
  {
    id: 'price-action-pure',
    name: 'Price Action Raiz',
    description: 'Movimento puro: topos/fundos + impulso + retração + continuação',
    triggers: [
      'Identificação clara de topos e fundos',
      'Impulso forte com vela de força',
      'Retração até 38.2% ou 50% de Fibonacci',
      'EMA5/10 alinhadas na retração',
      'Candle de continuação rompendo retração'
    ],
    filters: [
      'Estrutura de mercado preservada',
      'Volume no impulso > volume na retração',
      'ADX mantendo acima de 25',
      'MACD sem divergência',
      'Suporte/Resistência respeitados'
    ],
    winRate: 88,
    technicalSetup: [
      'Leitura pura de velas',
      'Estrutura de mercado',
      'Momentum preservado'
    ]
  },
  {
    id: 'candle-flow-analysis',
    name: 'Fluxo de Velas + Pavios',
    description: 'Leitura profunda: corpo, pavios, força da vela, previsão da próxima',
    triggers: [
      'Análise de corpo vs pavios (força/indecisão)',
      'Vela atual com força para continuar',
      'Pavios rejeitando zonas importantes',
      'Sequência de velas confirmando direção',
      'Momentum da vela atual'
    ],
    filters: [
      'Tamanho do corpo > 60% da vela total',
      'Pavio inferior/superior < 20% (tendência)',
      'Vela anterior alinhada com atual',
      'Volume progressivo',
      'Sem indecisão (dojis, spinning tops)'
    ],
    winRate: 79,
    technicalSetup: [
      'Leitura microscópica de velas',
      'Interpretação de pavios',
      'Previsão de próxima vela'
    ]
  },
  {
    id: 'supply-demand-zones',
    name: 'Zonas de Oferta/Demanda + Players',
    description: 'Identificação de zonas onde players institucionais operam + manipulação',
    triggers: [
      'Zona de demanda: impulso de alta + consolidação + rompimento',
      'Zona de oferta: impulso de baixa + consolidação + rompimento',
      'Retorno à zona com rejeição',
      'Volume institucional detectado',
      'Manipulação: falsa quebra + reversão rápida'
    ],
    filters: [
      'Zona testada menos de 3x (zona fresca)',
      'Distância mínima de 10 pips da zona',
      'Confirmação com vela de rejeição forte',
      'Volume acima de 150% da média',
      'Alinhamento com tendência maior'
    ],
    winRate: 86,
    technicalSetup: [
      'Zonas de acumulação/distribuição',
      'Rastreamento de players',
      'Leitura de manipulação'
    ]
  },
  {
    id: 'ltb-lta-strategy',
    name: 'Linhas de Tendência (LTB/LTA)',
    description: 'Operação em rompimentos e retestes de LTB (baixa) e LTA (alta)',
    triggers: [
      'LTB: linha conectando topos descendentes',
      'LTA: linha conectando fundos ascendentes',
      'Rompimento com vela de força',
      'Reteste da linha rompida',
      'Rejeição no reteste com volume'
    ],
    filters: [
      'Linha tocada pelo menos 3x antes',
      'Ângulo da linha entre 30-60 graus',
      'Rompimento com gap ou vela forte',
      'Reteste com volume menor que rompimento',
      'Confirmação no candle seguinte ao reteste'
    ],
    winRate: 81,
    technicalSetup: [
      'Traçado preciso de LTB/LTA',
      'Validação do rompimento',
      'Confirmação no reteste'
    ]
  },
  {
    id: 'zone-x-injection',
    name: 'Zona X + Injeção de Preço',
    description: 'Identificação de Zona X (acumulação extrema) + injeção súbita de liquidez',
    triggers: [
      'Zona X: 5+ velas de consolidação estreita',
      'Compressão de Bollinger Bands',
      'Volume secando na consolidação',
      'Injeção: vela forte rompendo com volume 200%+',
      'Gap de preço ou corpo sem pavios'
    ],
    filters: [
      'Consolidação mínima de 8 velas',
      'ATR diminuindo durante consolidação',
      'Rompimento alinhado com tendência maior',
      'Primeiro movimento após consolidação',
      'Stop loss atrás da Zona X'
    ],
    winRate: 84,
    technicalSetup: [
      'Detecção de acumulação',
      'Antecipação de movimento explosivo',
      'Gestão de risco pela Zona X'
    ]
  },
  {
    id: 'future-prediction',
    name: 'Previsão do Futuro',
    description: 'Interpretação do contexto histórico para prever próximas velas',
    triggers: [
      'Análise das últimas 20-50 velas',
      'Identificação de padrões repetidos',
      'Ciclos de impulso-retração-continuação',
      'Zonas de preço magnéticas (suporte/resistência)',
      'Comportamento similar em velas passadas'
    ],
    filters: [
      'Padrão repetido pelo menos 3x no histórico',
      'Contexto de mercado similar',
      'Indicadores alinhados com padrão histórico',
      'Horário de sessão consistente',
      'Volatilidade similar ao padrão'
    ],
    winRate: 77,
    technicalSetup: [
      'Machine learning de padrões',
      'Análise contextual profunda',
      'Previsão probabilística'
    ]
  },
  {
    id: 'new-high-low',
    name: 'Nova Máxima/Mínima + Momentum',
    description: 'Operação em quebras de máximas/mínimas com confirmação de momentum',
    triggers: [
      'Nova máxima: preço acima do high anterior',
      'Nova mínima: preço abaixo do low anterior',
      'MACD histograma crescente',
      'RSI > 60 (nova máxima) ou < 40 (nova mínima)',
      'Volume 120%+ da média'
    ],
    filters: [
      'Máxima/mínima anterior respeitada por 5+ velas',
      'Rompimento com corpo forte (>70% da vela)',
      'Sem divergência no RSI',
      'ADX crescente',
      'Pullback não retorna à zona antiga'
    ],
    winRate: 83,
    technicalSetup: [
      'Quebra de estrutura',
      'Validação de momentum',
      'Continuação confirmada'
    ]
  },
  {
    id: 'reversal-zones-advanced',
    name: 'Zonas de Reversão Avançadas',
    description: 'Melhores zonas para reversão: múltipla confluência técnica + price action',
    triggers: [
      'Fibonacci 61.8% ou 78.6%',
      'High/Low (14) no mesmo nível',
      'Suporte/Resistência histórico',
      'Número redondo (00, 50)',
      'Candle de reversão perfeito'
    ],
    filters: [
      '3+ indicadores confirmando zona',
      'Divergência no RSI ou MACD',
      'Stochastic em zona extrema',
      'Volume diminuindo na aproximação',
      'Rejeição com pavio 2x o corpo'
    ],
    winRate: 87,
    technicalSetup: [
      'Super confluência técnica',
      'Múltiplos timeframes alinhados',
      'Price action perfeito'
    ]
  }
];