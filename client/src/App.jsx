import { useState } from "react";
import "./App.css";
import EventForm from "./components/EventForm";
import EventList from "./components/EventList";
import { Routes } from "react-router-dom";
import Employee from "./Pages/Employees";

function App() {
  const [events, setEvents] = useState([]);

  return (
    <>
      <EventForm setEvents={setEvents} />
      <EventList events={events} setEvents={setEvents} />

      <Routes>
        <Route path="/employee" element={<Employee />} />
      </Routes>
    </>
  );
}

export default App;
