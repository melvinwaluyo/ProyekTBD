const express = require("express");
const bodyParser = require("body-parser");
const bookRoutes = require("./src/book/routes");

const app = express();
const port = 1234;

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.use("/api/v1/", bookRoutes);

app.listen(port, () => console.log(`app listening on port ${port}`));
