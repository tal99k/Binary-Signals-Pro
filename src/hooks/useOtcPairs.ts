import { useState, useEffect } from 'react';
import { getOtcPairs, checkApiStatus, OTCMarket } from '@/lib/pocketOptionService';

export function useOtcPairs() {
  const [pairs, setPairs] = useState<OTCMarket[]>([]);
  const [loading, setLoading] = useState(true);
  const [apiAvailable, setApiAvailable] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadPairs();
  }, []);

  const loadPairs = async () => {
    try {
      console.log('🔍 Verificando API da Pocket Option...');
      setLoading(true);
      setError(null);

      // Verifica se a API está disponível
      const isAvailable = await checkApiStatus();
      setApiAvailable(isAvailable);

      if (isAvailable) {
        console.log('✅ API da Pocket Option conectada!');
      } else {
        console.log('⚠️ API não disponível. Usando pares padrão.');
        console.log('💡 Para conectar: rode python main.py na pasta pocketoption_api');
      }

      // Busca pares OTC (usa fallback se API não disponível)
      const otcPairs = await getOtcPairs();
      setPairs(otcPairs);
      
      console.log(`📊 ${otcPairs.length} pares OTC carregados`);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro ao carregar pares OTC';
      setError(message);
      console.error('❌', message);
    } finally {
      setLoading(false);
    }
  };

  const refreshPairs = () => {
    loadPairs();
  };

  return {
    pairs,
    loading,
    apiAvailable,
    error,
    refreshPairs
  };
}