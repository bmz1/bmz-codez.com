import { useState, useEffect } from "react";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import { useTheme } from "next-themes";

export function Layout({ children }) {
  // linear-gradient(240deg,#ffef74,#f1dd3f)
  return (
    <div className="w-full min-h-screen dark:bg-gray-700 dark:text-white">
      <div className="max-w-screen-md py-12 mx-auto antialiased font-body">
        <Header />
        <main className="relative">{children}</main>
        <footer className="text-lg font-light px-4">
          © {new Date().getFullYear()}, Built with{" "}
          <a href="https://nextjs.org/">Next.js</a>
          &#128293;
        </footer>
      </div>
    </div>
  );
}

const Header = () => {
  const { setTheme, resolvedTheme } = useTheme();
  const { pathname } = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const toggleDarkMode = (checked) => {
    const isDarkMode = checked;

    if (isDarkMode) setTheme("dark");
    else setTheme("light");
  };

  const isRoot = pathname === "/";
  const isDarkMode = resolvedTheme === "dark";

  return (
    <header
      id="#header"
      className={clsx(
        "fixed z-10 top-0 left-0 w-full h-16 flex bg-js-yellow-y dark:bg-gray-700 items-center justify-between p-5",
        {
          "mb-8": isRoot,
          "mb-2": !isRoot,
        }
      )}
    >
      <div className={"max-w-md"}>
        {isRoot ? <LargeTitle /> : <SmallTitle />}
      </div>
      {mounted && (
        <DarkModeSwitch
          checked={isDarkMode}
          onChange={toggleDarkMode}
          className={isRoot ? 28 : 24}
        />
      )}
    </header>
  );
};

const LargeTitle = () => (
  <h1>
    <Link href="/">
      <a
        className={clsx(
          "text-3xl font-black leading-none text-black no-underline font-display",
          "sm:text-5xl",
          "dark:text-white"
        )}
      >
        BMZCodez
      </a>
    </Link>
  </h1>
);

const SmallTitle = () => (
  <h1>
    <Link href="/">
      <a
        className={clsx(
          "text-2xl font-black text-black no-underline font-display",
          "dark:text-white"
        )}
      >
        BMZCodez
      </a>
    </Link>
  </h1>
);
