
export const getSignFromCurrency = (currency: string) => {
  switch (currency) {
    case "USD":
      return '$'
    case "EUR":
      return '€'
    case "YEN":
      return '¥'
    default:
      console.log(`Couldn't find currency sign for: ${currency}`)
      return '$'
  }
}