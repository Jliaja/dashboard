require('dotenv').config();
const app = require('./src/app');

app.listen(process.env.PORT, () => {
  console.log(`Server jalan di http://localhost:${process.env.PORT}`);
});
