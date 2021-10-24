import axios from "axios";

export default axios.create({
  baseURL: "https://api.yelp.com/v3/businesses",
  headers: {
    Authorization:
      "Bearer NALY4HWh0-RH7MUzi1s_MDbxY1fNGzNGVSyLkUjt9perXdiL3UqEwr9mAAJmdfb99BV32sdQRuLzDjKJmZqjm7bruD_YWnjnMqM-wy9lKOdk7ViLCd1cmgd9A79xYXYx",
  },
});
