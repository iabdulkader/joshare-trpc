import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useState } from "react";
import { Router } from "next/router";
import { Modal } from "modal-rt";
import { Toaster } from "react-hot-toast";
import Footer from "../components/Footer/Footer";
import Loader from "../components/Loader/Loader";
import Header from "../components/Header/Header";

import { useRouter } from "next/router";
import { trpc } from "../utlis/trpc/trpc";
import UserContextProvider from "../context/userContext/userContext";
import FilesContextProvider from "../context/filesContext/filesContext";
import SocketContextProvider from "../context/socketContext/SocketContext";
import { ThemeProvider } from "next-themes";

function App({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  Router.events.on("routeChangeStart", () => {
    setLoading(true);
  });
  Router.events.on("routeChangeComplete", () => {
    setLoading(false);
  });
  Router.events.on("routeChangeError", () => {
    console.log("Error");
  });

  return (
    <UserContextProvider>
      <FilesContextProvider>
        <SocketContextProvider>
          <ThemeProvider attribute="class">
            <Header path={router.pathname} />

            {loading ? <Loader /> : <Component {...pageProps} />}

            <Modal />
            <Toaster />
            <Footer />
          </ThemeProvider>
        </SocketContextProvider>
      </FilesContextProvider>
    </UserContextProvider>
  );
}

export default trpc.withTRPC(App);
