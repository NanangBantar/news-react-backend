const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
const axios = require("axios");

dotenv.config();

router.get("/newsall", async (req, res) => {
    try {
        const resp = await axios(`https://newsapi.org/v2/everything?q=Apple&from=2021-11-23&sortBy=popularity&apiKey=${process.env.newsAPI}&pageSize=20`);
        return res.json(resp.data);
    } catch (error) {
        console.log(error);
    }
});

router.get("/newsbanner", async (req, res) => {
    try {
        const resp = await axios(`https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=${process.env.newsAPI}&pageSize=1`);
        return res.json(resp.data);
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;