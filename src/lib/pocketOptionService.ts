import axios from 'axios';

export type OTCMarket = {
  symbol: string;
  name: string;
  type: string;
  active: boolean;
  category?: string;
  payout?: number; // Percentual de payout (85-95%)
};

export type OTCCandle = {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
};

// URL da API Python (rode localmente: python main.py)
const API_URL = 'http://localhost:8000';

/**
 * Busca todos os pares OTC disponíveis da Pocket Option
 */
export async function getOtcPairs(): Promise<OTCMarket[]> {
  try {
    const response = await axios.get<OTCMarket[]>(`${API_URL}/otc`);
    console.log('📊 Pares OTC carregados:', response.data.length);
    
    // Filtra pares com payout >= 85%
    const filteredPairs = response.data.filter(pair => {
      const payout = pair.payout || 0;
      return payout >= 85;
    });
    
    console.log(`✅ ${filteredPairs.length} pares com payout >= 85%`);
    return filteredPairs.length > 0 ? filteredPairs : response.data;
  } catch (error) {
    console.error('❌ Erro ao buscar pares OTC:', error);
    return getDefaultOtcPairs();
  }
}

/**
 * Busca informações detalhadas de um par específico
 */
export async function getPairDetails(symbol: string): Promise<OTCMarket | null> {
  try {
    const pairs = await getOtcPairs();
    return pairs.find(p => p.symbol === symbol) || null;
  } catch (error) {
    console.error(`❌ Erro ao buscar detalhes de ${symbol}:`, error);
    return null;
  }
}

/**
 * Busca candles históricos de um par específico
 */
export async function getOtcCandles(
  symbol: string, 
  timeframe: string = '60'
): Promise<OTCCandle[]> {
  try {
    const response = await axios.get<OTCCandle[]>(
      `${API_URL}/candles/${symbol}?timeframe=${timeframe}`
    );
    console.log(`📈 Candles de ${symbol} carregados:`, response.data.length);
    return response.data;
  } catch (error) {
    console.error(`❌ Erro ao buscar candles de ${symbol}:`, error);
    return [];
  }
}

/**
 * Verifica se a API está rodando
 */
export async function checkApiStatus(): Promise<boolean> {
  try {
    const response = await axios.get(`${API_URL}/health`, { timeout: 3000 });
    return response.status === 200;
  } catch (error) {
    return false;
  }
}

/**
 * Pares OTC padrão (fallback quando API não está disponível)
 */
function getDefaultOtcPairs(): OTCMarket[] {
  return [
    { symbol: 'AUDCAD_otc', name: 'AUD/CAD OTC', type: 'otc', active: true, category: 'forex' },
    { symbol: 'AUDCHF_otc', name: 'AUD/CHF OTC', type: 'otc', active: true, category: 'forex' },
    { symbol: 'AUDJPY_otc', name: 'AUD/JPY OTC', type: 'otc', active: true, category: 'forex' },
    { symbol: 'AUDNZD_otc', name: 'AUD/NZD OTC', type: 'otc', active: true, category: 'forex' },
    { symbol: 'AUDUSD_otc', name: 'AUD/USD OTC', type: 'otc', active: true, category: 'forex' },
    { symbol: 'CADCHF_otc', name: 'CAD/CHF OTC', type: 'otc', active: true, category: 'forex' },
    { symbol: 'CADJPY_otc', name: 'CAD/JPY OTC', type: 'otc', active: true, category: 'forex' },
    { symbol: 'CHFJPY_otc', name: 'CHF/JPY OTC', type: 'otc', active: true, category: 'forex' },
    { symbol: 'EURAUD_otc', name: 'EUR/AUD OTC', type: 'otc', active: true, category: 'forex' },
    { symbol: 'EURCAD_otc', name: 'EUR/CAD OTC', type: 'otc', active: true, category: 'forex' },
    { symbol: 'EURCHF_otc', name: 'EUR/CHF OTC', type: 'otc', active: true, category: 'forex' },
    { symbol: 'EURGBP_otc', name: 'EUR/GBP OTC', type: 'otc', active: true, category: 'forex' },
    { symbol: 'EURJPY_otc', name: 'EUR/JPY OTC', type: 'otc', active: true, category: 'forex' },
    { symbol: 'EURNZD_otc', name: 'EUR/NZD OTC', type: 'otc', active: true, category: 'forex' },
    { symbol: 'EURUSD_otc', name: 'EUR/USD OTC', type: 'otc', active: true, category: 'forex' },
    { symbol: 'GBPAUD_otc', name: 'GBP/AUD OTC', type: 'otc', active: true, category: 'forex' },
    { symbol: 'GBPCAD_otc', name: 'GBP/CAD OTC', type: 'otc', active: true, category: 'forex' },
    { symbol: 'GBPCHF_otc', name: 'GBP/CHF OTC', type: 'otc', active: true, category: 'forex' },
    { symbol: 'GBPJPY_otc', name: 'GBP/JPY OTC', type: 'otc', active: true, category: 'forex' },
    { symbol: 'GBPNZD_otc', name: 'GBP/NZD OTC', type: 'otc', active: true, category: 'forex' },
    { symbol: 'GBPUSD_otc', name: 'GBP/USD OTC', type: 'otc', active: true, category: 'forex' },
    { symbol: 'NZDCAD_otc', name: 'NZD/CAD OTC', type: 'otc', active: true, category: 'forex' },
    { symbol: 'NZDCHF_otc', name: 'NZD/CHF OTC', type: 'otc', active: true, category: 'forex' },
    { symbol: 'NZDJPY_otc', name: 'NZD/JPY OTC', type: 'otc', active: true, category: 'forex' },
    { symbol: 'NZDUSD_otc', name: 'NZD/USD OTC', type: 'otc', active: true, category: 'forex' },
    { symbol: 'USDCAD_otc', name: 'USD/CAD OTC', type: 'otc', active: true, category: 'forex' },
    { symbol: 'USDCHF_otc', name: 'USD/CHF OTC', type: 'otc', active: true, category: 'forex' },
    { symbol: 'USDJPY_otc', name: 'USD/JPY OTC', type: 'otc', active: true, category: 'forex' },
  ];
}

/**
 * Formata símbolo para exibição
 */
export function formatOtcSymbol(symbol: string): string {
  return symbol.replace('_otc', '').replace('_', '/') + ' OTC';
}

/**
 * Converte timeframe do robô para API
 * 1m -> 60, 5m -> 300, etc
 */
export function convertTimeframe(timeframe: string): string {
  const map: Record<string, string> = {
    '1m': '60',
    '2m': '120',
    '3m': '180',
    '5m': '300',
    '15m': '900',
    '30m': '1800',
    '1h': '3600'
  };
  return map[timeframe] || '60';
}