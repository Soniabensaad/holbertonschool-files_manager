const express = require('express');
const app = express();

// Load routes
const router = require('./routes/index');
router(app);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
