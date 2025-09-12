const express = require("express");
const path = require("path");
const hbs= require("hbs")

const router = require("./routes/router");
const adminRouter=require("./routes/adminRouter")
const helpers = require("./views/helpers");

const { authInit } = require("./middleware/auth.middleware");

hbs.registerHelper("if_eq",helpers.comparison)
hbs.registerHelper("if_notEq",helpers.incomparison)
hbs.registerHelper("replaceWithAsterisks",helpers.replaceWithAsterisks)
hbs.registerHelper("multiplication",helpers.multiplication)
hbs.registerPartials(path.join(__dirname, "/views/partials"));


const app = express();

app.use(authInit());
app.set("view engine", "hbs");
app.use( router);
app.use("/admin", adminRouter);


app.listen(3000, () => console.log("http://localhost:3000/"));
