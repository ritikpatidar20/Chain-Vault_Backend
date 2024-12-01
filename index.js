const express = require("express");
const app = express();
const routes = require("./routes/Routes");
const database = require("./config/database");
const cookieParser = require("cookie-parser");// for senging the cookies to the client on every server request
const cors = require("cors");// (CORS = "Cross-origin-resourse-sharing") used for the interaction of the forntend with the backend
const dotenv = require("dotenv");

dotenv.config();
const PORT = process.env.PORT;

//database connect
database.connect();
//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
	cors({
	  origin: "*",
	  credentials: true,
	  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
	  allowedHeaders: ["Content-Type", "Authorization"],
	})
  );

app.use("/api/v1/",routes);

app.get("/", (req, res) => {
	return res.json({
		success:true,
		message:'Your server is up and running....'
	});
});

app.listen(PORT, () => {
	console.log(`App is running at ${PORT}`)
})

