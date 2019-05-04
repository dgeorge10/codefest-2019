const express = require("express");
const db = require("./config/database");
const path = require("path");
const bodyParser = require("body-parser");

db.authenticate()
	.then(() => console.log("Database connected"))
	.catch(err => console.log(err))

const app = express()

//bodyParser setup
app.use(bodyParser.urlencoded({ extended: false }));

//set static folder
app.use(express.static(path.join(__dirname, "public")));

//routes
app.use("/api/shelters", require("./routes/shelters"));
app.use("/api/food", require("./routes/food"));
app.use("/api/guests", require("./routes/guests"));

//start on port 5000 or on whichever port the server allows
const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
