import finhub from "../apis/finhub";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

const DetailPage = () => {
    const { symbol: currStock } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            let date = new Date();
            let currTime = Math.floor(date.getTime() / 1000);
            let sixMonthOld = currTime - (60 * 60 * 24 * 182)
            const response = await finhub.get("/stock/candle", {
                params: {
                    symbol: currStock,
                    from: sixMonthOld,
                    to: currTime,
                    resolution: "W"
                }
            })
            console.log(response);
        }
        fetchData();
    }, [])
    return (
        <div> <h1> DetailPage {currStock}</h1>

        </div>
    )
}

export default DetailPage;