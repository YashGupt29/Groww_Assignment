export const formatMarketCap = (marketCap) => {
  if (marketCap >= 1_000_000_000_000) {
    return `$${(marketCap / 1_000_000_000_000).toFixed(2)}T`;
  }
  if (marketCap >= 1_000_000_000) {
    return `$${(marketCap / 1_000_000_000).toFixed(2)}B`;
  }
  return `$${marketCap.toFixed(2)}`;
};

export const formatDividendYield = (dividendYield) => {
  return `${(parseFloat(dividendYield) * 100).toFixed(2)}%`;
};

export const formatProfitMargin = (profitMargin) => {
  return parseFloat(profitMargin).toFixed(3);
};

export const formatPrice = (price) => {
  return `$${parseFloat(price).toFixed(2)}`;
};
