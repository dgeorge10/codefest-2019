const express = require("express");
const db = require("./config/database");
const path = require("path");
const bodyParser = require("body-parser");
var session = require("express-session");

db.authenticate()
	.then(() => console.log("Database connected"))
	.catch(err => console.log(err))

const app = express()

app.use(
	session({
	  secret: "keyboard cat",
	  resave: true,
	  saveUninitialized: true
	})
);

//bodyParser setup
app.use(bodyParser.urlencoded({ extended: false }));

//set static folder
app.use(express.static(path.join(__dirname, "public")));

app.get("/login", (req,res)=>{
	res.sendFile(path.join(__dirname, "public/login.html"))
})

app.get("/dashboard", (req,res) => {
	res.sendFile(path.join(__dirname, "public/dashboard.html"))
})
//routes
app.use("/api/shelters", require("./routes/shelters"));
app.use("/api/guests", require("./routes/guests"));
app.use("/api/users", require("./routes/users"))

//start on port 5000 or on whichever port the server allows
const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
