import ThemeToggle from "./ThemeToggle";
import Language from "./language";
import HeaderAuth from "./header-auth";
import HeaderClientSide from "./HeaderClientSide";

export default function Header(): JSX.Element {
  return (
    <header className="fixed top-0 z-50 flex h-12 w-full items-center justify-center bg-white bg-opacity-90 shadow-md dark:bg-stone-800 dark:bg-opacity-90 dark:text-white">
      <div className="w-full max-w-[1110px] mx-auto flex justify-between items-center px-4">
        <HeaderClientSide />
        <div className="flex items-center gap-3">
          <HeaderAuth />
          <Language />
          <div className="w-9 h-9">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
