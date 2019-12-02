var mongoose = require('mongoose');

//Can access variables in .env via process.env.variableName
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useCreateIndex: true
});

// database connection event
mongoose.connection.on('connected', function () {
  console.log(`Mongoose connected to: ${process.env.DATABASE_URL}`);
});

module.exports = mongoose;