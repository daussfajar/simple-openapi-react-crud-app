import axios from "axios";
import { json } from "react-router-dom";

const API_URL = "http://localhost:4000/api/v1/";

const loginUser = async (email, password) => {
    try {
        email = email.trim();
        password = password.trim();

        const response = await axios.post(`${API_URL}login`, {
            email,
            password,
        }, {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: false,
        });

        return response.data; // Return the data part of the response
    } catch (error) {
        return json({
            error: "An error occurred. Please try again later.",
            message: error.message,
        });
    }
};

export default loginUser;