const file = require("@saltcorn/data/models/file");
const fs = require("fs");

module.exports = {
  sc_plugin_api_version: 1,
  functions: { filetest: (m) => console.log(m) },
};

