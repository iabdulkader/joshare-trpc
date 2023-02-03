import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="font-['Poppins'] bg-bg-light dark:bg-bg-dark text-bg-dark dark:text-bg-light scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-900 scrollbar-track-transparent scrollbar-thumb-rounded-lg scrollbar-thin transition-colors duration-300">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
