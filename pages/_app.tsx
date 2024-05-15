import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Basic ToDo App</title>
      </Head>
      <Theme>
        <Component {...pageProps} />
      </Theme>
    </>
  );
}
