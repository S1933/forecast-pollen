const express = require("express");
const router = express.Router();
const pollenService = require("../services/pollenService");

/**
 * @route GET /api/pollen/forecast
 * @desc Obtenir les prévisions de pollen pour un emplacement
 * @access Public
 */
router.get("/forecast", async (req, res) => {
  try {
    const { lat, lng, days = 1, language = "fr" } = req.query;

    if (!lat || !lng) {
      return res.status(400).json({ error: "Les paramètres lat et lng sont requis" });
    }

    const forecast = await pollenService.getForecast(lat, lng, days, language);
    res.json(forecast);
  } catch (error) {
    console.error("Erreur route /forecast:", error);
    res.status(500).json({
      error: "Erreur lors de la récupération des prévisions de pollen",
      message: error.message,
    });
  }
});

/**
 * @route GET /api/pollen/heatmap
 * @desc Obtenir les tuiles de carte thermique pour un type de pollen
 * @access Public
 */
router.get("/heatmap", async (req, res) => {
  try {
    const { type } = req.query;

    if (!type) {
      return res.status(400).json({ error: "Le paramètre type est requis" });
    }

    const heatmapData = await pollenService.getHeatmapTiles(type);
    res.json(heatmapData);
  } catch (error) {
    console.error("Erreur route /heatmap:", error);
    res.status(500).json({
      error: "Erreur lors de la récupération des tuiles de carte thermique",
      message: error.message,
    });
  }
});

module.exports = router;
