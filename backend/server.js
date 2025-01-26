const app = require("./app");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

if (!process.env.MONGO_URI) {
  console.error("MONGO_URI is not defined in the environment variables");
  process.exit(1);
}

mongoose
  .connect(process.env.MONGO_URI, {})
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
