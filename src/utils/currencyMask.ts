export const currencyMask = (value: string): string => {
  const clean_value = value.replace(/\D/g, "");

  const options = { minimumFractionDigits: 2 };
  const result = new Intl.NumberFormat("pt-BR", options).format(
    parseFloat(clean_value) / 100,
  );

  return `R$ ${result}`;
};

export const parseCurrencyToNumber = (value: string): number => {
  return Number(value.replace(/\D/g, "")) / 100;
};
