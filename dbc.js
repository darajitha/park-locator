mongodb.MongoClient.connect(process.env.MONGODB_URI, function (err, database) {
mongodb.MongoClient.connect("abc", function (err, database) {
  if (err) {
    console.log(err, "database error");
    process.exit(1);