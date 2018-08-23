let mongoose = require('mongoose');

let PrayerSchema = new mongoose.Schema({
  description : String,
  prayerstatus : Boolean
});

let Prayer = mongoose.model('Prayer', PrayerSchema);
module.exports = Prayer;