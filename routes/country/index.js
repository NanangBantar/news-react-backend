const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/country", async (req, res) => {
    const newData = [];
    try {
        const resp = await axios("https://dev.farizdotid.com/api/daerahindonesia/provinsi");
        const data = resp.data.provinsi;

        data.forEach(element => {
            newData.push({
                value: element.id,
                label: element.nama
            });
        });

        return res.json(newData);
    } catch (error) {
        console.log(error);
    }
});

router.get("/city/:id_provinsi", async (req, res) => {
    const newData = [];
    try {
        const { id_provinsi } = req.params;
        const resp = await axios(`https://dev.farizdotid.com/api/daerahindonesia/kota?id_provinsi=${id_provinsi}`);
        const data = resp.data.kota_kabupaten;

        data.forEach(element => {
            newData.push({
                value: element.id,
                label: element.nama
            });
        });

        return res.json(newData);
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;