const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRouter = require("./routes/userRouter");
const errorHandler = require("./middleware/errorHandlerMiddleware");
const categoryRouter = require("./routes/categoryRouter");
const transactionRouter = require("./routes/transactionRouter");
const app = express();

//connect db
//sandeepachamith53
//NAgDBose2g1T6gcg

mongoose
  .connect(
    "mongodb+srv://sandeepachamith53:NAgDBose2g1T6gcg@cluster2.ogvuf.mongodb.net/?retryWrites=true&w=majority&appName=cluster2"
  )
  .then(() => console.log("connected to db"))
  .catch((err) => console.log(err));

//! cors config
const corsOption = {
  origin: ["http://localhost:5173"],
};
app.use(cors(corsOption));

// middleware
app.use(express.json()); //? pass the incoming data

//routes
app.use("/", userRouter);
app.use("/", categoryRouter);
app.use("/", transactionRouter);
// Error
app.use(errorHandler);

//start the server
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
