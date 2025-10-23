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
  candleFlow: string;
  playerPosition: string;
  futureProjection: string;
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
  confluenceLevel: number; // 1-5 (número de confluências necessárias)
}

export interface AnalysisConfig {
  timeframe: '1m' | '2m' | '3m' | '5m';
  enabledStrategies: string[];
  minConfidence: number;
  autoAnalysis: boolean;
  currentAsset: string;
  waitForCandleClose: boolean;
}

// 🎯 ESTRATÉGIAS COMPLETAS: ORIGINAIS + NOVAS + MELHORIAS
export const STRATEGIES: Strategy[] = [
  // ========== ESTRATÉGIAS ORIGINAIS (MELHORADAS) ==========
  {
    id: 'trend-following-ema',
    name: 'Tendência com EMAs + ADX',
    description: 'Operação a favor da tendência: EMA50/200 + ADX>25 + MACD + RSI + Volume + Fibonacci',
    triggers: [
      'EMA50 > EMA200 (compra) ou EMA50 < EMA200 (venda)',
      'ADX > 25 (mercado direcional forte)',
      'MACD cruzando na direção da tendência',
      'RSI > 50 (compra) ou < 50 (venda)',
      'Volume acima de 120% da média',
      'Fibonacci 61.8% ou 100% respeitado'
    ],
    filters: [
      'Bollinger Bands confirmando expansão',
      'High/Low (14) não violado',
      'ATR indicando volatilidade adequada',
      'ROC + Bull/Bear Power confirmando momentum',
      'Ultimate Oscillator > 50 (compra) ou < 50 (venda)',
      'Stochastic alinhado com tendência'
    ],
    winRate: 87,
    technicalSetup: [
      'Tendência definida por EMAs',
      'Força confirmada por ADX',
      'Direção validada por MACD',
      'Momentum por RSI e Volume',
      'Confluência Fibonacci'
    ],
    confluenceLevel: 5
  },
  {
    id: 'fibonacci-confluence',
    name: 'Confluência de Fibonacci + Zonas',
    description: 'Reversão em zonas: Fibonacci + High/Low + Pivô + Volume + Price Action',
    triggers: [
      'Preço em zona de Fibonacci (61.8%, 78.6%, 100%)',
      'High/Low (14) no mesmo nível',
      'Pivô diário/semanal coincidindo',
      'Candle de reversão (martelo, engolfo, estrela)',
      'Stochastic/Williams %R em extremo',
      'CCI confirmando divergência'
    ],
    filters: [
      'Volume diminuindo na aproximação',
      'Volume explodindo na reversão (200%+)',
      'RSI + Bollinger confirmando extremo',
      'Ultimate Oscillator validando reversão',
      'Zona testada 2-3x anteriormente',
      'MACD sem divergência negativa'
    ],
    winRate: 84,
    technicalSetup: [
      'Múltiplas confluências',
      'Padrão de reversão claro',
      'Volume confirmando'
    ],
    confluenceLevel: 5
  },
  {
    id: 'price-action-pure',
    name: 'Price Action Raiz',
    description: 'Movimento puro: topos/fundos + impulso + retração + continuação + estrutura',
    triggers: [
      'Identificação clara de topos e fundos',
      'Impulso forte com vela de corpo >70%',
      'Retração até 38.2% ou 50% Fibonacci',
      'EMA5/10 alinhadas na retração',
      'Candle de continuação rompendo retração',
      'Estrutura de HH/HL (alta) ou LL/LH (baixa)'
    ],
    filters: [
      'Estrutura de mercado preservada',
      'Volume impulso > volume retração',
      'ADX mantendo acima de 25',
      'MACD sem divergência',
      'Suporte/Resistência respeitados',
      'Momentum ROC crescente'
    ],
    winRate: 89,
    technicalSetup: [
      'Leitura pura de velas',
      'Estrutura de mercado',
      'Momentum preservado'
    ],
    confluenceLevel: 4
  },
  {
    id: 'candle-flow-analysis',
    name: 'Fluxo de Velas + Pavios',
    description: 'Leitura microscópica: corpo, pavios, força, indecisão, previsão da próxima vela',
    triggers: [
      'Corpo da vela > 60% do total (força)',
      'Pavio rejeitando zona importante',
      'Sequência de velas confirmando direção',
      'Força da vela atual (corpo vs pavios)',
      'Previsão: próxima vela continuará?',
      'Análise de inside bars e pin bars'
    ],
    filters: [
      'Pavio inferior/superior < 20% (tendência)',
      'Vela anterior alinhada',
      'Volume progressivo',
      'Sem indecisão (dojis, spinning tops)',
      'Momentum confirmando continuação',
      'ATR não excessivo'
    ],
    winRate: 81,
    technicalSetup: [
      'Leitura microscópica',
      'Interpretação de pavios',
      'Previsão de próxima vela'
    ],
    confluenceLevel: 4
  },
  {
    id: 'supply-demand-zones',
    name: 'Zonas de Oferta/Demanda + Players',
    description: 'Detecção de zonas institucionais: impulso + consolidação + manipulação + players',
    triggers: [
      'Zona demanda: impulso alta + consolidação + rompimento',
      'Zona oferta: impulso baixa + consolidação + rompimento',
      'Retorno à zona com rejeição',
      'Volume institucional detectado (300%+)',
      'Manipulação: falsa quebra + reversão rápida',
      'Order block identificado'
    ],
    filters: [
      'Zona testada < 3x (zona fresca)',
      'Distância mínima de 10 pips',
      'Vela de rejeição forte (corpo >70%)',
      'Volume acima de 200% da média',
      'Alinhamento com tendência maior',
      'Imbalance visível no gráfico'
    ],
    winRate: 88,
    technicalSetup: [
      'Zonas institucionais',
      'Rastreamento de players',
      'Leitura de manipulação'
    ],
    confluenceLevel: 5
  },
  {
    id: 'ltb-lta-strategy',
    name: 'Linhas de Tendência (LTB/LTA)',
    description: 'Rompimentos e retestes: LTB (baixa) + LTA (alta) + confirmação + volume',
    triggers: [
      'LTB: topos descendentes conectados',
      'LTA: fundos ascendentes conectados',
      'Rompimento com vela de força (corpo >70%)',
      'Reteste da linha rompida',
      'Rejeição no reteste com volume',
      'Confirmação no candle seguinte'
    ],
    filters: [
      'Linha tocada 3+ vezes antes',
      'Ângulo entre 30-60 graus',
      'Rompimento com gap ou vela forte',
      'Volume reteste < volume rompimento',
      'ADX crescente',
      'MACD confirmando direção'
    ],
    winRate: 83,
    technicalSetup: [
      'Traçado preciso LTB/LTA',
      'Validação rompimento',
      'Confirmação reteste'
    ],
    confluenceLevel: 4
  },
  {
    id: 'zone-x-injection',
    name: 'Zona X + Injeção de Preço',
    description: 'Acumulação extrema: consolidação + compressão + injeção explosiva de liquidez',
    triggers: [
      'Zona X: 5+ velas de consolidação estreita',
      'Compressão de Bollinger Bands',
      'Volume secando (< 50% da média)',
      'Injeção: vela forte com volume 200%+',
      'Gap de preço ou corpo sem pavios',
      'ATR explodindo após compressão'
    ],
    filters: [
      'Consolidação mínima de 8 velas',
      'ATR diminuindo 50%+ durante consolidação',
      'Rompimento alinhado com tendência maior',
      'Primeiro movimento após Zona X',
      'Stop loss atrás da Zona X',
      'Confirmação no candle seguinte'
    ],
    winRate: 86,
    technicalSetup: [
      'Detecção de acumulação',
      'Movimento explosivo',
      'Gestão de risco pela Zona X'
    ],
    confluenceLevel: 4
  },
  {
    id: 'future-prediction',
    name: 'Previsão do Futuro',
    description: 'Contexto histórico: análise de 20-50 velas + padrões repetidos + ciclos',
    triggers: [
      'Análise das últimas 20-50 velas',
      'Identificação de padrões repetidos',
      'Ciclos de impulso-retração-continuação',
      'Zonas magnéticas (S/R testados 3+x)',
      'Comportamento similar no histórico',
      'Horário de sessão com padrão'
    ],
    filters: [
      'Padrão repetido 3+ vezes no histórico',
      'Contexto de mercado similar',
      'Indicadores alinhados com padrão',
      'Horário consistente',
      'Volatilidade similar (ATR)',
      'Volume similar ao padrão'
    ],
    winRate: 79,
    technicalSetup: [
      'Machine learning de padrões',
      'Análise contextual profunda',
      'Previsão probabilística'
    ],
    confluenceLevel: 4
  },
  {
    id: 'new-high-low',
    name: 'Nova Máxima/Mínima + Momentum',
    description: 'Quebra de estrutura: nova máxima/mínima + momentum + confirmação + continuação',
    triggers: [
      'Nova máxima: preço > high anterior',
      'Nova mínima: preço < low anterior',
      'MACD histograma crescente',
      'RSI > 60 (máxima) ou < 40 (mínima)',
      'Volume 150%+ da média',
      'ADX crescente (força aumentando)'
    ],
    filters: [
      'Máxima/mínima respeitada por 5+ velas',
      'Corpo da vela >70% (força)',
      'Sem divergência no RSI',
      'ADX crescente',
      'Pullback não retorna à zona antiga',
      'Momentum ROC confirmando'
    ],
    winRate: 85,
    technicalSetup: [
      'Quebra de estrutura',
      'Validação de momentum',
      'Continuação confirmada'
    ],
    confluenceLevel: 5
  },
  {
    id: 'reversal-zones-advanced',
    name: 'Zonas de Reversão Avançadas',
    description: 'Super confluência: Fibonacci + High/Low + S/R + Pivô + número redondo + price action',
    triggers: [
      'Fibonacci 61.8%, 78.6% ou 100%',
      'High/Low (14) no mesmo nível',
      'Suporte/Resistência histórico',
      'Pivô diário/semanal',
      'Número redondo (00, 50)',
      'Candle de reversão perfeito'
    ],
    filters: [
      '3+ indicadores confirmando zona',
      'Divergência no RSI ou MACD',
      'Stochastic em zona extrema',
      'Volume diminuindo na aproximação',
      'Rejeição com pavio 2x o corpo',
      'CCI + Williams %R extremos'
    ],
    winRate: 90,
    technicalSetup: [
      'Super confluência técnica',
      'Múltiplos timeframes',
      'Price action perfeito'
    ],
    confluenceLevel: 5
  },

  // ========== NOVAS ESTRATÉGIAS DOS VÍDEOS ==========
  {
    id: 'momentum-breakout',
    name: 'Rompimento de Momentum',
    description: 'Rompimento forte: volume explosivo + MACD + RSI + continuação',
    triggers: [
      'Rompimento de S/R com volume 200%+',
      'MACD cruzando linha de sinal',
      'RSI rompendo 50 (compra) ou 50 (venda)',
      'Candle de força (corpo >70%)',
      'Confirmação na vela seguinte',
      'Gap de preço visível'
    ],
    filters: [
      'S/R respeitado por 3+ velas',
      'Volume crescente nas últimas 3 velas',
      'ADX > 20 e crescente',
      'Pullback não viola a zona',
      'Bollinger expandindo',
      'ATR adequado (não excessivo)'
    ],
    winRate: 82,
    technicalSetup: [
      'Rompimento validado',
      'Volume explosivo',
      'Momentum confirmado'
    ],
    confluenceLevel: 4
  },
  {
    id: 'pullback-entry',
    name: 'Entrada em Pullback',
    description: 'Retração saudável: impulso + pullback 38.2%-50% + continuação',
    triggers: [
      'Impulso forte identificado',
      'Pullback até Fibonacci 38.2%-50%',
      'EMA9/21 sendo respeitadas',
      'Candle de continuação aparecendo',
      'Volume no pullback < volume impulso',
      'Estrutura preservada'
    ],
    filters: [
      'Pullback não viola 61.8% Fibonacci',
      'RSI não fica em extremo',
      'MACD não cruza contra tendência',
      'Volume confirmando continuação',
      'Momentum mantido (ROC)',
      'ADX não cai abaixo de 20'
    ],
    winRate: 84,
    technicalSetup: [
      'Identificação de impulso',
      'Pullback saudável',
      'Continuação confirmada'
    ],
    confluenceLevel: 4
  },
  {
    id: 'divergence-reversal',
    name: 'Reversão por Divergência',
    description: 'Divergência clássica: preço vs RSI/MACD + volume + candle reversal',
    triggers: [
      'Divergência de preço vs RSI',
      'Divergência de preço vs MACD',
      'Preço em zona de S/R importante',
      'Candle de reversão forte',
      'Volume confirmando reversão',
      'Stochastic em extremo'
    ],
    filters: [
      'Divergência em 2+ indicadores',
      'Zona testada anteriormente',
      'Volume na reversão > média',
      'CCI confirmando extremo',
      'Williams %R em zona crítica',
      'Confirmação na vela seguinte'
    ],
    winRate: 86,
    technicalSetup: [
      'Divergência dupla',
      'Zona de reversão',
      'Confirmação múltipla'
    ],
    confluenceLevel: 5
  },
  {
    id: 'session-first-move',
    name: 'Primeiro Movimento da Sessão',
    description: 'Início de sessão: primeiro impulso + volume + direção + continuação',
    triggers: [
      'Primeira vela forte da sessão (corpo >70%)',
      'Volume acima de 150% da média',
      'Direção clara definida',
      'Rompimento de overnight range',
      'MACD confirmando direção',
      'ADX começando a crescer'
    ],
    filters: [
      'Sessão correta (Londres/NY/Ásia)',
      'Sem notícias impactantes pendentes',
      'Tendência maior alinhada',
      'RSI confirmando direção',
      'Bollinger não em extremo',
      'ATR adequado para sessão'
    ],
    winRate: 81,
    technicalSetup: [
      'Timing de sessão',
      'Primeiro impulso',
      'Continuação provável'
    ],
    confluenceLevel: 4
  },
  {
    id: 'ema-cross-momentum',
    name: 'Cruzamento EMAs + Momentum',
    description: 'Cruzamento clássico: EMA9/21 + volume + RSI + confirmação',
    triggers: [
      'EMA9 cruzando EMA21',
      'Volume crescente no cruzamento',
      'RSI confirmando direção',
      'Candle de continuação após cruzamento',
      'MACD alinhado',
      'Momentum ROC positivo'
    ],
    filters: [
      'Cruzamento em zona de S/R',
      'Tendência maior alinhada (EMA50/200)',
      'ADX > 20',
      'Sem divergências',
      'Volume >120% média',
      'Confirmação em 2 velas'
    ],
    winRate: 80,
    technicalSetup: [
      'Cruzamento validado',
      'Momentum confirmado',
      'Continuação provável'
    ],
    confluenceLevel: 4
  },
  {
    id: 'support-resistance-bounce',
    name: 'Rebote em S/R Forte',
    description: 'Zona respeitada: S/R testado 3+x + rejeição + volume + confirmação',
    triggers: [
      'S/R testado 3+ vezes anteriormente',
      'Preço chegando na zona',
      'Candle de rejeição (pavio longo)',
      'Volume na rejeição > média',
      'RSI não em extremo',
      'Confirmação na vela seguinte'
    ],
    filters: [
      'Zona respeitada historicamente',
      'Distância adequada da zona (5+ pips)',
      'Sem rompimentos falsos recentes',
      'Tendência maior favorável',
      'MACD não divergente',
      'ADX adequado (15-30)'
    ],
    winRate: 83,
    technicalSetup: [
      'Zona validada',
      'Rejeição confirmada',
      'Rebote provável'
    ],
    confluenceLevel: 4
  },
  {
    id: 'squeeze-expansion',
    name: 'Compressão e Expansão',
    description: 'Bollinger squeeze: compressão + volume baixo + expansão explosiva',
    triggers: [
      'Bollinger Bands comprimindo (squeeze)',
      'Volume caindo abaixo de 70% média',
      'ATR diminuindo',
      'Rompimento de Bollinger Band',
      'Volume explodindo (200%+)',
      'Direção clara na expansão'
    ],
    filters: [
      'Squeeze mínimo de 5 velas',
      'Rompimento com corpo forte (>70%)',
      'Tendência maior alinhada',
      'MACD confirmando direção',
      'RSI não em extremo antes',
      'Confirmação continuação'
    ],
    winRate: 85,
    technicalSetup: [
      'Detecção de squeeze',
      'Expansão confirmada',
      'Movimento explosivo'
    ],
    confluenceLevel: 4
  },
  {
    id: 'trend-channel',
    name: 'Canal de Tendência',
    description: 'Operação em canal: LTA/LTB + toque + rejeição + continuação',
    triggers: [
      'Canal bem definido (3+ toques)',
      'Preço tocando linha do canal',
      'Rejeição com candle de força',
      'Volume confirmando rejeição',
      'RSI não em extremo',
      'Direção para o meio do canal'
    ],
    filters: [
      'Canal respeitado em 80%+ dos toques',
      'Ângulo adequado (30-60 graus)',
      'Sem rompimentos falsos recentes',
      'ADX > 20 (tendência ativa)',
      'MACD alinhado com canal',
      'Confirmação na vela seguinte'
    ],
    winRate: 82,
    technicalSetup: [
      'Canal validado',
      'Toque confirmado',
      'Rejeição provável'
    ],
    confluenceLevel: 4
  },
  {
    id: 'volume-spike',
    name: 'Pico de Volume',
    description: 'Volume institucional: spike 300%+ + direção + continuação',
    triggers: [
      'Volume explode acima de 300% média',
      'Candle de direção clara (corpo >70%)',
      'Rompimento de zona importante',
      'MACD confirmando',
      'RSI entrando em tendência',
      'Continuação nas velas seguintes'
    ],
    filters: [
      'Spike em zona de S/R',
      'Sem notícias causando spike',
      'Tendência maior alinhada',
      'ADX crescente',
      'Momentum ROC explosivo',
      'Confirmação em 2 velas'
    ],
    winRate: 84,
    technicalSetup: [
      'Detecção institucional',
      'Volume explosivo',
      'Movimento sustentado'
    ],
    confluenceLevel: 4
  },
  {
    id: 'multi-timeframe',
    name: 'Confluência Multi-Timeframe',
    description: 'Alinhamento total: tendência em 3+ timeframes + zona + confirmação',
    triggers: [
      'Tendência alinhada em 3+ timeframes',
      'Zona de confluência identificada',
      'Todos EMAs alinhados',
      'MACD em todos timeframes alinhado',
      'RSI confirmando em todos',
      'Volume crescente'
    ],
    filters: [
      'Mínimo 3 timeframes alinhados',
      'ADX > 25 no timeframe principal',
      'Sem divergências em nenhum TF',
      'Zona respeitada em maior TF',
      'Momentum confirmado',
      'Estrutura preservada em todos TFs'
    ],
    winRate: 91,
    technicalSetup: [
      'Análise multi-timeframe',
      'Alinhamento total',
      'Probabilidade máxima'
    ],
    confluenceLevel: 5
  }
];