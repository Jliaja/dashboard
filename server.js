require('dotenv').config(); // HARUS paling atas

const app = require('./src/app');
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server jalan di http://localhost:${PORT}`);
});
