require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();

// rest of the packages
const rateLimiter = require("express-rate-limit");
const helmet = require("helmet");
const xss = require("xss-clean");
const cors = require("cors");
const mongoSanitize = require("express-mongo-sanitize");

// connectDB
const connectDB = require("./db/connectDB");
const authenticateUser = require("./middleware/authentication");

// routers
const userRouter = require("./routes/UserRoutes");
const productRouter = require("./routes/ProductRoutes");

// error handler middlewares
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

app.set("trust proxy");
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 60,
  })
);
app.use(helmet());
app.use(cors());
app.use(xss());
app.use(mongoSanitize());

app.use(express.json());

app.use(express.static("./public"));

app.use("/api/v1/user", userRouter);
app.use("/api/v1/products", authenticateUser, productRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = 3000 || process.env.PORT;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server is listening on ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
