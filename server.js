const express = require('express')
// const path = require('path')
const connectDB = require('./config/mongoDB')
const app = express()
connectDB()



app.use(express.json({ extended: false }));


//Routing
// app.get("/", (req, res) => res.send(" Api Running"));

app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/profiles", require("./routes/api/profiles"));
app.use("/api/posts", require("./routes/api/posts"));

// </Routing


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is on ${PORT}`));
