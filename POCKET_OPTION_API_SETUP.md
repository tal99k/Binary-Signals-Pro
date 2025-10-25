# 🔌 Configuração da API da Pocket Option

## 📋 Pré-requisitos

- Python 3.8 ou superior
- pip (gerenciador de pacotes Python)

## 🚀 Instalação

### 1. Criar pasta para API

```bash
mkdir pocketoption_api
cd pocketoption_api
```

### 2. Instalar dependências

```bash
pip install fastapi uvicorn pocketoptionapi
```

### 3. Criar arquivo `main.py`

Crie um arquivo `main.py` com o seguinte conteúdo:

```python
import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pocketoptionapi import PocketOption

app = FastAPI()

# Configurar CORS para permitir requisições do frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8080", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Instância da API Pocket Option
po = PocketOption()

@app.on_event("startup")
async def startup_event():
    """Conecta à Pocket Option ao iniciar"""
    try:
        await po.connect()
        print("✅ Conectado à Pocket Option!")
    except Exception as e:
        print(f"❌ Erro ao conectar: {e}")

@app.get("/health")
async def health_check():
    """Verifica se a API está rodando"""
    return {"status": "ok", "message": "API da Pocket Option está ativa"}

@app.get("/otc")
async def get_otc():
    """Retorna todos os pares OTC disponíveis com payout"""
    try:
        markets = await po.get_markets()
        otc_pairs = [
            {
                "symbol": m.get("symbol", ""),
                "name": m.get("name", ""),
                "type": m.get("type", "otc"),
                "active": m.get("active", True),
                "category": m.get("category", "forex"),
                "payout": m.get("payout", 85)  # Percentual de payout (85-95%)
            }
            for m in markets if m.get("type") == "otc" and m.get("payout", 0) >= 85
        ]
        print(f"📊 Retornando {len(otc_pairs)} pares OTC com payout >= 85%")
        return otc_pairs
    except Exception as e:
        print(f"❌ Erro ao buscar pares OTC: {e}")
        return []

@app.get("/candles/{symbol}")
async def get_candles(symbol: str, timeframe: str = "60"):
    """
    Retorna candles históricos de um par
    
    Args:
        symbol: Símbolo do par (ex: AUDCAD_otc)
        timeframe: Timeframe em segundos (60=1m, 300=5m, etc)
    """
    try:
        candles = await po.get_candles(symbol, int(timeframe))
        print(f"📈 Retornando {len(candles)} candles de {symbol}")
        return candles
    except Exception as e:
        print(f"❌ Erro ao buscar candles de {symbol}: {e}")
        return []

if __name__ == "__main__":
    print("🚀 Iniciando API da Pocket Option...")
    print("📡 Servidor rodando em: http://localhost:8000")
    print("📚 Documentação disponível em: http://localhost:8000/docs")
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
```

## ▶️ Como Executar

### Terminal 1: Rodar a API Python

```bash
cd pocketoption_api
python main.py
```

Você verá:
```
🚀 Iniciando API da Pocket Option...
📡 Servidor rodando em: http://localhost:8000
✅ Conectado à Pocket Option!
```

### Terminal 2: Rodar o PRISMA IA

```bash
npm run dev
```

## ✅ Verificação

1. **API funcionando:**
   - Acesse: http://localhost:8000/health
   - Deve retornar: `{"status": "ok"}`

2. **Pares OTC:**
   - Acesse: http://localhost:8000/otc
   - Deve retornar lista de pares

3. **No PRISMA IA:**
   - Badge verde: "✓ API Conectada"
   - Seletor com todos os pares OTC reais

## 🔧 Troubleshooting

### Erro: "Connection refused"
- Certifique-se que a API Python está rodando
- Verifique se a porta 8000 está livre

### Erro: "CORS policy"
- Confirme que `allow_origins` inclui a porta do seu app
- Reinicie a API após mudanças

### Pares não aparecem
- Verifique logs da API Python
- Teste manualmente: `curl http://localhost:8000/otc`

## 📚 Documentação da API

Com a API rodando, acesse:
- **Swagger UI:** http://localhost:8000/docs
- **ReDoc:** http://localhost:8000/redoc

## 🎯 Recursos Disponíveis

- ✅ Lista de pares OTC em tempo real
- ✅ Histórico de candles
- ✅ Detecção automática de pares ativos
- ✅ Sincronização com PRISMA IA
- ✅ Fallback para pares padrão

## 💡 Dicas

1. **Mantenha a API rodando** enquanto usa o PRISMA IA
2. **Reinicie a API** se mudar configurações
3. **Verifique logs** para debug de problemas
4. **Use reload=True** para desenvolvimento

## 🔐 Segurança

⚠️ Esta API é para **desenvolvimento local apenas**
- Não exponha na internet sem autenticação
- Use HTTPS em produção
- Adicione rate limiting se necessário