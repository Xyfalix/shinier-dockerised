import NavBar from "../../components/NavBar";
import { getUser } from "../../utilities/users-service";
import { useState, useEffect } from "react";

export default function SearchResults({ firstSearch }) {
  const [user, setUser] = useState(getUser);
  const [searchTerm, setSearchTerm] = useState(firstSearch);
  const apiKey = "e1b93a4d-a6b1-4c49-8dac-c1ed6425dcf6";

  function handleSearch(submittedSearch) {
    setSearchTerm(submittedSearch)
  }

  useEffect(() => {

    async function fetchCards() {
      if (searchTerm) {
        try {
          const apiUrl = `https://api.pokemontcg.io/v2/cards?q=name:${searchTerm}`;

          const response = await fetch(apiUrl, {
            method: "GET",
            headers: {
              "X-Api-Key": apiKey,
            },
          });

          if (response.ok) {
            const data = await response.json();
            console.log(data);
          }
        } catch (error) {
          console.error("Search failed", error);
        }
      }
    }

    fetchCards();
  }, [searchTerm])

  return (
    <>
      <NavBar user={user} setUser={setUser} handleSearch={handleSearch} />
      <p>Search Param is {searchTerm}</p>
    </>
  );
}
