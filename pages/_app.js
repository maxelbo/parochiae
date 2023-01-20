import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <footer>
        <p>{new Date().getFullYear()} A.D.</p>
      </footer>
    </>
  );
}

export default MyApp;
