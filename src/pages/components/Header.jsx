import { useState, useEffect } from "react";
import finhub from "../../apis/finhub";
import { UseGloblaContext } from "../../context";

const Header = () => {
    const [search, setSearch] = useState("");
    const [result, setResult] = useState([]);

    const { addToWatchList } = UseGloblaContext();

    useEffect(() => {
        let isMounted = true;
        const fetchData = async () => {
            try {
                const response = await finhub.get("/search", {
                    params: {
                        q: search
                    }
                })
                // console.log(response);
                if (isMounted) {
                    setResult(response.data.result);
                }
            } catch (error) {

            }
        }
        if (search.length === 0) {
            setResult([]);
            return;
        }
        fetchData();
        return () => { isMounted = false; }
    }, [search]);

    return (
        <div className="mb-3 header-box">
            <div className="form-floating ">
                <input type="text" className="form-control search-input" id="search" value={search} onChange={(e) => { setSearch(e.target.value) }} placeholder="search" />
                <label htmlFor="search">Search</label>
                <ul className={`${result.length === 0 ? "dropdown-menu" : "dropdown-menu show"}`}>
                    {
                        result.map(item => {
                            return (
                                <li key={item.symbol} onClick={() => {
                                    addToWatchList(item.symbol)
                                    setSearch("")
                                }
                                } className="dropdown-item">{item.description} - {item.symbol}</li>
                            )
                        })
                    }
                </ul>
            </div>

        </div>
    )
}

export default Header;