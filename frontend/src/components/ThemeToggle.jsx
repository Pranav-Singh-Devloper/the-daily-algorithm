import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const [night, setNight] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("edition") === "night") {
      setNight(true);
      document.documentElement.classList.add("night");
    }
  }, []);

  const toggle = () => {
    const next = !night;
    setNight(next);
    document.documentElement.classList.toggle("night", next);
    localStorage.setItem("edition", next ? "night" : "day");
  };

  return (
    <button
      type="button"
      onClick={toggle}
      data-testid="theme-toggle"
      title="Switch edition"
      className="flex items-center gap-1 font-mono-np text-[9px] uppercase tracking-widest border border-ink px-2 py-0.5 hover:bg-ink hover:text-paper transition-colors duration-200 cursor-pointer"
    >
      {night ? <Sun size={11} /> : <Moon size={11} />}
      {night ? "Day" : "Night"}
    </button>
  );
}
