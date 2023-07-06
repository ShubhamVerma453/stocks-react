import { createContext, useContext, useState } from "react";
import { useEffect } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [watchList, setWatchList] = useState(
        localStorage.getItem("watchList")?.split(",") || ["MSFT", "AAPL", "NFLX"]
    );

    const addToWatchList = (stock) => {
        if(watchList.indexOf(stock) === -1){
            setWatchList([...watchList, stock]);
        }
    }

    const deleteFromWatchList = (stock) => {
        const data = watchList.filter(e => e !== stock);
        // console.log(data);
        setWatchList(data);
    }

    useEffect(() => {
        localStorage.setItem("watchList", watchList);
    }, [watchList])

    return <AppContext.Provider value={{ watchList, addToWatchList, deleteFromWatchList }} >
        {children}
    </AppContext.Provider>
}

export const UseGloblaContext = () => useContext(AppContext);