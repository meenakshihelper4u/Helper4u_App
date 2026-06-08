const database = require("./database/database.routes");

module.exports.routes = (app) => {
  app.use("/api/v1/database", database);
};