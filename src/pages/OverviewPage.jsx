import Header from "./components/Header";
import StockList from "./components/StockList";
import image from "../resource/crown.png"

const OverviewPage = () => {
    
    return (
        <div className="text-center">
            <img src={image} alt="logo" className="logo-img"/>
            <Header />
            <StockList />

        </div>
    )
}

export default OverviewPage;