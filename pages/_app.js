import "../styles/globals.css";
// import { LibreBaskerville } from "@next/font/google";
import styles from "../styles/Home.module.css";

// const libreBaskerville = LibreBaskerville({
//   weight: ["400", "700"],
//   style: ["normal", "italic"],
//   subsets: ["latin"],
// });

function MyApp({ Component, pageProps }) {
  return (
    <>
      {/* <style jsx global>{`
        html {
          font-family: ${libreBaskerville.style.fontFamily};
        }
      `}</style> */}
      <Component {...pageProps} />
      <footer className={styles.footer}>
        <p>{new Date().getFullYear()} A.D.</p>
      </footer>
    </>
  );
}

export default MyApp;
