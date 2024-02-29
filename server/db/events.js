const client = require("./client");

const getAllEvents = async () => {
    try {
        const {rows: events} = await client.query(`
        SELECT 
            id,
            name,
            notes,
            utcdatetime
        FROM events
        `);
        return events;
    } catch (err) {
        console.error(err);
    }
}

const getEventById = async (id) => {
    try {
        const {rows: [event]} = await client.query(`
        SELECT * FROM events
        WHERE id = $1;
        `, [id]);
        return event;
    } catch (err) {
        console.error(err);
    }
}

const createEvent = async ({name, notes, utcdatetime}) => {
    try {
        const {rows: [event]} = await client.query(`
            INSERT INTO events(name, notes, utcdatetime)
            VALUES ($1, $2, $3)
            RETURNING *;
        `, [name, notes, utcdatetime]);
        return event;
    } catch (err) {
        console.error(err);
    }
}

const updateEvent = async ({id, ...fields}) => {
    const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ");
    try {
        const {rows: [updatedEvent]} = await client.query(`
            UPDATE events
            SET ${setString}
            WHERE id=$${Object.keys(fields).length + 1}
            RETURNING *;
        `, [...Object.values(fields), id]);
        return updatedEvent;
    } catch (err) {
        console.error(err);
    }
}

module.exports = {
    createEvent,
    getAllEvents, 
    getEventById,
    updateEvent
}