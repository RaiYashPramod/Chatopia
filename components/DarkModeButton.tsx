'use client'

import useColorMode from "@/hooks/useColorMode";
import { FC } from "react";

interface DarkModeButtonProps {}

const DarkModeButton= ({}) => {
  const [colorMode, setColorMode] = useColorMode();
  return (
    <button
      className="text-black bg-white border-black border px-3 py-3 dark:border-white dark:border dark:text-white dark:bg-black"
      onClick={() => setColorMode(colorMode === "light" ? "dark" : "light")}
    >
      Toggle Theme
    </button>
  );
};

export default DarkModeButton;
