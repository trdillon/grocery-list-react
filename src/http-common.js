import axios from "axios";

export default axios.create({
    baseURL: "https://grocery.itsdits.com/grocery-list/api",
    headers: {
        "Content-type": "application/json"
    }
});