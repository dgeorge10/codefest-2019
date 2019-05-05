const express = require("express");
const db = require("./config/database");
const path = require("path");
const fs = require("fs")
const bodyParser = require("body-parser");
var session = require("express-session");


const food = require("./models/Food");
const shelter = require("./models/Shelter");
const cal = require("./public/cal/cal");

db.authenticate()
	.then(() => console.log("Database connected"))
	.catch(err => process.exit())

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
app.get("/logout", (req, res) => {
	req.session.destroy();
	res.status(200);
	res.redirect("/");
});
app.get("/dashboard", (req,res) => {
	res.sendFile(path.join(__dirname, "public/dashboard.html"))
})


app.get("/", (req,res)=>{
	res.write(fs.readFileSync(__dirname + "/public/index.html"));
	res.end();
});
app.get("/index", (req,res)=>{
	res.write(fs.readFileSync(__dirname + "/public/index.html"));
	res.end();
});
app.get("/food", (req,res)=>{
	if(req.session.loggedin){
		res.write(fs.readFileSync(__dirname + "/public/input_food.html"));
		res.end();
	} else {
		res.redirect("/404.html")
	}
});
app.get("/shelter", (req,res)=>{
	if(req.session.loggedin){
		res.write(fs.readFileSync(__dirname + "/public/input_shelter.html"));
		res.end();
	} else {
		res.redirect("/404.html")
	}
});
app.get("/calendar", (req,res)=>{
	res.write(fs.readFileSync(__dirname + "/public/cal/index.html"));
	res.end();

});

app.get("/allEvents", (req,res)=>{
	let { start, end } = req.query;
	
	let response = [];
	food.findAll({raw: true})
	.then(foods => {
		response.push(foods)
		shelter.findAll({raw:true})
		.then(shelters => {
			response.push(shelters) 
			let result = cal.parseJSON(JSON.stringify(response));
			res.write(JSON.stringify(result));
			res.end();
		})
	})
	.catch(err => console.log(err))
	
});

//routes
app.use("/api/shelters", require("./routes/shelters"));
app.use("/api/food", require("./routes/food"));
app.use("/api/guests", require("./routes/guests"));
app.use("/api/users", require("./routes/users"))

//start on port 5000 or on whichever port the server allows
const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
