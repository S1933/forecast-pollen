import React, { useState, useEffect } from "react";
import axios from "axios";
import "./PollenForecast.css";

const PollenForecast = () => {
  const [pollenData, setPollenData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [debugInfo, setDebugInfo] = useState("");

  // Positions prédéfinies pour les grandes villes françaises
  const cities = [
    { name: "Bordeaux", lat: 44.833328, lng: -0.56667 },
    { name: "Paris", lat: 48.8566, lng: 2.3522 },
    { name: "Marseille", lat: 43.2965, lng: 5.3698 },
    { name: "Toulouse", lat: 43.6047, lng: 1.4442 },
    { name: "Nice", lat: 43.7102, lng: 7.262 },
  ];

  const [selectedCity, setSelectedCity] = useState(cities[0]);

  useEffect(() => {
    console.log("PollenForecast component mounted");
    setDebugInfo((prev) => prev + "\nComposant monté");

    // Utiliser directement la ville par défaut
    fetchPollenData(selectedCity.lat, selectedCity.lng);
  }, []);

  const fetchPollenData = async (lat, lng) => {
    try {
      setLoading(true);
      console.log(`Fetching pollen data for lat=${lat}, lng=${lng}`);
      setDebugInfo((prev) => prev + `\nRécupération des données pour lat=${lat}, lng=${lng}`);

      const response = await axios.get("/api/pollen/forecast", {
        params: { lat, lng, days: 5, language: "fr" },
        timeout: 10000,
      });

      console.log("API response received");
      setDebugInfo((prev) => prev + "\nRéponse API reçue");
      setPollenData(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching data:", err);
      setDebugInfo((prev) => prev + "\nErreur: " + (err.message || "Erreur inconnue"));
      setError(`Impossible de charger les données de pollen: ${err.message || "Erreur inconnue"}`);
      setLoading(false);
    }
  };

  // Fonction pour changer de ville
  const changeCity = (city) => {
    setSelectedCity(city);
    fetchPollenData(city.lat, city.lng);
  };

  // Fonction pour obtenir la couleur de fond en fonction de l'indice de pollen
  const getBackgroundColor = (indexInfo) => {
    if (!indexInfo || !indexInfo.color) return "#f0f0f0";

    const { red = 0, green = 0, blue = 0 } = indexInfo.color;
    return `rgb(${Math.round(red * 255)}, ${Math.round(green * 255)}, ${Math.round(blue * 255)})`;
  };

  // Fonction pour obtenir la couleur du texte (blanc ou noir) en fonction de la luminosité du fond
  const getTextColor = (backgroundColor) => {
    // Extraction des composantes RGB
    const rgb = backgroundColor.match(/\d+/g);
    if (!rgb) return "#000000";

    // Calcul de la luminosité
    const luminance = (0.299 * rgb[0] + 0.587 * rgb[1] + 0.114 * rgb[2]) / 255;
    return luminance > 0.5 ? "#000000" : "#ffffff";
  };

  if (loading) return <div className="pollen-loading">Chargement des données de pollen...</div>;
  if (error) return <div className="pollen-error">{error}</div>;

  return (
    <div className="pollen-forecast-container">
      <h2>Prévisions de pollen</h2>

      {/* Sélecteur de ville */}
      <div className="city-selector">
        <p>Sélectionnez une ville :</p>
        <div className="city-buttons">
          {cities.map((city) => (
            <button key={city.name} onClick={() => changeCity(city)} className={selectedCity.name === city.name ? "active" : ""}>
              {city.name}
            </button>
          ))}
        </div>
      </div>

      {pollenData && pollenData.dailyInfo && (
        <div className="pollen-days">
          {pollenData.dailyInfo.map((day, index) => (
            <div key={index} className="pollen-day-card">
              <h3>
                {new Date(day.date.year, day.date.month - 1, day.date.day).toLocaleDateString("fr-FR", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                })}
              </h3>

              <div className="pollen-types">
                {day.pollenTypeInfo.map((pollenType, typeIndex) => {
                  const backgroundColor = getBackgroundColor(pollenType.indexInfo);
                  const textColor = getTextColor(backgroundColor);

                  return (
                    <div key={typeIndex} className="pollen-type-card" style={{ backgroundColor, color: textColor }}>
                      <h4>{pollenType.displayName}</h4>
                      {pollenType.indexInfo && (
                        <>
                          <div className="pollen-index">
                            <span className="pollen-value">{pollenType.indexInfo.value}</span>
                            <span className="pollen-category">{pollenType.indexInfo.category}</span>
                          </div>
                          <p className="pollen-description">{pollenType.indexInfo.indexDescription}</p>
                        </>
                      )}
                      {pollenType.healthRecommendations && (
                        <div className="health-recommendations">
                          <h5>Recommandations</h5>
                          <ul>
                            {pollenType.healthRecommendations.map((rec, recIndex) => (
                              <li key={recIndex}>{rec}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {day.plantInfo && day.plantInfo.length > 0 && (
                <div className="plants-section">
                  <h4>Plantes allergènes</h4>
                  <div className="plants-grid">
                    {day.plantInfo
                      .filter((plant) => plant.inSeason)
                      .map((plant, plantIndex) => (
                        <div key={plantIndex} className="plant-card">
                          <h5>{plant.displayName}</h5>
                          {plant.indexInfo && (
                            <div className="plant-index">
                              <span>{plant.indexInfo.category}</span>
                              <span className="plant-value">{plant.indexInfo.value}</span>
                            </div>
                          )}
                          {plant.plantDescription && (
                            <button className="plant-details-btn" onClick={() => alert(`Détails pour ${plant.displayName}: ${plant.plantDescription.family}`)}>
                              Voir détails
                            </button>
                          )}
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PollenForecast;
