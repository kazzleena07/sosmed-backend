const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");


global.__basedir = __dirname;

const app = express();

app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
app.use(express.static("resources/static/assets/uploads"));
app.use(
    cookieSession({
        name: "ruth-session",
        keys: ["COOKIE_SECRET"], // should use as secret environment variable
        httpOnly: true,
    })
);

const db = require("./src/models");

db.sequelize.sync();

// db.sequelize.sync({ force: true }).then(() => {
//     console.log('Drop and Resync Db');
//     initial();
// });

// const Role = db.role;

// function initial() {
//     Role.create({
//         id: 1,
//         name: "user"
//     });

//     Role.create({
//         id: 2,
//         name: "moderator"
//     });

//     Role.create({
//         id: 3,
//         name: "admin"
//     });
// }

// routes
require('./src/routes/auth.route')(app);
require('./src/routes/user.route')(app);
require('./src/routes/content.route')(app);

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to ruth application." });
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});