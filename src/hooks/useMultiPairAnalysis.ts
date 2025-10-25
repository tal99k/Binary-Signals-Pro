import { useState, useEffect, useCallback } from 'react';
import { TradingSignal, AnalysisConfig, STRATEGIES } from '@/types/signals';
import { useCandleSync } from './useCandleSync';

interface PairAnalysisState {
  currentPair: string;
  analyzedCandles: Map<string, Set<string>>; // pairName -> Set of candleIds
  lastAnalysisTime: Map<string, number>; // pairName -> timestamp
}

export function useMultiPairAnalysis(
  selectedPairs: string[],
  config: AnalysisConfig,
  isActive: boolean
) {
  const [state, setState] = useState<PairAnalysisState>({
    currentPair: '',
    analyzedCandles: new Map(),
    lastAnalysisTime: new Map()
  });

  const { currentCandle, markCandleAnalyzed, canAnalyzeCandle } = useCandleSync(config.timeframe);

  // Rotaciona entre os pares selecionados
  useEffect(() => {
    if (!isActive || selectedPairs.length === 0) return;

    const rotatePairs = () => {
      setState(prev => {
        const currentIndex = selectedPairs.indexOf(prev.currentPair);
        const nextIndex = (currentIndex + 1) % selectedPairs.length;
        const nextPair = selectedPairs[nextIndex];
        
        console.log(`🔄 Rotação de análise: ${prev.currentPair || 'início'} → ${nextPair}`);
        
        return {
          ...prev,
          currentPair: nextPair
        };
      });
    };

    // Inicializa com primeiro par
    if (!state.currentPair) {
      setState(prev => ({ ...prev, currentPair: selectedPairs[0] }));
    }

    // Rotaciona a cada 5 segundos
    const interval = setInterval(rotatePairs, 5000);

    return () => clearInterval(interval);
  }, [isActive, selectedPairs, state.currentPair]);

  const canAnalyzePairCandle = useCallback((pairName: string, candleId: string): boolean => {
    const pairCandles = state.analyzedCandles.get(pairName) || new Set();
    return !pairCandles.has(candleId);
  }, [state.analyzedCandles]);

  const markPairCandleAnalyzed = useCallback((pairName: string, candleId: string) => {
    setState(prev => {
      const newAnalyzedCandles = new Map(prev.analyzedCandles);
      const pairCandles = newAnalyzedCandles.get(pairName) || new Set();
      pairCandles.add(candleId);
      newAnalyzedCandles.set(pairName, pairCandles);

      const newLastAnalysisTime = new Map(prev.lastAnalysisTime);
      newLastAnalysisTime.set(pairName, Date.now());

      return {
        ...prev,
        analyzedCandles: newAnalyzedCandles,
        lastAnalysisTime: newLastAnalysisTime
      };
    });
  }, []);

  const shouldAnalyzePair = useCallback((pairName: string): boolean => {
    if (!currentCandle || !currentCandle.isClosed) return false;
    if (!canAnalyzeCandle(currentCandle.id)) return false;
    if (!canAnalyzePairCandle(pairName, currentCandle.id)) return false;

    const lastAnalysis = state.lastAnalysisTime.get(pairName) || 0;
    const minInterval = parseInt(config.timeframe) * 60 * 1000; // timeframe em ms
    
    return Date.now() - lastAnalysis >= minInterval;
  }, [currentCandle, canAnalyzeCandle, canAnalyzePairCandle, state.lastAnalysisTime, config.timeframe]);

  return {
    currentPair: state.currentPair,
    currentCandle,
    shouldAnalyzePair,
    markPairCandleAnalyzed,
    selectedPairsCount: selectedPairs.length
  };
}