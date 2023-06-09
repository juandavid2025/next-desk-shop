import "@/styles/globals.css";
import Layout from "../components/layout/layout";
import ThemeAppProvider from "@/helper/ui/theme";
import { SessionProvider } from "next-auth/react";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <ThemeAppProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeAppProvider>
    </SessionProvider>
  );
}
