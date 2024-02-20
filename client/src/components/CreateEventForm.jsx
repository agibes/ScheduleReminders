import {useState} from "react";
import {createEvent} from '../api';

const createEventForm = ({setShowCreateEventForm}) => {

    const [name, setName] = useState("");
    const [date, setDate] = useState();
    const [time, setTime] = useState();
    const [notes, setNotes] = useState("");

    const sendConfirmation = () => {
        var message = document.getElementById('confirmation');
        //if success, send success message else send error message
        message.textContent = "Event added successfully!";
      }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const eventData = {name, notes, date, time};
            await createEvent(eventData);
            sendConfirmation();
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div id="addItemForm">
        <form id="createEventForm" onSubmit={handleSubmit}>
          <button id="close" onClick={() => setShowCreateEventForm(false)}>X</button>
          <label className="createEventLabel">Event name: </label>
          <input type="text" id="eventName" className="createEventInput" value={name} onChange={(e) => setName(e.target.value)}/> 
          <br/>        
          <label htmlFor="itemNotesInput">Notes: </label>
          <input type="text" id="eventNotesInput" className="createEventInput" value={notes} onChange={(e) => setNotes(e.target.value)}/> 
          <br/>
          <label htmlFor="itemDateInput">Date: </label>
          <input type="date" id="eventDate" className="createEventInput" value={date} onChange={(e) => setDate(e.target.value)}/> 
          <br/>          
          <label htmlFor="itemTimeInput">Time: </label>
          <input type="time" id="eventTimeInput" className="createEventInput" value={time} onChange={(e) => setTime(e.target.value)}/> 
          <br/>
          <input type="submit" value="Submit"/> <br/>
          <p id="confirmation"></p>
        </form>
      </div>
    );
};

export default createEventForm;