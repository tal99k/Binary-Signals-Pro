import { useState, useEffect, useCallback } from 'react';
import { CandleInfo } from '@/types/signals';

export function useCandleSync(timeframe: '1m' | '2m' | '3m' | '5m') {
  const [currentCandle, setCurrentCandle] = useState<CandleInfo | null>(null);
  const [analyzedCandles, setAnalyzedCandles] = useState<Set<string>>(new Set());

  const timeframeMinutes = parseInt(timeframe);

  const calculateCandleInfo = useCallback((): CandleInfo => {
    const now = new Date();
    const currentMinute = now.getMinutes();
    const currentSecond = now.getSeconds();
    
    // Calculate which candle we're in
    const candleIndex = Math.floor(currentMinute / timeframeMinutes);
    const candleStartMinute = candleIndex * timeframeMinutes;
    
    // Calculate open and close times
    const openTime = new Date(now);
    openTime.setMinutes(candleStartMinute, 0, 0);
    
    const closeTime = new Date(openTime);
    closeTime.setMinutes(candleStartMinute + timeframeMinutes, 0, 0);
    
    // Calculate seconds remaining
    const totalSeconds = (closeTime.getTime() - now.getTime()) / 1000;
    const secondsRemaining = Math.max(0, Math.floor(totalSeconds));
    
    // Check if candle is closed (last 5 seconds or closed)
    const isClosed = secondsRemaining <= 5;
    
    // Generate unique candle ID
    const candleId = `${openTime.getTime()}-${timeframe}`;
    
    return {
      id: candleId,
      openTime,
      closeTime,
      timeframe,
      secondsRemaining,
      isClosed
    };
  }, [timeframe, timeframeMinutes]);

  useEffect(() => {
    const updateCandle = () => {
      const candleInfo = calculateCandleInfo();
      setCurrentCandle(candleInfo);
      
      console.log('🕐 Cronômetro da Vela:', {
        timeframe: candleInfo.timeframe,
        tempoRestante: `${Math.floor(candleInfo.secondsRemaining / 60)}:${(candleInfo.secondsRemaining % 60).toString().padStart(2, '0')}`,
        velaFechada: candleInfo.isClosed,
        proximaAnalise: candleInfo.isClosed && !analyzedCandles.has(candleInfo.id)
      });
    };

    // Update every second
    updateCandle();
    const interval = setInterval(updateCandle, 1000);

    return () => clearInterval(interval);
  }, [timeframe, calculateCandleInfo, analyzedCandles]);

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