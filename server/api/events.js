const express = require('express');
const eventsRouter = express.Router();
const {getAllEvents, createEvent, updateEvent, getEventById} = require('../db');

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

eventsRouter.patch('/', async (req, res, next) => {
    try {
        const {id} = req.body;
        const event = await getEventById(id);
        if (!event) {
            return res.status(404).json({error: 'EventNotFound', message: 'No event found'});
        }
        const updatedEvent = await updateEvent({id, ...req.body});
        res.send(updatedEvent);
    } catch (err) {
        next(err);   
    }
})

module.exports = eventsRouter;