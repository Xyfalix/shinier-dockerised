import NavBar from "../../components/NavBar";
import { getUser } from "../../utilities/users-service";
import { useState, useEffect } from "react";
import Card from "../../components/Card";

export default function SearchResults({ firstSearch, updateCardsDetails }) {
  const [user, setUser] = useState(getUser);
  const [searchTerm, setSearchTerm] = useState(firstSearch);
  const [cards, setCards] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 12;
  const apiKey = "e1b93a4d-a6b1-4c49-8dac-c1ed6425dcf6";

  function handleSearch(submittedSearch) {
    setSearchTerm(submittedSearch)
  }

  useEffect(() => {

    async function fetchCards() {
      if (searchTerm) {
        try {
          const apiUrl = `https://api.pokemontcg.io/v2/cards?q=name:"${searchTerm}"`;

          const response = await fetch(apiUrl, {
            method: "GET",
            headers: {
              "X-Api-Key": apiKey
            },
          });

          if (response.ok) {
            const data = await response.json();
            const cardsData = data.data;
            console.log(cardsData)
            setCards(cardsData);
            // update cardDetails state in App.jsx to pass down as prop to CardDetails component
            updateCardsDetails(cardsData);
          }
        } catch (error) {
          console.error("Search failed", error);
        }
      }
    }

    fetchCards();

  }, [searchTerm])

  // Calculate the indexes for the current page
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = cards.slice(indexOfFirstCard, indexOfLastCard);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <NavBar user={user} setUser={setUser} handleSearch={handleSearch} />
      <p>Search Param is {searchTerm}</p>
      <div className="w-80 bg-gray-600 m-5 p-3">
        <h2 className="text-white text-3xl">{cards.length} Products Found</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 m-5">
        {currentCards.map((card) => (
          <Card
            key={card.id}
            cardId={card.id}
            cardName={card.name}
            cardImage={card.images.small}
            setName={card.set.name}
            setNumber={card.number}
            setTotal={card.set.total}
            rarity={card.rarity}
            price={
              card.tcgplayer?.prices?.holofoil?.market !== undefined
                ? `${card.tcgplayer.prices.holofoil.market}`
                : "Price N.A"
            }
          />
        ))}
      </div>
      <div className="pagination-container flex justify-center">
        <div className="join">
          {Array.from(
            { length: Math.ceil(cards.length / cardsPerPage) },
            (_, index) => (
              <button
                key={index}
                className={`pagination-item btn ${
                  currentPage === index + 1 ? "btn-active" : ""
                }`}
                onClick={() => paginate(index + 1)}
              >
                {index + 1}
              </button>
            )
          )}
        </div>
      </div>
    </>
  );
}
