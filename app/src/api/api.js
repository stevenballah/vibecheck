import axios from "axios";

//USING AXIOS TO MAKE THE API CALL
export default axios.create({
    baseURL: "http://localhost:4000/api",
})