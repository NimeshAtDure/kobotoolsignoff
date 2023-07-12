const express = require('express');
const bodyParser = require('body-parser');

const customResourceResponse = require('./utils/constant');
const bookRoutes = require('./route/booksroute');
const defaultroute = require("./route/defaultroute")
const app = express();

app.use(bodyParser.json());


app.use('/', bookRoutes);
// app.use('/',defaultroute)

// Basic 404 handler
app.use((req, res) => {
    res.status(404).send({
      message: 'The requested URL could not be found.',
      statusCode: 404,
    });
  });
  
app.use((error, req, res, next) => {
    const { message } = customResourceResponse.serverError;
    const data = {
    Code: `${error.code ? error.code : ''}`,
    Stacktrace: `${error.stack}`
    };
    res.status(500).json({ message, data });
});


const port = 6000;

app.listen(port, () => console.log('Book server started and listening on port ' + port));



