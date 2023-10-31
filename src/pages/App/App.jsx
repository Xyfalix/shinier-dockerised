import debug from "debug";
import { Route, Routes } from "react-router-dom";
import "./App.css"
import AppLanding from "../AppLandingPage/AppLanding";
import SearchResults from "../SearchResults/SearchResults";
import CardDetails from "../CardDetails/CardDetails";
import ShoppingCart from "../ShoppingCartPage/ShoppingCart";
import Favourites from "../FavouritesPage/Favourites";
import { ProtectedRoute } from "../../components/ProtectedRoute";
import { getUser } from "../../utilities/users-service";
import AuthPage from "../AuthPage/AuthPage";
import { useState} from "react";

const log = debug("mern:src:App");
localStorage.debug = "mern:*";

log("Start React App");

export default function App() {
  const [user, setUser] = useState(getUser());
  const [firstSearch, setFirstSearch] = useState('');
  const [cardsDetails, setCardsDetails] = useState([]);

  const updateFirstSearch = (firstSearchTerm) => {
    setFirstSearch(firstSearchTerm)
  }

  const updateCardsDetails = (cardSearchResults) => {
    setCardsDetails(cardSearchResults)
  }

  return (
    <main className="App">
      <>
        <Routes>
          <Route exact path="/" element={<AppLanding updateFirstSearch={updateFirstSearch} />}></Route>
          <Route path="/login" element={<AuthPage setUser={setUser}/>}></Route>
          <Route path="/search" element={<SearchResults firstSearch={firstSearch} updateCardsDetails={updateCardsDetails} />} />
          <Route path="/cardDetails/:cardId" element={<CardDetails cardsDetails={cardsDetails} updateFirstSearch={updateFirstSearch} />} />
          <Route
            path="/shoppingCart"
            element={
              <ProtectedRoute user={user}>
                <ShoppingCart updateFirstSearch={updateFirstSearch} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/favourites"
            element={
              <ProtectedRoute user={user}>
                <Favourites />
              </ProtectedRoute>
            }
          />
        </Routes>
      </>
    </main>
  );
}
