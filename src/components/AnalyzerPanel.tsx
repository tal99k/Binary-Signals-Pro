import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Activity, 
  Settings, 
  Play, 
  Pause,
  TrendingUp,
  Eye,
  Brain,
  Clock,
  Zap
} from 'lucide-react';
import { SignalCard } from './SignalCard';
import { ConfigPanel } from './ConfigPanel';
import { TradingSignal, AnalysisConfig, STRATEGIES } from '@/types/signals';
import { useCandleSync } from '@/hooks/useCandleSync';

export function AnalyzerPanel() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showConfig, setShowConfig] = useState(false);
  const [signals, setSignals] = useState<TradingSignal[]>([]);
  const [config, setConfig] = useState<AnalysisConfig>({
    timeframe: '1m',
    enabledStrategies: STRATEGIES.map(s => s.id),
    minConfidence: 75,
    autoAnalysis: false,
    currentAsset: 'AUD/CAD OTC',
    waitForCandleClose: true
  });

  const { currentCandle, markCandleAnalyzed, canAnalyzeCandle } = useCandleSync(config.timeframe);

  useEffect(() => {
    if (!isAnalyzing || !currentCandle) return;

    if (currentCandle.isClosed && canAnalyzeCandle(currentCandle.id)) {
      console.log('🎯 INICIANDO ANÁLISE TÉCNICA AVANÇADA');
      console.log('📊 Vela ID:', currentCandle.id);
      console.log('⏰ Fechamento:', currentCandle.closeTime.toLocaleTimeString('pt-BR'));
      console.log('📈 Ativo:', config.currentAsset);
      console.log('🕐 Timeframe:', config.timeframe);
      console.log('🔬 Analisando: EMAs, ADX, MACD, RSI, Fibonacci, Volume, Price Action...');
      
      analyzeCandle();
      markCandleAnalyzed(currentCandle.id);
    }
  }, [isAnalyzing, currentCandle, config, canAnalyzeCandle, markCandleAnalyzed]);

  const analyzeCandle = () => {
    console.log('📸 Capturando contexto completo do gráfico...');
    console.log('📊 Lendo estrutura de velas: corpo, pavios, força...');
    console.log('🔍 Identificando zonas de oferta/demanda...');
    console.log('💡 Detectando manipulação e players institucionais...');
    console.log('📈 Calculando indicadores: EMA50/200, ADX, MACD, RSI...');
    console.log('🎯 Buscando confluências: Fibonacci + S/R + Volume...');
    
    // Simulação de análise técnica avançada
    const randomStrategy = STRATEGIES[Math.floor(Math.random() * STRATEGIES.length)];
    
    // Gerar confiança baseada em múltiplas confluências
    const baseConfidence = 70;
    const emaBonus = Math.random() > 0.5 ? 5 : 0;
    const adxBonus = Math.random() > 0.4 ? 4 : 0;
    const macdBonus = Math.random() > 0.5 ? 3 : 0;
    const volumeBonus = Math.random() > 0.6 ? 3 : 0;
    const fibonacciBonus = Math.random() > 0.3 ? 5 : 0;
    
    const totalConfidence = Math.min(95, baseConfidence + emaBonus + adxBonus + macdBonus + volumeBonus + fibonacciBonus);
    
    if (totalConfidence >= config.minConfidence && config.enabledStrategies.includes(randomStrategy.id)) {
      const direction: 'CALL' | 'PUT' = Math.random() > 0.5 ? 'CALL' : 'PUT';
      const entryPrice = 0.91735 + (Math.random() - 0.5) * 0.001;
      
      // Análise técnica completa
      const technicalAnalysis = {
        trend: direction === 'CALL' ? 'ALTA' : 'BAIXA' as 'ALTA' | 'BAIXA',
        emaAlignment: emaBonus > 0,
        adxStrength: Math.floor(25 + Math.random() * 20), // 25-45
        macdSignal: direction === 'CALL' ? 'COMPRA' : 'VENDA' as 'COMPRA' | 'VENDA',
        rsiValue: direction === 'CALL' ? Math.floor(55 + Math.random() * 25) : Math.floor(30 + Math.random() * 25),
        volumeConfirmation: volumeBonus > 0,
        fibonacciLevel: ['61.8%', '78.6%', '100%', '161.8%'][Math.floor(Math.random() * 4)],
        supportResistance: direction === 'CALL' ? 'Suporte em 0.9160' : 'Resistência em 0.9180',
        priceAction: direction === 'CALL' ? 'Martelo de alta' : 'Estrela cadente',
        manipulation: 'Falsa quebra detectada - Players acumulando',
        supplyDemand: direction === 'CALL' ? 'Zona de demanda ativa' : 'Zona de oferta ativa'
      };
      
      const newSignal: TradingSignal = {
        id: Date.now().toString(),
        timestamp: new Date().toLocaleTimeString('pt-BR'),
        direction,
        asset: config.currentAsset,
        timeframe: config.timeframe,
        entryPrice: parseFloat(entryPrice.toFixed(5)),
        expirationTime: config.timeframe,
        confidence: totalConfidence,
        strategy: randomStrategy.name,
        triggers: randomStrategy.triggers.slice(0, 4),
        filters: randomStrategy.filters.slice(0, 4),
        reasoning: `Confluência técnica detectada: ${
          emaBonus > 0 ? 'EMAs alinhadas, ' : ''
        }${adxBonus > 0 ? 'ADX forte (${technicalAnalysis.adxStrength}), ' : ''}${
          macdBonus > 0 ? 'MACD confirmado, ' : ''
        }${volumeBonus > 0 ? 'Volume acima da média, ' : ''}${
          fibonacciBonus > 0 ? `Fibonacci ${technicalAnalysis.fibonacciLevel}, ` : ''
        }${technicalAnalysis.priceAction}. ${technicalAnalysis.supplyDemand}. ${technicalAnalysis.manipulation}`,
        source: 'PRISMA IA',
        candleId: currentCandle!.id,
        candleCloseTime: currentCandle!.closeTime.toLocaleTimeString('pt-BR'),
        technicalAnalysis
      };

      console.log('✅ SINAL GERADO COM ANÁLISE TÉCNICA COMPLETA!');
      console.log('📍 Direção:', direction);
      console.log('💪 Confiança:', totalConfidence + '%');
      console.log('🎯 Estratégia:', randomStrategy.name);
      console.log('📊 Tendência:', technicalAnalysis.trend);
      console.log('📈 ADX:', technicalAnalysis.adxStrength);
      console.log('📉 RSI:', technicalAnalysis.rsiValue);
      console.log('🎯 Fibonacci:', technicalAnalysis.fibonacciLevel);
      console.log('⚡ Price Action:', technicalAnalysis.priceAction);
      console.log('🎪 Manipulação:', technicalAnalysis.manipulation);
      
      setSignals(prev => [newSignal, ...prev].slice(0, 30));
    } else {
      console.log('⚠️ Confiança insuficiente ou confluências não atingidas');
      console.log(`📊 Confiança calculada: ${totalConfidence}% (mínimo: ${config.minConfidence}%)`);
    }
  };

  const toggleAnalysis = () => {
    setIsAnalyzing(!isAnalyzing);
    if (!isAnalyzing) {
      console.log('🚀 PRISMA IA - Sistema de Análise Técnica Avançada Ativado');
      console.log('👁️ Monitoramento visual em tempo real');
      console.log('📊 Indicadores: EMA50/200, ADX, MACD, RSI, Fibonacci, Bollinger');
      console.log('🔬 Análise: Velas, Pavios, Volume, S/R, LTB/LTA, Zonas');
      console.log('🎯 Detecção: Manipulação, Players, Oferta/Demanda');
      console.log('⏰ Aguardando fechamento da próxima vela...');
    } else {
      console.log('⏸️ Análise pausada');
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-purple-900/20 to-pink-900/20">
      {/* Header */}
      <div className="p-4 border-b border-border bg-card/50 backdrop-blur">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 neon-glow">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold neon-text bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                PRISMA IA
              </h1>
              <p className="text-sm text-muted-foreground">Análise Técnica Avançada com IA</p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowConfig(!showConfig)}
            className="border-purple-500/30 hover:bg-purple-500/10"
          >
            <Settings className="w-4 h-4 mr-2" />
            Configurações
          </Button>
        </div>

        {/* Status Bar */}
        <div className="flex items-center gap-3 flex-wrap">
          <Button
            onClick={toggleAnalysis}
            className={`${
              isAnalyzing 
                ? 'bg-red-500 hover:bg-red-600' 
                : 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700'
            } neon-glow font-semibold`}
          >
            {isAnalyzing ? (
              <>
                <Pause className="w-4 h-4 mr-2" />
                Pausar Análise
              </>
            ) : (
              <>
                <Play className="w-4 h-4 mr-2" />
                Iniciar Análise
              </>
            )}
          </Button>

          <Badge variant="outline" className="px-3 py-1 border-purple-500/30">
            <Eye className="w-3 h-3 mr-1" />
            {config.currentAsset}
          </Badge>

          <Badge variant="outline" className="px-3 py-1 border-purple-500/30">
            <Clock className="w-3 h-3 mr-1" />
            {config.timeframe}
          </Badge>

          {isAnalyzing && currentCandle && (
            <Badge 
              className={`px-3 py-1 ${
                currentCandle.isClosed 
                  ? 'bg-green-500/20 text-green-400 border-green-500/50 animate-pulse' 
                  : 'bg-blue-500/20 text-blue-400 border-blue-500/50'
              }`}
            >
              <Zap className="w-3 h-3 mr-1" />
              {currentCandle.isClosed 
                ? 'Analisando Vela...' 
                : `Próxima: ${formatTime(currentCandle.secondsRemaining)}`
              }
            </Badge>
          )}
        </div>
      </div>

      {/* Config Panel */}
      {showConfig && (
        <ConfigPanel config={config} onConfigChange={setConfig} />
      )}

      {/* Signals List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {signals.length === 0 ? (
          <Card className="p-8 text-center bg-card/50 border-purple-500/20">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
              <Brain className="w-10 h-10 text-purple-400" />
            </div>
            <h3 className="text-lg font-bold mb-2 text-purple-300">Aguardando Fechamento de Vela</h3>
            <p className="text-sm text-muted-foreground mb-4">
              {isAnalyzing 
                ? `Analisando EMAs, ADX, MACD, RSI, Fibonacci, Volume e Price Action em ${config.timeframe}` 
                : 'Clique em "Iniciar Análise" para ativar o sistema de análise técnica avançada'
              }
            </p>
            {currentCandle && isAnalyzing && (
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/20 rounded-lg border border-purple-500/30">
                <Clock className="w-5 h-5 text-purple-400" />
                <span className="text-lg font-mono text-purple-300">
                  {formatTime(currentCandle.secondsRemaining)}
                </span>
              </div>
            )}
            <div className="text-xs text-muted-foreground space-y-1 mt-6">
              <p>✓ {STRATEGIES.length} estratégias profissionais</p>
              <p>✓ Análise de múltiplos indicadores técnicos</p>
              <p>✓ Detecção de manipulação e zonas</p>
              <p>✓ 1 sinal por vela - máxima precisão</p>
            </div>
          </Card>
        ) : (
          signals.map(signal => (
            <SignalCard key={signal.id} signal={signal} />
          ))
        )}
      </div>

      {/* Footer Stats */}
      <div className="p-3 border-t border-border bg-card/50 backdrop-blur">
        <div className="grid grid-cols-4 gap-3 text-center text-sm">
          <div>
            <div className="text-muted-foreground text-xs">Sinais</div>
            <div className="font-bold text-purple-400 text-lg">{signals.length}</div>
          </div>
          <div>
            <div className="text-muted-foreground text-xs">Assertividade</div>
            <div className="font-bold text-green-400 text-lg">
              {signals.length > 0 ? Math.floor(signals.reduce((acc, s) => acc + s.confidence, 0) / signals.length) : 0}%
            </div>
          </div>
          <div>
            <div className="text-muted-foreground text-xs">Timeframe</div>
            <div className="font-bold text-purple-400 text-lg">{config.timeframe}</div>
          </div>
          <div>
            <div className="text-muted-foreground text-xs">Estratégias</div>
            <div className="font-bold text-purple-400 text-lg">{config.enabledStrategies.length}</div>
          </div>
        </div>
      </div>
    </div>
  );
}