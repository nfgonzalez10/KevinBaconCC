const fs = require("fs");

module.exports.store = (nameFile,data) => {
  const dataToStore = JSON.stringify(data, null, 2);
  fs.writeFile(nameFile, dataToStore, (error) => {
    if (error) throw error;
    console.log("Kevin Bacon data stored");
  });
};

module.exports.readFile = (nameFile) => {
  return new Promise((resolve, reject) => {
    fs.readFile(nameFile, "utf8", (error, data) => {
      if (error) {
        reject(error);
      }
      resolve(data);
    });
  });
};
