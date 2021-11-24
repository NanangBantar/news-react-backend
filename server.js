const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectMongo = require("./connection/connectMongo");

const app = express();
dotenv.config();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({
    extended: false
}));

connectMongo();

// routes management 
app.use("/user", require("./routes/user"));
app.use("/getcountry", require("./routes/country"));
app.use("/news", require("./routes/news"));

app.listen(PORT, () => {
    console.log(`Server is running at PORT ${PORT}`);
});


