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
  const [searchInput, setSearchInput] = useState("");
  const imageIds = [237, 238, 239, 240, 241, 242];

  return (
    <main className="App">
      <NavBar user={user} setUser={setUser} />
      <div className="min-h-screen flex m-4">
        <div className="flex flex-col justify-center">
          <p className="mb-20 text-4xl font-bold text-center text-violet-500">
            Your One Stop for collecting the coolest and rarest Pokemon Cards
          </p>
          <div className="flex flex-row justify-center items-center">
            <span>🔎</span>
            <input
              type="text"
              placeholder="Search for cards, box sets.. "
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="pl-10 border rounded-lg py-2 px-4 w-80 mx-2"
            />
            <a className="btn bg-violet-700">Submit</a>
          </div>
        </div>
        <div className="w-screen m-4">
          <div className="grid grid-cols-2 gap-4">
            {imageIds.map((id) => (
              <div key={id} className="relative aspect-w-16 aspect-h-9">
                <img
                  src={`https://picsum.photos/id/${id}/200/300`}
                  alt={`Image ${id}`}
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}