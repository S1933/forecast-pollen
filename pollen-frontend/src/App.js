import React from "react";
import "./App.css";
import PollenForecast from "./components/PollenForecast";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Prévisions de Pollen</h1>
        <p>Consultez les niveaux de pollen dans votre région</p>
      </header>
      <main>
        <PollenForecast />
      </main>
      <footer>
        <p>Propulsé par l'API Google Maps Pollen</p>
      </footer>
    </div>
  );
}

export default App;
