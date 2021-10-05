require('dotenv').config();
const express = require('express');
const app = express();

require('./api/db/dbconnection');

const gameMainRoutes = require('./api/routes/games');
const gamePublishRoutes = require('./api/routes/publisher');
const gameReviewRoutes = require('./api/routes/review');


app.use(express.json());

app.use('/api/games',gameMainRoutes);
app.use('/api/games/:id/publisher',gamePublishRoutes);
app.use('/api/games/:id/review',gameReviewRoutes);


const port = process.env.port || 3000;

server = app.listen(port,function(){
    console.log(`Server is running at port: ${server.address().port}`);
});