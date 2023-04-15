import { createContext, useReducer } from "react";

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
      // console.log("action.payload.localParishes", action.payload.localParishes);
      return { ...state, localParishes: action.payload.localParishes };
    default:
      throw new Error(`Invalid action type: ${action.type}`);
  }
};

export default function ParishProvider({ children }) {
  const initialState = {
    localParishes: [],
    latLong: "",
  };

  const [state, dispatch] = useReducer(parishReducer, initialState);

  return (
    <ParishContext.Provider value={{ state, dispatch }}>
      {children}
    </ParishContext.Provider>
  );
}
