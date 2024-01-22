import axios from "axios";

const getData = async () => {
    try {
        const username = import.meta.env.VITE_API_KEY;
        const encodedCredentials = btoa(username);

        const res = await axios.post(
            "https://opendata.tamk.fi/r1/reservation/search/",
            {
                JstudentGroup: ["21I224"],
                startDate: "2024-01-01T00:00",
                endDate: "2024-06-01T00:00"
            },
            {
                headers: {
                    Authorization: `Basic ${encodedCredentials}`
                },
                withCredentials: true
            }
        );
        return res.data;
    } catch (error) {
        console.log("An error occured:", error);
    }
};

export default getData;
