import finhub from "../../apis/finhub";
import { useState, useEffect } from "react";

const StockList = () => {
    const [watchList, setWatchList] = useState(["MSFT", "AAPL", "NFLX"]);
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
                console.log(responses);
                const responseData = responses.map(res => {
                    return {
                        data: res.data,
                        symbol: res.config.params.symbol
                    }
                })
                // console.log(responseData);
                if (isMounted) {
                    // console.log("setting data")
                    setWatchListDetail(responseData);
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchData();
        // console.log(watchListDetail);
        return () => { 
            // console.log("disMountine");
            isMounted = false;
        }
    }, [])
    return (
        <div>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">Stock</th>
                        <th scope="col">Price</th>
                        <th scope="col">Pclose</th>
                        <th scope="col">Chg</th>
                        <th scope="col">Chg%</th>
                        <th scope="col">High</th>
                        <th scope="col">Low</th>
                    </tr>
                </thead>
                <tbody>
                    {watchListDetail.map(stock => {
                        return (
                            <tr key={stock.symbol}>
                                <th scope="row">{stock.symbol}</th>
                                <td>{stock.data.c}</td>
                                <td>{stock.data.pc}</td>
                                <td className={`text-${stock.data.d>0?"success":"danger"}`}>{stock.data.d}</td>
                                <td className={`text-${stock.data.d>0?"success":"danger"}`}>{stock.data.dp}</td>
                                <td>{stock.data.h}</td>
                                <td>{stock.data.l}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>

        </div>
    )
}

export default StockList;