const currencySymbolMap = {
  USD: '$',
  EUR: '€',
  GBP: '£',
  TRY: '₺',
  JPY: '¥',
  CAD: '$',
  AUD: '$',
  CHF: 'CHF',
  INR: '₹',
  BRL: 'R$',
  CNY: '¥',
  MXN: '$',
  AED: 'د.إ',
  SAR: '﷼',
};

export const formatCurrency = (currencyCode) => {
  if (!currencyCode) {
    return '$';
  }

  return currencySymbolMap[currencyCode];
};
