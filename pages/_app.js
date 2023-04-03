import { createContext, useReducer } from "react";
import "../styles/globals.css";

export const ParishContext = createContext();

export const ACTION_TYPES = {
  SET_LAT_LONG: "SET_LAT_LONG",
  SET_PARISHES: "SET_PARISHES",
};

const parishReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_LAT_LONG:
      return { ...state, latLong: action.payload.latLong };
    case ACTION_TYPES.SET_PARISHES:
      return { ...state, localParishes: action.payload.localParishes };
    default:
      throw new Error(`Invalid action type: ${action.type}`);
  }
};

function ParishProvider({ children }) {
  const initialState = {
    parishes: [],
    latLong: "",
  };

  const [state, dispatch] = useReducer(parishReducer, initialState);

  return (
    <ParishContext.Provider value={{ state, dispatch }}>
      {children}
    </ParishContext.Provider>
  );
}

function MyApp({ Component, pageProps }) {
  return (
    <>
      <ParishProvider>
        <Component {...pageProps} />
      </ParishProvider>
      <footer>
        <p>{new Date().getFullYear()} A.D.</p>
      </footer>
    </>
  );
}

export default MyApp;
