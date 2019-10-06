const mongoose = require("mongoose");

module.exports = () => {
    mongoose.connect("mongodb://localhost/omnistack-7", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
};
