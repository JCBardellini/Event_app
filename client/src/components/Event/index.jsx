import axios from "axios";
import React, { useState } from "react";

const Event = ({ event, handleDelete, setEvent }) => {
  const [show, setShow] = useState(false);
  const [newDescription, setNewDescription] = useState(event.description);

  const handleClick = (eventId) => {
    // axios call to our put route
    axios({
      url: `/server/events/${eventId}`,
      method: "PUT",
      data: {
        description: newDescription,
      },
    }).then((res) => {
      // find the event to change
      // replace it with reponse.body
      // response.body is to update the event
      //  []
      console.log(res);
      setEvent((events) => {
        let stateCopy = events.map((eventObj) => {
          if (eventObj._id === res.data._id) {
            return res.data;
          } else {
            return eventObj;
          }
        });
        return stateCopy;
      });
    });
  };
  return (
    <div>
      <div key={event._id} className="event-item">
        <button onClick={() => handleDelete(event._id)}>delete</button>
        <button onClick={() => setShow(!show)}>Edit</button>
        <h2>{event.title}</h2>
        <p>Date: {event.date}</p>
        <p>Location: {event.location}</p>
        <p>Description: {event.description}</p>
        <div className="organizer">
          <strong>Organizer:</strong>
          <p>Name: {event.organizer.name}</p>
          <p>Role: {event.organizer.role}</p>
        </div>
        {/* show form */}
        {show ? (
          <form onSubmit={(e) => e.preventDefault()}>
            <input
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
            />
            <button onClick={() => handleClick(event._id)}>
              Update this event
            </button>
          </form>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Event;
