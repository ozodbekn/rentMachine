const express = require("express");
const config = require("config");
const sequelize = require("./config/db");
const PORT = config.get("port");
const indexRouter = require("./routes/index.routes");
const cookieParser = require("cookie-parser");

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api", indexRouter);

async function start() {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
    app.listen(PORT, () => {
      console.log(`Server started at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

start();
