if (process.env.NODE_ENV === "development") {
  module.exports = require("./config/webpack.config.dev");
} else {
  module.exports = require("./config/webpack.config.prod");
}
