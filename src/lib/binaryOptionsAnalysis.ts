/**
 * 🎯 ANÁLISE AVANÇADA DE OPÇÕES BINÁRIAS - 1M ESPECIALIZADO
 * 
 * Conhecimento profundo de opções binárias com foco em 1 minuto
 * Análise de corpo, pavios, timing de entrada e cronômetro
 */

export interface CandleBodyAnalysis {
  bodySize: number; // Tamanho do corpo em %
  upperWickSize: number; // Pavio superior em %
  lowerWickSize: number; // Pavio inferior em %
  totalSize: number; // Tamanho total da vela
  isBullish: boolean;
  strength: 'FORTE' | 'MODERADA' | 'FRACA';
  pattern: string;
}

export interface TimingAnalysis {
  entryTiming: 'VELA_ATUAL' | 'PROXIMA_VELA' | 'AGUARDAR';
  reasoning: string;
  secondsRemaining: number;
  confidence: number;
  urgency: 'ALTA' | 'MEDIA' | 'BAIXA';
}

export interface BinaryOptionsSignal {
  candle: CandleBodyAnalysis;
  timing: TimingAnalysis;
  filters: string[];
  triggers: string[];
  winProbability: number;
}

/**
 * 📊 ANÁLISE DE CORPO E PAVIOS DA VELA
 */
export function analyzeCandleBody(
  open: number,
  high: number,
  low: number,
  close: number
): CandleBodyAnalysis {
  const isBullish = close > open;
  const bodySize = Math.abs(close - open);
  const totalSize = high - low;
  
  const upperWick = isBullish ? (high - close) : (high - open);
  const lowerWick = isBullish ? (open - low) : (close - low);
  
  const bodyPercent = totalSize > 0 ? (bodySize / totalSize) * 100 : 0;
  const upperWickPercent = totalSize > 0 ? (upperWick / totalSize) * 100 : 0;
  const lowerWickPercent = totalSize > 0 ? (lowerWick / totalSize) * 100 : 0;

  // Determinar força da vela
  let strength: 'FORTE' | 'MODERADA' | 'FRACA' = 'FRACA';
  if (bodyPercent > 70) strength = 'FORTE';
  else if (bodyPercent > 40) strength = 'MODERADA';

  // Identificar padrão
  let pattern = 'Normal';
  if (bodyPercent > 80) {
    pattern = isBullish ? 'Marubozu de Alta' : 'Marubozu de Baixa';
  } else if (bodyPercent < 20) {
    pattern = 'Doji - Indecisão';
  } else if (lowerWickPercent > 60 && isBullish) {
    pattern = 'Martelo - Reversão de Alta';
  } else if (upperWickPercent > 60 && !isBullish) {
    pattern = 'Estrela Cadente - Reversão de Baixa';
  } else if (upperWickPercent > 40 && lowerWickPercent > 40) {
    pattern = 'Pião - Indecisão';
  }

  return {
    bodySize: bodyPercent,
    upperWickSize: upperWickPercent,
    lowerWickSize: lowerWickPercent,
    totalSize,
    isBullish,
    strength,
    pattern
  };
}

/**
 * ⏰ ANÁLISE DE TIMING - QUANDO ENTRAR?
 */
