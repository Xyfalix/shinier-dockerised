import debug from "debug";
import { Route, Routes } from "react-router-dom";
import "./App.css"
import AppMain from "../AppLandingPage/AppLanding";
import SearchPage from "../SearchPage/SearchPage";
import CardDetails from "../CardDetails/CardDetails";
import ShoppingCart from "../ShoppingCartPage/ShoppingCart";
import { ProtectedRoute } from "../../components/ProtectedRoute";
import { getUser } from "../../utilities/users-service";

const log = debug("mern:src:App");
localStorage.debug = "mern:*";
const user = getUser();

log("Start React App");

export default function App() {
  return (
    <main className="App">
      <>
        <Routes>
          <Route exact path="/" element={<AppMain />}></Route>
          <Route path="/search" element={<SearchPage />} />
          <Route path="/cardDetails" element={<CardDetails />} />
          <Route
            path="/shoppingCart"
            element={
              <ProtectedRoute user={user}>
                <ShoppingCart />
              </ProtectedRoute>
            }

          />
        </Routes>
      </>
    </main>
  );
}
