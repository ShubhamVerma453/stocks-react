import Header from "./components/Header";
import StockList from "./components/StockList";
import finhub from "../apis/finhub";
import { useState, useEffect } from "react";

const OverviewPage = () => {
    const [watchList, setWatchList] = useState(["MSFT", "AAPL", "META"]);
    const [watchListDetail, setWatchListDetail] = useState([]);
    useEffect(() => {
        let isMounted = true;
        const fetchData = async () => {
            try {
                let responses = await Promise.all(watchList.map(stock => {
                    return finhub.get("/quote", {
                        params: {
                            symbol: stock
                        }
                    })
                }))
                // console.log(responses);
                const responseData = responses.map(res => {
                    return { 
                        data : res.data,
                        symbol : res.config.params.symbol
                    }
                })
                console.log(responseData);
                if (isMounted) {
                    setWatchListDetail(responseData);
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchData();
        return () => { isMounted = false; }
        // console.log(watchListDetail);
    }, [])
    return (
        <div>
            <h1 className="mt-5"> OverviewPage</h1>
            <Header />
            <StockList />

        </div>
    )
}

export default OverviewPage;