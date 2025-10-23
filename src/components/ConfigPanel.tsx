import { AnalysisConfig, STRATEGIES } from '@/types/signals';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

interface ConfigPanelProps {
  config: AnalysisConfig;
  onConfigChange: (config: AnalysisConfig) => void;
}

export function ConfigPanel({ config, onConfigChange }: ConfigPanelProps) {
  const timeframes: Array<'1m' | '2m' | '3m' | '5m'> = ['1m', '2m', '3m', '5m'];

  const toggleStrategy = (strategyId: string) => {
    const newStrategies = config.enabledStrategies.includes(strategyId)
      ? config.enabledStrategies.filter(id => id !== strategyId)
      : [...config.enabledStrategies, strategyId];
    
    onConfigChange({ ...config, enabledStrategies: newStrategies });
  };

  return (
    <Card className="m-4 p-4 bg-card/80 backdrop-blur border-primary/30 animate-fade-in-up">
      <h3 className="font-bold mb-4 flex items-center gap-2">
        <span className="w-2 h-2 bg-primary rounded-full"></span>
        Configurações de Análise Técnica
      </h3>

      {/* Asset Selection */}
      <div className="mb-4">
        <Label className="mb-2 block">Ativo Atual na Pocket Option</Label>
        <Input
          value={config.currentAsset}
          onChange={(e) => onConfigChange({ ...config, currentAsset: e.target.value })}
          placeholder="Ex: AUD/CAD OTC"
          className="bg-secondary/50 border-purple-500/30"
        />
        <p className="text-xs text-muted-foreground mt-1">
          O sistema detecta automaticamente o ativo em uso
        </p>
      </div>

      {/* Timeframe Selection */}
      <div className="mb-4">
        <Label className="mb-2 block">Timeframe do Gráfico</Label>
        <div className="flex gap-2">
          {timeframes.map(tf => (
            <button
              key={tf}
              onClick={() => onConfigChange({ ...config, timeframe: tf })}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                config.timeframe === tf
                  ? 'bg-primary text-primary-foreground neon-glow'
                  : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          Sincroniza com cronômetro - 1 análise completa por vela
        </p>
      </div>

      {/* Wait for Candle Close */}
      <div className="mb-4 flex items-center justify-between p-3 rounded-lg bg-secondary/50">
        <div>
          <Label>Aguardar Fechamento da Vela</Label>
          <p className="text-xs text-muted-foreground">
            Análise técnica completa apenas após vela fechar
          </p>
        </div>
        <Switch
          checked={config.waitForCandleClose}
          onCheckedChange={(checked) => onConfigChange({ ...config, waitForCandleClose: checked })}
        />
      </div>

      {/* Confidence Slider */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <Label>Confiança Mínima (Confluências)</Label>
          <Badge variant="outline">{config.minConfidence}%</Badge>
        </div>
        <Slider
          value={[config.minConfidence]}
          onValueChange={([value]) => onConfigChange({ ...config, minConfidence: value })}
          min={70}
          max={95}
          step={5}
          className="w-full"
        />
        <p className="text-xs text-muted-foreground mt-1">
          Baseado em: EMAs, ADX, MACD, RSI, Fibonacci, Volume, Price Action
        </p>
      </div>

      {/* Strategies */}
      <div>
        <Label className="mb-2 block">Estratégias Ativas ({config.enabledStrategies.length}/{STRATEGIES.length})</Label>
        <div className="space-y-2 max-h-64 overflow-y-auto pr-2">
          {STRATEGIES.map(strategy => (
            <div
              key={strategy.id}
              className="flex items-start justify-between p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
            >
              <div className="flex-1 mr-3">
                <div className="font-medium text-sm mb-1">{strategy.name}</div>
                <div className="text-xs text-muted-foreground mb-2">
                  {strategy.description}
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    PRISMA IA
                  </Badge>
                  <Badge variant="outline" className="text-xs bg-green-500/10 text-green-400 border-green-500/30">
                    Win Rate: {strategy.winRate}%
                  </Badge>
                </div>
              </div>
              <Switch
                checked={config.enabledStrategies.includes(strategy.id)}
                onCheckedChange={() => toggleStrategy(strategy.id)}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 p-3 bg-purple-500/10 border border-purple-500/30 rounded-lg">
        <p className="text-xs text-purple-300">
          💡 <strong>Dica:</strong> Quanto mais estratégias ativas, mais oportunidades detectadas. 
          Todas utilizam análise técnica profunda com múltiplos indicadores e confluências.
        </p>
      </div>
    </Card>
  );
}