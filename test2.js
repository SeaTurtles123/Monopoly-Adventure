const fs = require('fs');
 function jsonReader(filePath, cb) {
    fs.readFile(filePath, (err, fileData) => {
      if (err) {
        return cb && cb(err);
      }
      try {
        const object = JSON.parse(fileData);
        return cb && cb(null, object);
      } catch (err) {
        return cb && cb(err);
      }
    });
}
jsonReader("./monopoly_data.json", (err, datamono) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(datamono.user); // => "Infinity Loop Drive"
});