export function analyzeEntryTiming(
  candleBody: CandleBodyAnalysis,
  secondsRemaining: number,
  confluence: number,
  trend: 'ALTA' | 'BAIXA' | 'LATERAL'
): TimingAnalysis {
  let entryTiming: 'VELA_ATUAL' | 'PROXIMA_VELA' | 'AGUARDAR' = 'AGUARDAR';
  let reasoning = '';
  let urgency: 'ALTA' | 'MEDIA' | 'BAIXA' = 'BAIXA';
  let confidence = 0;

  // 🎯 REGRAS DE TIMING PARA OPÇÕES BINÁRIAS 1M

  // Caso 1: Vela acabou de nascer (55-60s restantes)
  if (secondsRemaining >= 55) {
    if (candleBody.strength === 'FORTE' && confluence >= 85) {
      entryTiming = 'VELA_ATUAL';
      urgency = 'ALTA';
      confidence = 90;
      reasoning = `⚡ ENTRADA IMEDIATA! Vela com força ${candleBody.strength}, confluência ${confluence}%, ${candleBody.pattern}. Entre AGORA na vela atual!`;
    } else if (confluence >= 80) {
      entryTiming = 'PROXIMA_VELA';
      urgency = 'MEDIA';
      confidence = 75;
      reasoning = `⏳ Aguarde confirmação. Entre na PRÓXIMA vela quando ela abrir com ${secondsRemaining}s restantes.`;
    } else {
      entryTiming = 'AGUARDAR';
      urgency = 'BAIXA';
      confidence = 50;
      reasoning = `⚠️ Confluência baixa (${confluence}%). Aguarde setup melhor.`;
    }
  }
  // Caso 2: Meio da vela (30-54s restantes)
  else if (secondsRemaining >= 30) {
    if (candleBody.strength === 'FORTE' && confluence >= 90) {
      entryTiming = 'VELA_ATUAL';
      urgency = 'ALTA';
      confidence = 85;
      reasoning = `🔥 Entrada ainda viável! Vela forte + confluência ${confluence}%. Entre AGORA com ${secondsRemaining}s!`;
    } else if (confluence >= 85) {
      entryTiming = 'PROXIMA_VELA';
      urgency = 'MEDIA';
      confidence = 80;
      reasoning = `📊 Setup formando. Prepare-se para entrar na PRÓXIMA vela.`;
    } else {
      entryTiming = 'AGUARDAR';
      urgency = 'BAIXA';
      confidence = 60;
      reasoning = `⏸️ Setup não ideal no meio da vela. Aguarde próxima oportunidade.`;
    }
  }
  // Caso 3: Final da vela (1-29s restantes)
  else if (secondsRemaining >= 1) {
    // NÃO ENTRAR NO FINAL DA VELA!
    entryTiming = 'PROXIMA_VELA';
    urgency = 'ALTA';
    confidence = confluence >= 80 ? 85 : 70;
    reasoning = `⏰ Vela fechando em ${secondsRemaining}s! Aguarde abertura da PRÓXIMA vela para entrada com mais tempo de expiração.`;
  }
  // Caso 4: Vela fechada (0s)
  else {
    if (confluence >= 85 && candleBody.strength === 'FORTE') {
      entryTiming = 'PROXIMA_VELA';
      urgency = 'ALTA';
      confidence = 90;
      reasoning = `✅ Vela confirmada! ${candleBody.pattern}. Entre AGORA na vela que acabou de abrir!`;
    } else {
      entryTiming = 'AGUARDAR';
      urgency = 'BAIXA';
      confidence = 50;
      reasoning = `📉 Vela fechada sem setup ideal. Aguarde nova formação.`;
    }
  }

  return {
    entryTiming,
    reasoning,
    secondsRemaining,
    confidence,
    urgency
  };
}

/**
 * 🎯 FILTROS ESPECÍFICOS PARA OPÇÕES BINÁRIAS 1M
 */
