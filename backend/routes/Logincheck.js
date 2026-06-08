const Login = require("./LoginCheck/LoginCheck.routes");

module.exports.routes = (app) => {
  app.use("/api/v1/Login", Login);
};