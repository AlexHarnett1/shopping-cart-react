import { createContext, useState } from "react";

interface ThemeProviderProps {
  children: any
}

export interface ThemeContextType { 
  isDarkMode: boolean, 
  handleThemeChange: () => void
}

const initialThemeContext: ThemeContextType = {
  isDarkMode: true,
  handleThemeChange: () => {
    throw new Error("Couldn't find function")
  },
}

export const ThemeContext = createContext(initialThemeContext);

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const handleThemeChange = () => {
    setIsDarkMode(!isDarkMode)
  } 

  return (
    <ThemeContext value={{ isDarkMode, handleThemeChange }}>
      {children}
    </ThemeContext>
  )
}