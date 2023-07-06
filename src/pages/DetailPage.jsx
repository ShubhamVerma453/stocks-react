import finhub from "../apis/finhub";
import { StockChart } from "./components/StockChart"
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { StockDetail } from "./components/StockDetail";

const customFormate = (data) => {
    return data.t.map((e, index) => {
        return {
            x: e * 1000,
            y: parseFloat(data.c[index]).toFixed(2)
        }
    })
}

const DetailPage = () => {
    const { symbol: currStock } = useParams();
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            let date = new Date();
            let currTime = Math.floor(date.getTime() / 1000);
            let oneMonthOld = currTime - (60 * 60 * 24 * 30);
            let sixMonthOld = currTime - (60 * 60 * 24 * 182);
            let oneYearOld = currTime - (60 * 60 * 24 * 365);
            try {
                const responses = await Promise.all([finhub.get("/stock/candle", {
                    params: {
                        symbol: currStock,
                        from: oneMonthOld,
                        to: currTime,
                        resolution: "D"
                    }
                }),
                finhub.get("/stock/candle", {
                    params: {
                        symbol: currStock,
                        from: sixMonthOld,
                        to: currTime,
                        resolution: "W"
                    }
                }),
                finhub.get("/stock/candle", {
                    params: {
                        symbol: currStock,
                        from: oneYearOld,
                        to: currTime,
                        resolution: "W"
                    }
                })])

                // console.log(responses);
                setChartData({
                    oneMonth: customFormate(responses[0].data),
                    sixMonth: customFormate(responses[1].data),
                    oneYear: customFormate(responses[2].data)
                })

            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [currStock])

    return (
        <div> <h1>{currStock} Detail</h1>

            {chartData.oneMonth !== undefined && (
                <>
                    <StockChart chartData={chartData} currStock={currStock} />
                    <StockDetail currStock={currStock} />
                </>)
            }

        </div>
    )
}

export default DetailPage;