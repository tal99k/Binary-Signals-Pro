import { TradingSignal } from '@/types/signals';
import { TrendingUp, TrendingDown, Clock, Target, Lightbulb, Filter, CheckCircle, Activity, TrendingUp as TrendIcon } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface SignalCardProps {
  signal: TradingSignal;
}

export function SignalCard({ signal }: SignalCardProps) {
  const isCall = signal.direction === 'CALL';
  
  return (
    <Card className="p-4 bg-card border-border hover:border-primary transition-all animate-fade-in-up">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          {isCall ? (
            <div className="p-2 rounded-lg bg-green-500/20">
              <TrendingUp className="w-5 h-5 text-green-400" />
            </div>
          ) : (
            <div className="p-2 rounded-lg bg-red-500/20">
              <TrendingDown className="w-5 h-5 text-red-400" />
            </div>
          )}
          <div>
            <h3 className="font-bold text-lg">{signal.asset}</h3>
            <p className="text-sm text-muted-foreground">{signal.strategy}</p>
          </div>
        </div>
        <Badge 
          variant="outline" 
          className={`${
            signal.confidence >= 85 
              ? 'bg-green-500/20 text-green-400 border-green-500/50' 
              : signal.confidence >= 75
              ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50'
              : 'bg-orange-500/20 text-orange-400 border-orange-500/50'
          }`}
        >
          {signal.confidence}% confiança
        </Badge>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-3">
        <div className="flex items-center gap-2 text-sm">
          <Clock className="w-4 h-4 text-muted-foreground" />
          <span>{signal.candleCloseTime}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Target className="w-4 h-4 text-muted-foreground" />
          <span>Exp: {signal.expirationTime}</span>
        </div>
      </div>

      <div className={`p-3 rounded-lg mb-3 ${
        isCall ? 'bg-green-500/10 border border-green-500/30' : 'bg-red-500/10 border border-red-500/30'
      }`}>
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Direção</span>
          <span className={`text-xl font-bold ${isCall ? 'text-green-400' : 'text-red-400'}`}>
            {signal.direction}
          </span>
        </div>
        <div className="flex items-center justify-between mt-1">
          <span className="text-sm text-muted-foreground">Preço de Entrada</span>
          <span className="text-sm font-mono">{signal.entryPrice}</span>
        </div>
      </div>

      {/* Análise Técnica Avançada */}
      {signal.technicalAnalysis && (
        <div className="mb-3 p-3 bg-purple-500/10 border border-purple-500/30 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Activity className="w-4 h-4 text-purple-400" />
            <span className="text-sm font-semibold text-purple-300">Análise Técnica Completa</span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <span className="text-muted-foreground">Tendência:</span>
              <span className={`ml-2 font-semibold ${
                signal.technicalAnalysis.trend === 'ALTA' ? 'text-green-400' : 
                signal.technicalAnalysis.trend === 'BAIXA' ? 'text-red-400' : 'text-yellow-400'
              }`}>
                {signal.technicalAnalysis.trend}
              </span>
            </div>
            <div>
              <span className="text-muted-foreground">ADX:</span>
              <span className="ml-2 font-semibold text-purple-400">{signal.technicalAnalysis.adxStrength}</span>
            </div>
            <div>
              <span className="text-muted-foreground">RSI:</span>
              <span className="ml-2 font-semibold text-blue-400">{signal.technicalAnalysis.rsiValue}</span>
            </div>
            <div>
              <span className="text-muted-foreground">MACD:</span>
              <span className={`ml-2 font-semibold ${
                signal.technicalAnalysis.macdSignal === 'COMPRA' ? 'text-green-400' : 'text-red-400'
              }`}>
                {signal.technicalAnalysis.macdSignal}
              </span>
            </div>
            <div className="col-span-2">
              <span className="text-muted-foreground">Fibonacci:</span>
              <span className="ml-2 font-semibold text-yellow-400">{signal.technicalAnalysis.fibonacciLevel}</span>
            </div>
            <div className="col-span-2">
              <span className="text-muted-foreground">S/R:</span>
              <span className="ml-2 text-cyan-400">{signal.technicalAnalysis.supportResistance}</span>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center gap-2 mb-3 p-2 bg-blue-500/10 border border-blue-500/30 rounded-lg">
        <CheckCircle className="w-4 h-4 text-blue-400" />
        <span className="text-xs text-blue-300">
          Sinal gerado após análise completa do fechamento da vela
        </span>
      </div>

      <div className="space-y-2">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Lightbulb className="w-4 h-4 text-yellow-400" />
            <span className="text-sm font-medium">Gatilhos Detectados</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {signal.triggers.slice(0, 4).map((trigger, idx) => (
              <Badge key={idx} variant="secondary" className="text-xs">
                {trigger}
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-1">
            <Filter className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-medium">Filtros Aprovados</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {signal.filters.slice(0, 4).map((filter, idx) => (
              <Badge key={idx} variant="outline" className="text-xs">
                {filter}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-3 p-2 bg-secondary/50 rounded text-xs text-muted-foreground">
        <span className="font-medium">Análise Completa: </span>
        {signal.reasoning}
      </div>

      <div className="mt-2 text-xs text-muted-foreground text-right">
        <span className="font-semibold text-purple-400">PRISMA IA</span> • Análise Técnica Avançada
      </div>
    </Card>
  );
}