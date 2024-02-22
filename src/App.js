// to run this after cloning from github:
// step 1: open command prompt and install json server by typing: npm i json-server
// step 2: open seperate command prompt in correct directory, type command: json-server --watch database.json
// step 3: in command terminal in correct directory, type command: npm start
// step 4: wait should launch project

import Card from "./components/card";
import Header from "./components/header";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "./index.css";
function App() {
  return (
    <div className="app">
      <Header />

      <Card />
    </div>
  );
}

export default App;
