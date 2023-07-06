import { useState } from "react";
import Chart from "react-apexcharts";

export const StockChart = (props) => {
    const { chartData, currStock } = props;
    // console.log(chartData)
    const { oneMonth, sixMonth, oneYear } = chartData;
    // console.log(oneMonth);
    const [showFormate, setShowFormate] = useState("1M");

    const determinShow = () => {
        switch (showFormate) {
            case "1M":
                return oneMonth
            case "6M":
                return sixMonth
            case "1Y":
                return oneYear
            default:
                return oneMonth
        }
    }

    const chartColor = () => {
        // console.log(oneMonth)
        const data = determinShow();
        return (data[(data.length - 1)].y) - (data[0].y) > 0 ? ["#38E54D"] : ["#F44336"]
    }
    const option = {
        colors: chartColor(),
        title: {
            text: currStock,
            align: "center",
        },
        chart: {
            toolbar: {
                show: false
            },
            enabled: true,
            type: "area",
            id: "stock chart",
            animations: {
                speed: 400
            }
        },
        xaxis: {
            type: "datetime"
        }
    }
    const series = [{
        name: currStock,
        data: determinShow()
    }]

    const buttonFormate = (button) => {
        if (button === showFormate)
            return "btn btn-sm m-2 btn-primary"
        return "btn btn-sm m-2 btn-outline-primary"
    }

    return <div className="chart-box shadow-sm mx-10 my-5">
        <Chart options={option} series={series} type="area" width="100%" />
        <div>
            <button type="button" className={buttonFormate("1M")} onClick={() => setShowFormate("1M")}>1M</button>
            <button type="button" className={buttonFormate("6M")} onClick={() => setShowFormate("6M")}>6M</button>
            <button type="button" className={buttonFormate("1Y")} onClick={() => setShowFormate("1Y")}>1Y</button>
        </div>
    </div>
}