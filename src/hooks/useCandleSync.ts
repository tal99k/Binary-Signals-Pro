import { useState, useEffect, useCallback } from 'react';
import { CandleInfo } from '@/types/signals';

export function useCandleSync(timeframe: '1m' | '2m' | '3m' | '5m') {
  const [currentCandle, setCurrentCandle] = useState<CandleInfo | null>(null);
  const [analyzedCandles, setAnalyzedCandles] = useState<Set<string>>(new Set());

  useEffect(() => {
    const updateCandle = () => {
      const now = new Date();
      const timeframeMs = parseInt(timeframe) * 60 * 1000;
      
      // Calcula início da vela atual
      const currentMs = now.getTime();
      const candleStartMs = Math.floor(currentMs / timeframeMs) * timeframeMs;
      const candleEndMs = candleStartMs + timeframeMs;
      
      const openTime = new Date(candleStartMs);
      const closeTime = new Date(candleEndMs);
      const secondsRemaining = Math.floor((candleEndMs - currentMs) / 1000);
      
      const candleId = `${timeframe}-${candleStartMs}`;
      const isClosed = secondsRemaining <= 0;

      // 🆕 Calcular progresso e status
      const elapsed = currentMs - candleStartMs;
      const progress = (elapsed / timeframeMs) * 100;
      
      let status: 'INICIO' | 'MEIO' | 'FINAL' | 'FECHADA' = 'MEIO';
      if (isClosed) {
        status = 'FECHADA';
      } else if (progress < 20) {
        status = 'INICIO';
      } else if (progress > 80) {
        status = 'FINAL';
      }

      // 🆕 Simular dados OHLC (em produção, viria da API)
      const basePrice = 0.91735;
      const volatility = 0.0001;
      const randomChange = (Math.random() - 0.5) * volatility;
      
      const open = basePrice + randomChange;
      const high = open + Math.random() * volatility;
      const low = open - Math.random() * volatility;
      const close = low + Math.random() * (high - low);
      const volume = Math.floor(1000 + Math.random() * 5000);

      setCurrentCandle({
        id: candleId,
        openTime,
        closeTime,
        timeframe,
        secondsRemaining: Math.max(0, secondsRemaining),
        isClosed,
        open,
        high,
        low,
        close,
        volume,
        progress,
        status
      });
    };

    updateCandle();
    const interval = setInterval(updateCandle, 1000);

    return () => clearInterval(interval);
  }, [timeframe]);

  const markCandleAnalyzed = useCallback((candleId: string) => {
    setAnalyzedCandles(prev => new Set([...prev, candleId]));
    console.log('✅ Vela analisada:', candleId);
  }, []);

  const canAnalyzeCandle = useCallback((candleId: string): boolean => {
    return !analyzedCandles.has(candleId);
  }, [analyzedCandles]);

  return {
    currentCandle,
    markCandleAnalyzed,
    canAnalyzeCandle
  };
}
