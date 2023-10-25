import NavBar from "../../components/NavBar";
import { getUser } from "../../utilities/users-service";
import { useState } from "react";

export default function SearchResults() {
  const [user, setUser] = useState(getUser);
  return (
    <>
      <NavBar user={user} setUser={setUser} />
      <p>Search Results here</p>
    </>
  );
}
