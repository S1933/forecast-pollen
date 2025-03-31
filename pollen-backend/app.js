const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const pollenRoutes = require("./routes/pollenRoutes");

// Charger les variables d'environnement
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/pollen", pollenRoutes);

// Route de base pour vérifier que l'API fonctionne
app.get("/", (req, res) => {
  res.json({ message: "API Pollen opérationnelle" });
});

// Gestion des erreurs
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Erreur serveur", message: err.message });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});

module.exports = app;
