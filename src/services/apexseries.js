const axios = require("axios").default;
const APEXSERIES_API_BASE_URL = "https://api.apexseries.pl";

module.exports.getRaceDrivers = async (raceId) => {
    const { data } = await axios.get(`${APEXSERIES_API_BASE_URL}/races/${raceId}`);
    return data.Results;
}