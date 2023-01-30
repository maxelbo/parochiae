import { createContext } from "react";
import "../styles/globals.css";

const parishContext = createContext();
function parishProvider({ children }) {
  const initialState = {
    parishes: [],
    latLong: "",
  };
  return (
    <parishContext.Provider value={{ state: initialState }}>
      {children}
    </parishContext.Provider>
  );
}

function MyApp({ Component, pageProps }) {
  return (
    <>
      <parishProvider>
        <Component {...pageProps} />
      </parishProvider>
      <footer>
        <p>{new Date().getFullYear()} A.D.</p>
      </footer>
    </>
  );
}

export default MyApp;
