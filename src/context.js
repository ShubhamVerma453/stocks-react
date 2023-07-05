import { createContext, useContext, useState } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [watchList, setWatchList] = useState(["MSFT", "AAPL", "NFLX"]);

    const addToWatchList = (stock) => {
        if(watchList.indexOf(stock) === -1){
            setWatchList([...watchList, stock]);
        }
    }

    const deleteFromWatchList = (stock) => {
        const data = watchList.filter(e => e != stock);
        // console.log(data);
        setWatchList(data);
    }

    return <AppContext.Provider value={{ watchList, addToWatchList, deleteFromWatchList }} >
        {children}
    </AppContext.Provider>
}

export const UseGloblaContext = () => useContext(AppContext);