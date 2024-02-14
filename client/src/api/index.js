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
        console.log(newEvent);
        return newEvent;
    } catch (err) {
        console.log(err);
    }
}