const express = require('express');
const eventsRouter = express.Router();
const {getAllEvents, createEvent} = require('../db');

eventsRouter.get('/', async (req, res, next) => {
    try {
        const events = await getAllEvents();
        res.send(events);
    } catch (err) {
        console.error(err);
    }
})

eventsRouter.post('/', async (req, res, next) => {
    const {name, date, time, location} = req.body;
    try {
        const newEvent = await createEvent({name, date, time, location});
        res.send({newEvent});
    } catch (err) {
        next(err);
    }
})

module.exports = eventsRouter;