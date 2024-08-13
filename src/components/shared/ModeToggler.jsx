import { Button } from "../ui/button";
import { useTheme } from "../../context/ThemeProviderContext";
import { RiMoonLine, RiSunLine } from "@remixicon/react";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  /**
   * Toggle Theme
   */
  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else if (theme === "dark") {
      setTheme("light");
    }
  };
  return (
    <Button
      variant="ghost"
      size="icon"
      className="rounded-full"
      onClick={toggleTheme}
    >
      <RiSunLine
        size={18}
        className="rotate-90 scale-0 transition-transform duration-300 dark:-rotate-0 dark:scale-100"
      />
      <RiMoonLine
        size={18}
        className="absolute rotate-0 scale-100 transition-transform duration-300 dark:-rotate-90 dark:scale-0"
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
