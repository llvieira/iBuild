const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const swaggerui = require('swagger-ui-express');
const swaggerdocument = require('./config/swaggerDoc/swaggerDoc');

const app = express();

app.use(cors());
app.use(morgan('tiny'));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/swagger', swaggerui.serve, swaggerui.setup(swaggerdocument));
require('./controllers/index')(app);

app.listen(3001, () => {
  console.log('CORS-enabled web server listening on port 3001');
});
