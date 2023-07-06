import finhub from "../../apis/finhub";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UseGloblaContext } from "../../context";

const StockList = () => {
    const { watchList, deleteFromWatchList } = UseGloblaContext();
    const [watchListDetail, setWatchListDetail] = useState([]);

    const navigator = useNavigate();

    function handelRowClick(symbol) {
        navigator(`/detail/${symbol}`);
    }

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
    }, [watchList])
    return (
        <div className="table-responsive">
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
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {watchListDetail.map(stock => {
                        return (
                            <tr key={stock.symbol} className="table-row" onClick={() => handelRowClick(stock.symbol)}>
                                <th scope="row">{stock.symbol}</th>
                                <td>{stock.data.c}</td>
                                <td>{stock.data.pc}</td>
                                <td className={`text-${stock.data.d > 0 ? "success" : "danger"}`}>{stock.data.d}</td>
                                <td className={`text-${stock.data.d > 0 ? "success" : "danger"}`}>{stock.data.dp}</td>
                                <td>{stock.data.h}</td>
                                <td>{stock.data.l}</td>
                                <td >
                                    <button type="button" className='btn btn-danger remove-btn' onClick={(e) => {
                                        e.stopPropagation();
                                        deleteFromWatchList(stock.symbol)
                                    }}>Remove</button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>

        </div>
    )
}

export default StockList;