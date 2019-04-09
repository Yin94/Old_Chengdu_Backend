const express = require('express');
require('express-async-errors');
//uncaught excetion handlers
require('./startup/exceptions-handlers');
//config: jwt
require('./startup/config');
//server
const app = express();
//middlewares and routes
require('./startup/routes')(app);
//database
require('./startup/db');
//listen
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`server listening on PORT:${port}`);
});
//joi validation
require('./startup/joi-add-objectId');
