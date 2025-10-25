import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RefreshCw, TrendingUp, Eye, Zap } from 'lucide-react';

interface MarketScannerProps {
  opportunities: Array<{
    pair: {
      symbol: string;
      name: string;
      payout?: number;
      active: boolean;
    };
    signal: any;
    analyzing: boolean;
  }>;
  scanning: boolean;
  lastScanTime: Date | null;
  onRefresh: () => void;
  currentAsset: string;
  onSelectAsset: (asset: string) => void;
}

export function MarketScanner({
  opportunities,
  scanning,
  lastScanTime,
  onRefresh,
  currentAsset,
  onSelectAsset
}: MarketScannerProps) {
  return (
    <Card className="p-4 bg-card/80 backdrop-blur border-purple-500/30">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="font-bold flex items-center gap-2">
            <Eye className="w-4 h-4 text-purple-400" />
            Scanner de Mercado
          </h3>
          <p className="text-xs text-muted-foreground">
            Monitorando pares com payout ≥ 85%
          </p>
        </div>
        <Button
          size="sm"
          variant="outline"
          onClick={onRefresh}
          disabled={scanning}
          className="border-purple-500/30"
        >
          <RefreshCw className={`w-3 h-3 ${scanning ? 'animate-spin' : ''}`} />
        </Button>
      </div>

      {lastScanTime && (
        <div className="text-xs text-muted-foreground mb-3">
          Última varredura: {lastScanTime.toLocaleTimeString('pt-BR')}
        </div>
      )}

      <div className="space-y-2 max-h-64 overflow-y-auto pr-2">
        {opportunities.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground text-sm">
            {scanning ? (
              <>
                <RefreshCw className="w-8 h-8 mx-auto mb-2 animate-spin text-purple-400" />
                Escaneando mercado...
              </>
            ) : (
              <>
                <Eye className="w-8 h-8 mx-auto mb-2 text-muted-foreground/50" />
                Nenhum par disponível
              </>
            )}
          </div>
        ) : (
          opportunities.map(({ pair, signal, analyzing }) => (
            <div
              key={pair.symbol}
              className={`p-3 rounded-lg border transition-all cursor-pointer ${
                currentAsset === pair.name
                  ? 'bg-purple-500/20 border-purple-500/50'
                  : 'bg-secondary/50 border-border hover:bg-secondary'
              }`}
              onClick={() => onSelectAsset(pair.name)}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="font-medium text-sm">{pair.name}</div>
                <div className="flex items-center gap-2">
                  {pair.payout && (
                    <Badge
                      variant="outline"
                      className={`text-xs ${
                        pair.payout >= 90
                          ? 'bg-green-500/20 text-green-400 border-green-500/50'
                          : 'bg-blue-500/20 text-blue-400 border-blue-500/50'
                      }`}
                    >
                      {pair.payout}%
                    </Badge>
                  )}
                  {analyzing && (
                    <Zap className="w-3 h-3 text-yellow-400 animate-pulse" />
                  )}
                </div>
              </div>

              {signal && (
                <div className="flex items-center gap-2 text-xs">
                  <TrendingUp className="w-3 h-3 text-green-400" />
                  <span className="text-green-400">Oportunidade detectada!</span>
                </div>
              )}

              <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                <span className={`w-2 h-2 rounded-full ${pair.active ? 'bg-green-500' : 'bg-red-500'}`} />
                {pair.active ? 'Ativo' : 'Inativo'}
              </div>
            </div>
          ))
        )}
      </div>

      <div className="mt-3 p-2 bg-purple-500/10 border border-purple-500/30 rounded text-xs text-purple-300">
        💡 Clique em um par para analisar com todas as {opportunities.length} estratégias
      </div>
    </Card>
  );
}