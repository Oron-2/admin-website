import axios from "axios"

import apiBaseUrl from "../../utils/apiBaseUrl.js"

// The function sends a request to the "/users/authenticate" REST API route
// and attaches the cookie data stored in the browser to the request.
export default async function (req) {
    try {
        const cookie = req.headers.cookie ? req.headers.cookie : ""

        const response = await axios.get(`${apiBaseUrl}/users/authenticate`, {
            headers: req ? { cookie: cookie } : "",
            withCredentials: true
        })

        return response.data
    } catch (error) {
        return { success: false }
    }
}