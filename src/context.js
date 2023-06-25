import { createContext, useContext } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const loading = "helo";
    return <AppContext.Provider value={{ loading }} >
        {children}
    </AppContext.Provider>
}

export const UseGloblaContext = () => useContext(AppContext);