import debug from "debug";
import { useState } from "react";
import "../App/App.css"
import NavBar from "../../components/NavBar";
import { getUser } from "../../utilities/users-service";

const log = debug("mern:src:App");
localStorage.debug = "mern:*";

log("Start React App");

export default function AppMain() {
  const [user, setUser] = useState(getUser);

  return (
    <main className="App">
      <NavBar user={user} setUser={setUser} />
    </main>
  );
}