import ParishProvider from "../context/parish-provider";

import Footer from "../components/Footer";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <ParishProvider>
      <Component {...pageProps} />
      <Footer />
    </ParishProvider>
  );
}

export default MyApp;
