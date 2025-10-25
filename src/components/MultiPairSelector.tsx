import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CheckCircle, Circle, RefreshCw, TrendingUp } from 'lucide-react';
import { useOtcPairs } from '@/hooks/useOtcPairs';

interface MultiPairSelectorProps {
  selectedPairs: string[];
  onSelectionChange: (pairs: string[]) => void;
}

export function MultiPairSelector({ selectedPairs, onSelectionChange }: MultiPairSelectorProps) {
  const { pairs, loading, apiAvailable, refreshPairs } = useOtcPairs();
  const [selectAll, setSelectAll] = useState(false);

  const handleSelectAll = () => {
    if (selectAll) {
      onSelectionChange([]);
    } else {
      onSelectionChange(pairs.map(p => p.name));
    }
    setSelectAll(!selectAll);
  };

  const handleTogglePair = (pairName: string) => {
    if (selectedPairs.includes(pairName)) {
      onSelectionChange(selectedPairs.filter(p => p !== pairName));
    } else {
      onSelectionChange([...selectedPairs, pairName]);
    }
  };

  return (
    <Card className="p-4 bg-card/80 backdrop-blur border-purple-500/30">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="font-bold flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-purple-400" />
            Seleção de Pares OTC
          </h3>
          <p className="text-xs text-muted-foreground">
            Selecione os pares que deseja analisar
          </p>
        </div>
        <Button
          size="sm"
          variant="outline"
          onClick={refreshPairs}
          disabled={loading}
          className="border-purple-500/30"
        >
          <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} />
        </Button>
      </div>

      <div className="flex items-center gap-2 mb-3">
        {apiAvailable ? (
          <Badge variant="outline" className="text-xs bg-green-500/10 text-green-400 border-green-500/30">
            ✓ API Conectada
          </Badge>
        ) : (
          <Badge variant="outline" className="text-xs bg-yellow-500/10 text-yellow-400 border-yellow-500/30">
            ⚠ Usando pares padrão
          </Badge>
        )}
        <Badge variant="outline" className="text-xs bg-purple-500/10 text-purple-400 border-purple-500/30">
          {selectedPairs.length} de {pairs.length} selecionados
        </Badge>
      </div>

      <Button
        onClick={handleSelectAll}
        variant="outline"
        size="sm"
        className="w-full mb-3 border-purple-500/30"
      >
        {selectAll ? (
          <>
            <CheckCircle className="w-4 h-4 mr-2" />
            Desselecionar Todos
          </>
        ) : (
          <>
            <Circle className="w-4 h-4 mr-2" />
            Selecionar Todos
          </>
        )}
      </Button>

      <ScrollArea className="h-[300px] pr-4">
        <div className="space-y-2">
          {pairs.map((pair) => {
            const isSelected = selectedPairs.includes(pair.name);
            
            return (
              <div
                key={pair.symbol}
                className={`flex items-center justify-between p-3 rounded-lg border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-purple-500/20 border-purple-500/50'
                    : 'bg-secondary/50 border-border hover:bg-secondary'
                }`}
                onClick={() => handleTogglePair(pair.name)}
              >
                <div className="flex items-center gap-3 flex-1">
                  <Checkbox
                    checked={isSelected}
                    onCheckedChange={() => handleTogglePair(pair.name)}
                  />
                  <div className="flex-1">
                    <div className="font-medium text-sm">{pair.name}</div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                      <span className={`w-2 h-2 rounded-full ${pair.active ? 'bg-green-500' : 'bg-red-500'}`} />
                      {pair.active ? 'Ativo' : 'Inativo'}
                    </div>
                  </div>
                </div>

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
              </div>
            );
          })}
        </div>
      </ScrollArea>

      <div className="mt-3 p-2 bg-purple-500/10 border border-purple-500/30 rounded text-xs text-purple-300">
        💡 O PRISMA IA analisará todos os pares selecionados em tempo real
      </div>
    </Card>
  );
}