import debug from "debug";

const log = debug("mern:src:App");
localStorage.debug = "mern:*";

log("Start React App");

function App() {
  return (
    <>
      <h1>SEI Cafe</h1>
    </>
  );
}

export default App;
