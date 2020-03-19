import React, { useState } from "react";
import "./App.css";
import Form from "./components/Form/Form.js";
import Users from "./components/Users/Users.js";
function App() {
  const [users, setUsers] = useState([]);
  return (
    <div className="App">
      <div className="container">
        <Form users={users} setUsers={setUsers} />
        <Users users={users} />
      </div>
    </div>
  );
}

export default App;
