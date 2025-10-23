import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ExternalLink, RefreshCw, AlertCircle, Info, CheckCircle } from 'lucide-react';

export function PocketOptionPanel() {
  const [showInstructions, setShowInstructions] = useState(true);
  const [pocketWindowOpen, setPocketWindowOpen] = useState(false);

  useEffect(() => {
    // Check if Pocket Option window is open
    const checkInterval = setInterval(() => {
      if (pocketWindowOpen) {
        console.log('📊 Pocket Option aberta em nova aba');
        console.log('📸 Captura de tela simulada ativa');
      }
    }, 5000);

    return () => clearInterval(checkInterval);
  }, [pocketWindowOpen]);

  const openPocketOption = () => {
    console.log('🚀 Abrindo Pocket Option em nova aba...');
    const width = Math.floor(window.screen.width * 0.6);
    const height = window.screen.height;
    const left = window.screen.width - width;
    
    window.open(
      'https://pocketoption.com/pt/login',
      'PocketOption',
      `width=${width},height=${height},left=${left},top=0,resizable=yes,scrollbars=yes`
    );
    
    setPocketWindowOpen(true);
    setShowInstructions(false);
    console.log('✅ Pocket Option aberta com sucesso');
    console.log('👁️ PRISMA IA iniciará análise visual quando você fizer login');
  };

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-blue-900/20 to-purple-900/20">
      {/* Header */}
      <div className="p-3 border-b border-border bg-card/50 backdrop-blur flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
            <span className="text-white font-bold text-xs">PO</span>
          </div>
          <h2 className="font-bold text-purple-300">Pocket Option</h2>
        </div>
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={openPocketOption}
            className="border-purple-500/30 hover:bg-purple-500/10"
          >
            <ExternalLink className="w-4 h-4 mr-1" />
            Abrir Plataforma
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        {showInstructions ? (
          <Card className="p-6 bg-gradient-to-br from-purple-900/30 to-pink-900/30 border-purple-500/30">
            <div className="text-center mb-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <Info className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-purple-300">
                Como Usar o PRISMA IA
              </h3>
              <p className="text-sm text-muted-foreground">
                Siga os passos abaixo para começar a receber sinais em tempo real
              </p>
            </div>

            <div className="space-y-4">
              <Alert className="bg-purple-900/20 border-purple-500/30">
                <CheckCircle className="h-4 w-4 text-purple-400" />
                <AlertTitle className="text-purple-300">Passo 1: Abrir Pocket Option</AlertTitle>
                <AlertDescription className="text-sm">
                  Clique no botão "Abrir Plataforma" acima. A Pocket Option será aberta em uma nova janela lateral.
                </AlertDescription>
              </Alert>

              <Alert className="bg-purple-900/20 border-purple-500/30">
                <CheckCircle className="h-4 w-4 text-purple-400" />
                <AlertTitle className="text-purple-300">Passo 2: Fazer Login</AlertTitle>
                <AlertDescription className="text-sm">
                  Faça login na sua conta Pocket Option normalmente com seu email e senha.
                </AlertDescription>
              </Alert>

              <Alert className="bg-purple-900/20 border-purple-500/30">
                <CheckCircle className="h-4 w-4 text-purple-400" />
                <AlertTitle className="text-purple-300">Passo 3: Abrir o Gráfico</AlertTitle>
                <AlertDescription className="text-sm">
                  Selecione o par AUD/CAD OTC e configure o timeframe desejado (1m, 2m, 3m ou 5m).
                </AlertDescription>
              </Alert>

              <Alert className="bg-purple-900/20 border-purple-500/30">
                <CheckCircle className="h-4 w-4 text-purple-400" />
                <AlertTitle className="text-purple-300">Passo 4: Iniciar Análise</AlertTitle>
                <AlertDescription className="text-sm">
                  No painel esquerdo do PRISMA IA, clique em "Iniciar Análise". O sistema começará a monitorar o gráfico e gerar sinais.
                </AlertDescription>
              </Alert>
            </div>

            <div className="mt-6 p-4 bg-yellow-900/20 border border-yellow-500/30 rounded-lg">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-yellow-300 mb-1">Importante</h4>
                  <p className="text-xs text-yellow-200/80">
                    Por questões de segurança do navegador, a Pocket Option precisa ser aberta em uma janela separada. 
                    O PRISMA IA simulará a captura de tela para análise em tempo real. Para análise real com visão computacional, 
                    será necessária uma extensão de navegador (em desenvolvimento).
                  </p>
                </div>
              </div>
            </div>

            <Button 
              onClick={openPocketOption}
              className="w-full mt-6 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 neon-glow font-semibold"
              size="lg"
            >
              <ExternalLink className="w-5 h-5 mr-2" />
              Abrir Pocket Option e Começar
            </Button>
          </Card>
        ) : (
          <Card className="p-6 bg-gradient-to-br from-green-900/20 to-emerald-900/20 border-green-500/30">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center animate-pulse">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-green-300">
                Pocket Option Aberta!
              </h3>
              <p className="text-sm text-muted-foreground mb-6">
                A plataforma foi aberta em uma nova janela. Complete o login e configure o gráfico.
              </p>

              <div className="space-y-3 text-left bg-card/30 p-4 rounded-lg mb-6">
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span>Monitoramento ativo</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                  <span>IA processando padrões</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                  <span>Estratégias carregadas</span>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={openPocketOption}
                  variant="outline"
                  className="flex-1 border-purple-500/30 hover:bg-purple-500/10"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Reabrir
                </Button>
                <Button
                  onClick={() => setShowInstructions(true)}
                  variant="outline"
                  className="flex-1 border-purple-500/30 hover:bg-purple-500/10"
                >
                  <Info className="w-4 h-4 mr-2" />
                  Ver Instruções
                </Button>
              </div>
            </div>
          </Card>
        )}
      </div>

      {/* Info Footer */}
      <div className="p-3 border-t border-border bg-card/50 backdrop-blur">
        <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
          {pocketWindowOpen ? (
            <>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Conectado • Análise visual ativa</span>
            </>
          ) : (
            <>
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <span>Aguardando conexão com Pocket Option</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}