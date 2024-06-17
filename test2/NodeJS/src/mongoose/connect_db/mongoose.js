const mongoose = require("mongoose");

// db connection
mongoose.connect(`mongodb+srv://aaromalchekavr:${encodeURIComponent('mr@23221')}@cluster0.wehcazh.mongodb.net/`, {
  useCreateIndex: true,
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(()=>{console.log("Connected")});
