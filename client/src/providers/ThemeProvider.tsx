import { createContext, useState } from "react";

interface ThemeProviderProps {
  children: any
}

const Currencies = ["USD", "EUR", "YEN"];

type Currency = typeof Currencies[number];

interface ThemeContextType { 
  isDarkMode: boolean, 
  handleThemeChange: () => void,
  currency: Currency,
  handleCurrencyChange: (currency: string) => void
}

const initialThemeContext: ThemeContextType = {
  isDarkMode: true,
  handleThemeChange: () => {
    throw new Error("Couldn't find handleThemeChange function")
  },
  currency: "USD",
  handleCurrencyChange: (_currency: string) => {
    throw new Error("Coulnd't find handleCurrencyChange function")
  }
}

function isCurrency(value: string): value is Currency {
  return Currencies.includes(value as Currency);
}

export const ThemeContext = createContext(initialThemeContext);

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const [currency, setCurrency] = useState<Currency>("USD");

  const handleThemeChange = () => {
    setIsDarkMode(!isDarkMode)
  }

  const handleCurrencyChange = (currency: string) => {
    if (!isCurrency(currency)) {
      throw new Error(`Passed unallowed currency value: ${currency}`)
    }
    setCurrency(currency)
    console.log(currency)
  }

  return (
    <ThemeContext value={{ isDarkMode, handleThemeChange, currency, handleCurrencyChange }}>
      {children}
    </ThemeContext>
  )
}