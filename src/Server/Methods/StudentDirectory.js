const mongoose = require('mongoose');

const directorySchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    studentName: String,
    imgLink: String,
    cohort: String
});

module.exports= mongoose.model('Directory', directorySchema, 'Directory')