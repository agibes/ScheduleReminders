export const getAllEvents = async () => {
    try {
        const response = await fetch(`api/events`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        const events = await response.json();
        return events;
    } catch (err) {
        console.log(err);
    }
}

export const createEvent = async (eventData) => {
    try {
        const response = await fetch (`api/events`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(eventData)
        });
        const newEvent = await response.json();
        return newEvent;
    } catch (err) {
        console.log(err);
    }
}

export const updateEvent = async (eventId, eventData) => {
    try {
        const response = await fetch (`api/events`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(eventId, eventData)
        });
        const updatedEvent = await response.json();
        return updatedEvent;
    } catch (err) {
        console.error(err);
    }
}