const client = require("./client");

const getAllEvents = async () => {
    try {
        const {rows: events } = await client.query(`
        SELECT * FROM events
        `);
        return events;
    } catch (err) {
        console.error(err);
    }
}

const createEvent = async ({name, date, time, location}) => {
    try {
        const {rows: [event]} = await client.query(`
            INSERT INTO events(name, date, time, location)
            VALUES ($1, $2, $3, $4)
            RETURNING *;
        `, [name, date, time, location]);
        return event;
    } catch (err) {
        console.error(err);
    }
}

module.exports = {
    createEvent,
    getAllEvents
}