import axios from "axios";

export default axios.create({
    baseURL : "https://finnhub.io/api/v1",
    params : {
        token : "ci99p3pr01qitdq2fsbgci99p3pr01qitdq2fsc0"
    }
})