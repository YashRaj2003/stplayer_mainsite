import "../styles/globals.css";
import Router from "next/router";
import { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Layout from "../layouts/layout";
import Layout2 from "../layouts/layout2";
const layouts = {
  L1: Layout,
  L2: Layout2,
  L3: "div",
};

function MyApp({ Component, pageProps }) {
  const Layout = layouts[Component.layout] || ((children) => <>{children}</>);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const start = () => {
      console.log("start");
      setLoading(true);
    };
    const end = () => {
      console.log("findished");
      setLoading(false);
    };
    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);
    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };
  }, []);

  if (loading)
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <AiOutlineLoading3Quarters className="animate-spin text-white" />
      </div>
    );
  else
    return (
      <Layout>
        <Component {...pageProps} />
      </Layout>
    );
}

export default MyApp;
