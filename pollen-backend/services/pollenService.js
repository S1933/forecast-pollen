const axios = require("axios");

class PollenService {
  constructor() {
    this.apiKey = process.env.GOOGLE_POLLEN_API_KEY;
    this.baseUrl = "https://pollen.googleapis.com/v1";
  }

  /**
   * Obtient les prévisions de pollen pour un emplacement donné
   * @param {number} latitude - Latitude de l'emplacement
   * @param {number} longitude - Longitude de l'emplacement
   * @param {number} days - Nombre de jours de prévision (1-5)
   * @param {string} language - Code de langue (optionnel)
   * @returns {Promise} - Données de prévision de pollen
   */
  async getForecast(latitude, longitude, days = 1, language = "fr") {
    try {
      const response = await axios.get(`${this.baseUrl}/forecast:lookup`, {
        params: {
          "location.latitude": latitude,
          "location.longitude": longitude,
          days,
          languageCode: language,
          key: this.apiKey,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la récupération des prévisions de pollen:", error);
      throw error;
    }
  }

  /**
   * Obtient les tuiles de carte thermique pour un type de pollen
   * @param {string} type - Type de pollen (GRASS, TREE, WEED)
   * @returns {Promise} - URL des tuiles de carte thermique
   */
  async getHeatmapTiles(type) {
    try {
      const response = await axios.get(`${this.baseUrl}/heatmapTiles:lookup`, {
        params: {
          type,
          key: this.apiKey,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la récupération des tuiles de carte thermique:", error);
      throw error;
    }
  }
}

module.exports = new PollenService();
