const File = require("@saltcorn/data/models/file");
const db = require("@saltcorn/data/db");
const fs = require("fs");

const readFile = {
    run: async (name) => {
        const f = await File.findOne({"filename": name});
        if(f != null){
            return fs.readFileSync(f.location)
        }else{
            return "";
        }
    },
    isAsync: true,
};

const writeFile = {
    run: async (name, data, user) => {
        const f = await File.findOne({"filename": name});

        var path = null;

        if(f != null){
            path = f.location;
            fs.writeFileSync(path, data);
        }else{
            // Create a new file in the file store path
            const path = db.connectObj.file_store + "/";
            fs.writeFileSync(path + name, data);

            // Have saltcorn give it a UUID and register it
            await File.from_existing_file(path, name, user);
        }
    },
    isAsync: true,
}

module.exports = {
    sc_plugin_api_version: 1,
    functions: { readFile, writeFile },
};

