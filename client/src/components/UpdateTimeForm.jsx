import {useState} from "react";
import {updateEvent} from '../api';

const updateTimeForm = ({setShowUpdateTime, changeDate, setChangeDate, draggingItem}) => {
    const [time, setTime] = useState((new Date(draggingItem.utcdatetime).toTimeString()).slice(0,5));

    const sendConfirmation = () => {
        var message = document.getElementById('confirmation');
        //if success, send success message else send error message
        message.textContent = "Event added successfully!";
      }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const utcdatetime = new Date(`${new Date(draggingItem.utcdatetime).toLocaleDateString()} ${time}`);
            await updateEvent({id: draggingItem.id, utcdatetime});
            setChangeDate(!changeDate);
            sendConfirmation();
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
          <button id="close" onClick={() => setShowUpdateTime(false)}>X</button>     
          <label htmlFor="itemTimeInput">Update {draggingItem.name}: </label>
          <input type="time" id="eventTimeInput" className="createEventInput" value={time} onChange={(e) => setTime(e.target.value)}/> 
          <br/>
          <input type="submit" value="Submit"/> <br/>
          <p id="confirmation"></p>
        </form>
    );
};

export default updateTimeForm;