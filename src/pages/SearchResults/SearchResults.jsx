import NavBar from "../../components/NavBar";
import { getUser } from "../../utilities/users-service";
import { useState, useEffect } from "react";
import Card from "../../components/Card";

export default function SearchResults({ firstSearch }) {
  const [user, setUser] = useState(getUser);
  const [searchTerm, setSearchTerm] = useState(firstSearch);
  const [cards, setCards] = useState([]);
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
            const cardsData = data.data;
            console.log(cardsData)
            setCards(cardsData);
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
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((card) => (
          <Card
            key={card.id}
            cardName={card.name}
            cardImage={card.images.small}
            setName={card.set.name}
            setNumber={card.number}
            setTotal={card.set.total}
            rarity={card.rarity}
            price={
              card.tcgplayer?.prices?.holofoil?.market ?? "Price not available"
            }
          />
        ))}
      </div>
    </>
  );
}
