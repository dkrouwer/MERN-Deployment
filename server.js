const express = require('express');
const app = express();
const port = 8000;
const cors = require('cors');

require('./server/config/mongoose.config');

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended: true}))

const AllMyPirateRoutes = require('./server/routes/pirate.routes');
AllMyPirateRoutes(app);

app.listen(8000, () => console.log(`Listening on port: ${port}`) );