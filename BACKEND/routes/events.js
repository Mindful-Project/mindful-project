const router = require("express").Router();
const Events = require("../models/events");

router.route("/create").post(async (req, res) => { //route for creating database insertion
    const { image, eName } = req.body;

    const eDate = Date(req.body.eDate);

    const eTime = Date(req.body.eTime);

    const eSeatsNo = Number(req.body.eSeatsNo);

    const ePrice = Number(req.body.ePrice);

    const newEvents = new Events({
        image,
        eName,
        eDate,
        eTime,
        eSeatsNo,
        ePrice,
    }); // create a new object using database schema

    const isAvailable = await Events.findOne({ //check the availability of saving data
        event: { $regex : new RegExp(event, "i")},
        eName: eName,

    });
    
    if(isAvailable) {
        return res
        .status(401)
        .json({ error: "Already Added! Plz add new event 😊"});
    }

    await newEvents
    .save()
    .then(() => res.status(200).json({ success: true }))
    .catch((error) => res.status(500).json({ success: false,  error: error })); // else save to the db
});

router.route("/").get(async (req, res) => { //route for fetching all the data
    await Events.find()
    .then((events) => res.json(events))
    .catch((error) => res.status(500).json({ success: false, error: error}));
});

router.route("/get/:id").get(async (req, res) => { //route for getting a relavant document using id
    const { id } = req.params;

    await Events.findById(id) //find by the document by id
    .then((events) => res.json(events))
    .catch((error) => res.status(500).json({ success: false, error: error })); 
});

module.exports = router;