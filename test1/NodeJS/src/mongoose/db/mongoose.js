const mongoose = require("mongoose");

//connection to database
mongoose.connect(`mongodb+srv://aaromalchekavr:${encodeURIComponent('mr@23221')}@cluster0.wehcazh.mongodb.net/`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: true,
});
