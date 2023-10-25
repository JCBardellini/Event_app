const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet"); // adds a bunch of standard security to a server
const Event = require("./models/Event.js");
const path = require("path")

const PORT = 3000;

require('dotenv').config();
require("./config/db.js")


app.use(express.static(path.join(__dirname, "../client/dist")))


const app = express();

// START MIDDLEWARE //
app.use(express.json());

app.use(cors({
    origin: "*", 
}));

app.use(morgan("dev"));

app.use(helmet());
// END MIDDLEWARE // 

// START ROUTES //

// get events 
app.get("/events", async (req, res) => {
    let arrayOFEvents = await Event.find();
    res.send(arrayOFEvents)
})

app.post("/events", async (req, res) => {
    // 1. get data from the front end 
    // let eventData = req.body.eventData
    // let { eventData } = req.body;
    // 2. Model.create(eventData)
    try {
        let response = await Event.create(req.body)
        console.log("created a new event");
        res.status(201).send(response)
    } catch (error) {
        console.log("there is a error", error);
    }

})

app.put("/events/:idOfEvent", async (req, res) => {
    let id = req.params.idOfEvent;
    // let updatedData = req.body
    // console.log(updatedData);
    let response = await Event.findByIdAndUpdate(id, req.body, {new: true})
    console.log(response);
    res.send(response)
})



app.delete("/events/:idOfEvent", async (req, res) => {
    let id = req.params.idOfEvent
    let response = await Event.findByIdAndDelete(id)
    console.log(response);
    res.send("deleted event!")
})
// END ROUTES //


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})