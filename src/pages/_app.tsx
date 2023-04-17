import { type AppProps } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import { useRouter } from "next/router";
import Layout from "~/components/Layout";
import dynamic from "next/dynamic";
import { SessionProvider, useSession } from "next-auth/react";
import { type Session } from "next-auth";
import SocketContextComponent from "~/context/Socketio/SocketContextConponent";
import { useEffect } from "react";

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
      <Wrap>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Wrap>
    </SessionProvider>
  );
}

// export default dynamic(() => Promise.resolve(MyApp), { ssr: false })

export default api.withTRPC(MyApp);

function Wrap({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { status } = useSession();
  useEffect(() => {
    if (status === "unauthenticated") {
      void router.push("/login");
    }
  }, [status]);

  if (status === "loading")
    return (
      <>
        <div>
          <h1>loading</h1>
        </div>
      </>
    );
  if (status === "authenticated") {
    return <SocketContextComponent>{children}</SocketContextComponent>;
  }
  return null;
}
