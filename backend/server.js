require("dotenv").config();

const express = require("express");
const cors = require("cors");

const databaseRoutes = require("./routes/database");
const loginRoutes = require("./routes/Logincheck");
const { notFound, errorHandler } = require("./middleware");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Helper4U backend is running",
  });
});

databaseRoutes.routes(app);
loginRoutes.routes(app);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
