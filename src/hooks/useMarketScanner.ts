import { useState, useEffect, useCallback } from 'react';
import { getOtcPairs, getPairDetails, OTCMarket } from '@/lib/pocketOptionService';
import { TradingSignal, STRATEGIES, AnalysisConfig } from '@/types/signals';

interface MarketOpportunity {
  pair: OTCMarket;
  signal: TradingSignal | null;
  analyzing: boolean;
}

export function useMarketScanner(config: AnalysisConfig, isActive: boolean) {
  const [opportunities, setOpportunities] = useState<MarketOpportunity[]>([]);
  const [scanning, setScanning] = useState(false);
  const [lastScanTime, setLastScanTime] = useState<Date | null>(null);

  const scanMarket = useCallback(async () => {
    if (!isActive) return;

    setScanning(true);
    console.log('🔍 INICIANDO VARREDURA DO MERCADO');
    console.log('📊 Buscando pares OTC com payout >= 85%...');

    try {
      // Busca todos os pares OTC disponíveis
      const pairs = await getOtcPairs();
      
      if (pairs.length === 0) {
        console.log('⚠️ Nenhum par OTC disponível no momento');
        setScanning(false);
        return;
      }

      console.log(`✅ ${pairs.length} pares encontrados para análise`);
      
      // Cria lista de oportunidades
      const newOpportunities: MarketOpportunity[] = pairs.map(pair => ({
        pair,
        signal: null,
        analyzing: false
      }));

      setOpportunities(newOpportunities);
      setLastScanTime(new Date());
      
      console.log('🎯 Varredura concluída! Aguardando sinais...');
    } catch (error) {
      console.error('❌ Erro na varredura:', error);
    } finally {
      setScanning(false);
    }
  }, [isActive]);

  // Analisa um par específico
  const analyzePair = useCallback(async (pairSymbol: string): Promise<TradingSignal | null> => {
    console.log(`🔬 Analisando ${pairSymbol}...`);
    
    const pair = await getPairDetails(pairSymbol);
    if (!pair || !pair.active) {
      console.log(`⚠️ ${pairSymbol} não está ativo`);
      return null;
    }

    // Aqui você conectaria com a lógica de análise real
    // Por enquanto, retorna null (sem sinal)
    // A análise real acontece quando a vela fecha no AnalyzerPanel
    
    return null;
  }, []);

  // Escaneia o mercado periodicamente
  useEffect(() => {
    if (!isActive) return;

    // Escaneia imediatamente
    scanMarket();

    // Reescaneia a cada 30 segundos
    const interval = setInterval(() => {
      scanMarket();
    }, 30000);

    return () => clearInterval(interval);
  }, [isActive, scanMarket]);

  return {
    opportunities,
    scanning,
    lastScanTime,
    scanMarket,
    analyzePair
  };
}