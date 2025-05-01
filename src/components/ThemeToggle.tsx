
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/ThemeProvider";
import { Switch } from "@/components/ui/switch";
import { useState, useEffect } from "react";

export function ThemeToggle({ variant = "icon" }: { variant?: "icon" | "switch" }) {
  const { setTheme, theme } = useTheme();
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsDarkMode(
        theme === "dark" || 
        (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches)
      );
    }
  }, [theme]);
  
  const toggleTheme = () => {
    setTheme(isDarkMode ? "light" : "dark");
  };

  if (variant === "switch") {
    return (
      <div className="flex items-center space-x-2">
        <Sun className="h-4 w-4 text-[#FEE6B9] dark:text-[#FEE6B9]" />
        <Switch 
          checked={isDarkMode} 
          onCheckedChange={toggleTheme} 
          aria-label="Toggle theme"
        />
        <Moon className="h-4 w-4 text-[#FEE6B9] dark:text-[#FEE6B9]" />
      </div>
    );
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="text-[#FEE6B9] hover:text-[#FCC050] hover:bg-transparent dark:text-[#FEE6B9] dark:hover:text-[#FCC050]"
      aria-label="Toggle theme"
    >
      {isDarkMode ? (
        <Sun className="h-5 w-5" />
      ) : (
        <Moon className="h-5 w-5" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
