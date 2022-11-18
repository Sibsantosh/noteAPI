const express = require("express");
const userRouter = require("./routes/userRoutes");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const noteRouter = require("./routes/noteRoutes");
const cors = require("cors");
app.use(express.json());
app.use("/",userRouter);
app.use("/",noteRouter);
app.get("/", (req, res) =>{
    res.send("Notes API From BlezDev");
});

dotenv.config();
app.use(cors());
const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    app.listen(PORT,()=>{
        console.log("server started port " + PORT);
    });
})
.catch((error)=>{
    console.log(error);
});







