import ParishProvider from "../context/parish-provider";
import Footer from "../components/Footer";
import "../styles/globals.css";

export default function MyApp({ Component, pageProps }) {
  return (
    <ParishProvider>
      <Component {...pageProps} />
      <Footer />
    </ParishProvider>
  );
}
