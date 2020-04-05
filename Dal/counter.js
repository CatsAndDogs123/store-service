const mongoose = require('mongoose');

const Schema = mongoose.Schema;
// sequence_value
//_id: Games
const counterSchema = new Schema(
  {
    _id: {
      type: String,
      required: false,
      default: 'Games'
    },
    sequence_value: {
      type: Number,
      required: true,
      default: 1
    }
  },
  { versionKey: false }
);

module.exports = mongoose.model('Counter', counterSchema);