export function getBinaryOptionsFilters1M(
  candleBody: CandleBodyAnalysis,
  volume: number,
  averageVolume: number,
  trend: 'ALTA' | 'BAIXA' | 'LATERAL'
): string[] {
  const filters: string[] = [];

  // Filtro 1: Corpo da vela
  if (candleBody.bodySize > 70) {
    filters.push(`✅ Corpo forte (${candleBody.bodySize.toFixed(1)}%) - Movimento decisivo`);
  } else if (candleBody.bodySize < 30) {
    filters.push(`⚠️ Corpo fraco (${candleBody.bodySize.toFixed(1)}%) - Indecisão detectada`);
  }

  // Filtro 2: Pavios
  if (candleBody.isBullish && candleBody.lowerWickSize > 50) {
    filters.push(`✅ Pavio inferior ${candleBody.lowerWickSize.toFixed(1)}% - Rejeição de baixa, compra forte`);
  } else if (!candleBody.isBullish && candleBody.upperWickSize > 50) {
    filters.push(`✅ Pavio superior ${candleBody.upperWickSize.toFixed(1)}% - Rejeição de alta, venda forte`);
  }

  // Filtro 3: Padrão de reversão
  if (candleBody.pattern.includes('Martelo') || candleBody.pattern.includes('Estrela')) {
    filters.push(`🎯 Padrão de reversão: ${candleBody.pattern}`);
  }

  // Filtro 4: Volume
  const volumeRatio = averageVolume > 0 ? (volume / averageVolume) * 100 : 100;
  if (volumeRatio > 150) {
    filters.push(`📊 Volume ${volumeRatio.toFixed(0)}% da média - Movimento forte`);
  } else if (volumeRatio < 70) {
    filters.push(`⚠️ Volume baixo ${volumeRatio.toFixed(0)}% - Pouca participação`);
  }

  // Filtro 5: Alinhamento com tendência
  if (trend === 'ALTA' && candleBody.isBullish) {
    filters.push(`📈 Vela alinhada com tendência de alta`);
  } else if (trend === 'BAIXA' && !candleBody.isBullish) {
    filters.push(`📉 Vela alinhada com tendência de baixa`);
  } else if (trend === 'LATERAL') {
    filters.push(`➡️ Mercado lateral - Reversão possível`);
  }

  // Filtro 6: Força da vela
  filters.push(`💪 Força da vela: ${candleBody.strength}`);

  return filters;
}

/**
 * 🎯 GATILHOS ESPECÍFICOS PARA OPÇÕES BINÁRIAS 1M
 */
export function getBinaryOptionsTriggers1M(
  candleBody: CandleBodyAnalysis,
  timing: TimingAnalysis,
  confluence: number
): string[] {
  const triggers: string[] = [];

  // Gatilho 1: Padrão da vela
  triggers.push(`📊 Padrão: ${candleBody.pattern}`);

  // Gatilho 2: Timing
  if (timing.entryTiming === 'VELA_ATUAL') {
    triggers.push(`⚡ ENTRAR AGORA! ${timing.secondsRemaining}s restantes`);
  } else if (timing.entryTiming === 'PROXIMA_VELA') {
    triggers.push(`⏳ Aguardar próxima vela abrir (${timing.secondsRemaining}s)`);
  } else {
    triggers.push(`⏸️ Aguardar setup melhor`);
  }

  // Gatilho 3: Confluência
  if (confluence >= 90) {
    triggers.push(`🎯 Confluência MÁXIMA: ${confluence}%`);
  } else if (confluence >= 80) {
    triggers.push(`✅ Confluência ALTA: ${confluence}%`);
  } else if (confluence >= 70) {
    triggers.push(`⚠️ Confluência MODERADA: ${confluence}%`);
  }

  // Gatilho 4: Corpo vs Pavios
  const bodyDominance = candleBody.bodySize > (candleBody.upperWickSize + candleBody.lowerWickSize);
  if (bodyDominance) {
    triggers.push(`💪 Corpo domina pavios - Movimento forte`);
  } else {
    triggers.push(`⚠️ Pavios dominam corpo - Indecisão`);
  }

  // Gatilho 5: Direção clara
  if (candleBody.bodySize > 60) {
    triggers.push(`🎯 Direção clara: ${candleBody.isBullish ? 'COMPRA' : 'VENDA'}`);
  }

  // Gatilho 6: Urgência
  triggers.push(`⏰ Urgência: ${timing.urgency}`);

  return triggers;
}

/**
 * 🎯 ANÁLISE COMPLETA PARA OPÇÕES BINÁRIAS 1M
 */
