require("dotenv").config();
const app = require("./app");

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`▶ Shoply API listening at http://localhost:${PORT} (env=${process.env.NODE_ENV})`);
});