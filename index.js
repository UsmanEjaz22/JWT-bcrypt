const express = require("express")

const app = express();
const port = process.env.PORT || 5000;

const userRoutes = require("./user.routes.js");     // import statement

app.use(express.json());

app.use("/api/user", userRoutes)

app.get("/", (req, res) => {
    res.send("Hello")
})
app.listen(port, () => {
    console.log(`Server Listenning on \nhttp://localhost:${port}`)
})