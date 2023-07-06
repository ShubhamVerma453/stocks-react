import finhub from "../../apis/finhub"
import { useEffect, useState } from "react"

export const StockDetail = ({ currStock }) => {
    const [stockProfile, setStockProfile] = useState({});
    useEffect(() => {
        let isMount = true;
        const fetchData = async () => {
            try {
                const response = await finhub.get("/stock/profile2", {
                    params: {
                        symbol: currStock
                    }
                })
                // console.log(response);
                if (isMount) {
                    setStockProfile(response.data);
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchData()
        return () => isMount = false
    }, [currStock])

    return <div>
        {stockProfile && <>
            <div className="row">
                <div className="col-md-3 col-sm-6 col-xm-12">
                    <div>
                        <span className="fw-bold">Name : </span>
                        {stockProfile.name}
                    </div>
                    <div>
                        <span className="fw-bold">Country : </span>
                        {stockProfile.country}
                    </div>
                    <div>
                        <span className="fw-bold">Currency : </span>
                        {stockProfile.currency}
                    </div>
                </div>
                <div className="col-md-5 col-sm-6 col-xm-12">
                    <div>
                        <span className="fw-bold">Industry : </span>
                        {stockProfile.finnhubIndustry}
                    </div>
                    <div>
                        <span className="fw-bold">Exchange : </span>
                        {stockProfile.exchange}
                    </div>
                    <div>
                        <span className="fw-bold">IPO : </span>
                        {stockProfile.ipo}
                    </div>
                </div>
                <div className="col-md-4 col-sm-6 col-xm-12">
                    <div>
                        <span className="fw-bold">Market Cap. : </span>
                        {stockProfile.marketCapitalization}
                    </div>
                    <div>
                        <span className="fw-bold">Outstanding : </span>
                        {stockProfile.shareOutstanding}
                    </div>
                    <div>
                        <span className="fw-bold">URL : </span>
                        <a href={stockProfile.weburl} target="_blank"> url</a>
                    </div>
                </div>
            </div>
        </>}
    </div>
}