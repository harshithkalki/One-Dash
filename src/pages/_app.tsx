import { type AppProps } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import { useRouter } from "next/router";
import Layout from "~/components/Layout";
import dynamic from "next/dynamic";
import { SessionProvider } from "next-auth/react";
import { type Session } from "next-auth";

function MyApp({
  Component,
  pageProps,
}: AppProps<{ session: Session | null }>) {
  const router = useRouter();
  if (
    router.asPath == "/login" ||
    router.asPath == "/signup" ||
    router.asPath == "/"
  ) {
    return (
      <SessionProvider session={pageProps.session}>
        <Component {...pageProps} />
      </SessionProvider>
    );
  }

  return (
    <SessionProvider session={pageProps.session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}

// export default dynamic(() => Promise.resolve(MyApp), { ssr: false })

export default api.withTRPC(MyApp);