export function analyzeBinaryOptions1M(
  open: number,
  high: number,
  low: number,
  close: number,
  volume: number,
  averageVolume: number,
  secondsRemaining: number,
  confluence: number,
  trend: 'ALTA' | 'BAIXA' | 'LATERAL'
): BinaryOptionsSignal {
  const candleBody = analyzeCandleBody(open, high, low, close);
  const timing = analyzeEntryTiming(candleBody, secondsRemaining, confluence, trend);
  const filters = getBinaryOptionsFilters1M(candleBody, volume, averageVolume, trend);
  const triggers = getBinaryOptionsTriggers1M(candleBody, timing, confluence);

  // Calcular probabilidade de win
  let winProbability = confluence;
  
  // Ajustes baseados no timing
  if (timing.entryTiming === 'VELA_ATUAL' && secondsRemaining >= 55) {
    winProbability += 5;
  } else if (timing.entryTiming === 'VELA_ATUAL' && secondsRemaining < 30) {
    winProbability -= 10; // Penaliza entrada no meio da vela
  }

  // Ajustes baseados no corpo
  if (candleBody.strength === 'FORTE') {
    winProbability += 5;
  } else if (candleBody.strength === 'FRACA') {
    winProbability -= 5;
  }

  // Ajustes baseados no padrão
  if (candleBody.pattern.includes('Martelo') || candleBody.pattern.includes('Estrela')) {
    winProbability += 5;
  }

  winProbability = Math.min(98, Math.max(50, winProbability));

  return {
    candle: candleBody,
    timing,
    filters,
    triggers,
    winProbability
  };
}

/**
 * ⏰ DETECTA CRONÔMETRO DA VELA
 */
export function detectCandleTimer(
  candleOpenTime: Date,
  timeframe: '1m' | '2m' | '3m' | '5m'
): {
  secondsRemaining: number;
  progress: number;
  status: 'INICIO' | 'MEIO' | 'FINAL' | 'FECHADA';
} {
  const now = new Date();
  const timeframeMs = parseInt(timeframe) * 60 * 1000;
  const candleCloseTime = new Date(candleOpenTime.getTime() + timeframeMs);
  
  const elapsed = now.getTime() - candleOpenTime.getTime();
  const remaining = candleCloseTime.getTime() - now.getTime();
  
  const secondsRemaining = Math.max(0, Math.floor(remaining / 1000));
  const progress = elapsed / timeframeMs * 100;

  let status: 'INICIO' | 'MEIO' | 'FINAL' | 'FECHADA' = 'MEIO';
  if (secondsRemaining <= 0) {
    status = 'FECHADA';
  } else if (progress < 20) {
    status = 'INICIO';
  } else if (progress > 80) {
    status = 'FINAL';
  }

  return {
    secondsRemaining,
    progress,
    status
  };
}

/**
 * 📈 PREVISÃO DA PRÓXIMA VELA
 */
export function predictNextCandle(
  currentCandle: CandleBodyAnalysis,
  previousCandles: CandleBodyAnalysis[],
  trend: 'ALTA' | 'BAIXA' | 'LATERAL'
): {
  direction: 'CALL' | 'PUT' | 'INCERTO';
  confidence: number;
  reasoning: string;
} {
  let direction: 'CALL' | 'PUT' | 'INCERTO' = 'INCERTO';
  let confidence = 50;
  let reasoning = '';

  // Análise de sequência
  const bullishCount = previousCandles.filter(c => c.isBullish).length;
  const bearishCount = previousCandles.length - bullishCount;

  // Vela forte indica continuação
  if (currentCandle.strength === 'FORTE') {
    direction = currentCandle.isBullish ? 'CALL' : 'PUT';
    confidence = 75;
    reasoning = `Vela forte ${currentCandle.pattern} indica continuação na direção ${currentCandle.isBullish ? 'alta' : 'baixa'}`;
  }
  // Vela de reversão
  else if (currentCandle.pattern.includes('Martelo')) {
    direction = 'CALL';
    confidence = 80;
    reasoning = 'Martelo detectado - reversão de alta esperada';
  }
  else if (currentCandle.pattern.includes('Estrela')) {
    direction = 'PUT';
    confidence = 80;
    reasoning = 'Estrela cadente detectada - reversão de baixa esperada';
  }
  // Tendência
  else if (trend === 'ALTA' && bullishCount > bearishCount) {
    direction = 'CALL';
    confidence = 70;
    reasoning = 'Tendência de alta estabelecida';
  }
  else if (trend === 'BAIXA' && bearishCount > bullishCount) {
    direction = 'PUT';
    confidence = 70;
    reasoning = 'Tendência de baixa estabelecida';
  }

  return { direction, confidence, reasoning };
}
