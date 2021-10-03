const express = require('express');
const app = express();

require('./api/db/dbconnection');

const gameMainRoutes = require('./api/routes/games');
const gamePublishRoutes = require('./api/routes/publisher');


app.use(express.json());

app.use('/api/games',gameMainRoutes);
app.use('/api/games/:id/publisher',gamePublishRoutes);



const port = process.env.port || 3000;

app.listen(port,function(){
    console.log(`Server is running at port: ${port}`);
});