import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const lightTheme = {
  mode: "light" as const,
  bgClass: "bg-[#F5F5F599]",
  secondBgClass: "bg-[#BDBBB2]",
  secondBgClassOpposite: "bg-neutral-gradient",
  plainBg: "bg-[#DEDEDE]",
  textColor: "text-[#1E1E1E]",
  nameColor: "text-[#4353FF]",
  altNameColor: "text-[#BDBBB2]",
  borderColor: "border-[#1E1E1E]",
  altBorderColor: "border-[#BDBBB2]",
  borderRGBA: "border-[rgba(4,22,26,0.5)]",
  buttonBg: "bg-[#BDBBB2]",
  altText: "text-white",
  image: "/images/teslim2.png",
  navbarBg: "bg-light-nav",
  navbarText: "text-[#141413]",
  navAltText: "text-[#141413]",
  navHoverText: "hover:text-white",
  navbarScrolledBg: "bg-[#141413]",
  navButton: "text-[#BDBBB2]",
  Logo: "/images/DarkLogo.png",
  AltbuttonBg: "bg-[#BDBBB2]",
  secondBgAlt: "bg-[#BDBBB2]",
  buttontext: "text-white",
  altButtonText: "text-[#BDBBB2]",
  boxBg: "bg-[#D9D9D9]",
  NextBg: "bg-white",
  footerBg: "bg-[#D9D9D9]",
};

const darkTheme = {
  mode: "dark" as const,
  bgClass: "bg-[#141413]",
  secondBgClass: "bg-white",
  secondBgClassOpposite: "bg-white",
  plainBg: "bg-neutral-gradient",
  textColor: "text-[#FFFFFFB8]",
  nameColor: "text-white",
  altNameColor: "text-white",
  borderColor: "border-white",
  altBorderColor: "border-[#BDBBB2]",
  buttonBg: "bg-[#BDBBB2]",
  altText: "text-[#BDBBB2]",
  image: "/images/teslim.png",
  navbarBg: "bg-neutral-nav",
  navbarText: "text-white",
  navAltText: "text-white",
  navbarScrolledBg: "bg-[#141413]",
  navButton: "text-white",
  Logo: "/images/LightLogo.png",
  AltbuttonBg: "bg-white",
  secondBgAlt: "bg-[#BDBBB2]",
  buttontext: "text-[#141413]",
  altButtonText: "text-[#BDBBB2]",
  navHoverText: "hover:text-[#BDBBB2]",
  borderRGBA: "border-[rgba(255,255,255,0.3)]",
  boxBg: "bg-[#141413]",
  NextBg: "bg-[#0D0E0F]",
  footerBg: "bg-deep-gradient",
};

interface ThemeState {
  mode: "light" | "dark";
  bgClass: string;
  secondBgClass: string;
  secondBgClassOpposite: string;
  plainBg: string;
  textColor: string;
  nameColor: string;
  altNameColor: string;
  borderColor: string;
  altBorderColor: string;
  buttonBg: string;
  altText: string;
  image: string;
  navbarBg: string;
  navbarText: string;
  navAltText: string;
  navbarScrolledBg: string;
  navButton: string;
  Logo: string;
  AltbuttonBg: string;
  buttontext: string;
  altButtonText: string;
  navHoverText: string;
  borderRGBA: string;
  NextBg: string;
  footerBg: string;
  boxBg: string;
  secondBgAlt: string;
  isHydrated: boolean;
  toggleTheme: () => void;
  setTheme: (theme: typeof lightTheme | typeof darkTheme) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      ...darkTheme, // default theme
      isHydrated: false,
      toggleTheme: () => {
        const current = get().mode;
        set(current === "dark" ? lightTheme : darkTheme);
      },
      setTheme: (theme) => set(theme),
    }),
    {
      name: "theme-storage",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        state?.isHydrated && (state.isHydrated = true);
      },
    }
  )
);

// Separate hook to ensure hydration before rendering
export const useHydratedTheme = () => {
  const store = useThemeStore();
  if (!store.isHydrated) {
    return { ...darkTheme, isHydrated: false, toggleTheme: store.toggleTheme, setTheme: store.setTheme };
  }
  
  return store;
};