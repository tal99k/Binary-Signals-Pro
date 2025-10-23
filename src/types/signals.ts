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
  candleId: string; // Unique ID for the candle
  candleCloseTime: string; // When the candle closed
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
  channel: string;
  winRate: number;
  triggers: string[];
  filters: string[];
  description: string;
}

export interface AnalysisConfig {
  timeframe: '1m' | '2m' | '3m' | '5m';
  enabledStrategies: string[];
  minConfidence: number;
  autoAnalysis: boolean;
  currentAsset: string;
  waitForCandleClose: boolean;
}

export const STRATEGIES: Strategy[] = [
  {
    id: 'arab-traders-rejection',
    name: 'Rejeição de Suporte/Resistência',
    channel: 'Arab Traders Official',
    winRate: 78,
    triggers: [
      'Pavio longo rejeitando zona',
      'Volume aumentando na rejeição',
      'Confirmação em vela seguinte'
    ],
    filters: [
      'Zona testada pelo menos 2x antes',
      'Distância mínima de 5 pips',
      'Sem notícias importantes'
    ],
    description: 'Entrada na rejeição clara de zonas de suporte/resistência com volume'
  },
  {
    id: 'real-traders-engolfo',
    name: 'Padrão de Engolfo',
    channel: 'Real Traders',
    winRate: 82,
    triggers: [
      'Candle engolfa completamente o anterior',
      'Fechamento acima/abaixo da sombra',
      'Volume acima da média'
    ],
    filters: [
      'Tendência clara anterior',
      'Engolfo em zona de suporte/resistência',
      'Confirmação no candle seguinte'
    ],
    description: 'Padrão de reversão poderoso com engolfo completo de vela anterior'
  },
  {
    id: 'saboya-martelo',
    name: 'Martelo e Estrela Cadente',
    channel: 'Saboya Trader',
    winRate: 75,
    triggers: [
      'Corpo pequeno no topo/base',
      'Pavio longo (2-3x o corpo)',
      'Pouca ou nenhuma sombra oposta'
    ],
    filters: [
      'Aparecer após tendência',
      'Em zona de suporte/resistência',
      'Volume acima da média'
    ],
    description: 'Padrões de reversão clássicos com alta taxa de acerto'
  },
  {
    id: 'wild-momentum',
    name: 'Momentum com RSI',
    channel: 'Wild Daytrader',
    winRate: 80,
    triggers: [
      'RSI cruzando 30 (oversold) ou 70 (overbought)',
      'Divergência RSI vs Preço',
      'Vela de reversão'
    ],
    filters: [
      'RSI em zona extrema por 3+ candles',
      'Alinhamento com tendência maior',
      'Confirmação de volume'
    ],
    description: 'Entradas baseadas em momentum e indicador RSI'
  },
  {
    id: 'binary-forex-pin-bar',
    name: 'Pin Bar em Zonas',
    channel: 'Binary Forex',
    winRate: 77,
    triggers: [
      'Pin bar (pavio 2x o corpo)',
      'Formação em zona chave',
      'Rejeição clara do nível'
    ],
    filters: [
      'Zona testada anteriormente',
      'Pin bar contra tendência fraca',
      'Momento do dia adequado'
    ],
    description: 'Pin bars formados em zonas críticas com alta probabilidade'
  },
  {
    id: 'abanob-breakout',
    name: 'Rompimento com Reteste',
    channel: 'Abanob Trader',
    winRate: 85,
    triggers: [
      'Rompimento de zona com vela forte',
      'Reteste da zona rompida',
      'Rejeição no reteste'
    ],
    filters: [
      'Volume alto no rompimento',
      'Consolidação antes do rompimento',
      'Reteste com volume menor'
    ],
    description: 'Estratégia de rompimento com confirmação no reteste'
  },
  {
    id: 'ucrs-trend-following',
    name: 'Seguimento de Tendência',
    channel: 'UCRS Trading',
    winRate: 73,
    triggers: [
      'Pullback para média móvel',
      'Toque na EMA 21',
      'Vela de continuação'
    ],
    filters: [
      'Tendência clara (EMAs alinhadas)',
      'Pullback não muito profundo',
      'Volume confirmando continuação'
    ],
    description: 'Entradas em pullbacks dentro de tendências fortes'
  }
];