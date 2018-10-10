let mongoose = require('mongoose');

let PrayerSchema = new mongoose.Schema({
  description: String,
  userId: String,
  prayerAnswered: Boolean,
  prayerHelper: [{
    _id:false,
    sId:String,
  }]
});

let Prayer = mongoose.model('Prayer', PrayerSchema);

module.exports = Prayer;
