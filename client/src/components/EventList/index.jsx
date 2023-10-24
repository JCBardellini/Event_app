import React, { useState, useEffect } from "react";
import axios from "axios";
import "./index.css";
import Event from "../Event";

const EventList = ({ events, setEvents }) => {
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("/server/events");
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    fetchEvents();
  }, []);

  const handleDelete = async (eventId) => {
    // 1. go to mongodb and delete from database
    let response = await axios({
      method: "Delete",
      url: `/server/events/${eventId}`,
    });
    // 2. it's still in state, (still on screen)
    if (response.status === 200) {
      setEvents(events.filter((event) => event._id !== eventId));
    }
    // so - set state without this ID
  };

  return (
    <div className="event-list">
      <h1>My list of Events</h1>
      {events.map((event) => (
        <Event
          key={event._id}
          event={event}
          handleDelete={handleDelete}
          setEvent={setEvents}
        />
        // show a form for this event
      ))}
    </div>
  );
};

export default EventList;
