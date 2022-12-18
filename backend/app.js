const express = require('express');
const mongoose = require('mongoose')
const app = express();
const config = require('./env/config')
const mainRouter = require('./routes/mainRouter')
const cookieParser = require("cookie-parser");
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const cors = require('cors')
morgan = require('morgan')
const multer = require('multer')
const catModel = require('./models/category/category')
const port = 3000;
const cloudinary = require('cloudinary')
let path = require('path')
var fs = require('fs')
const dotenv = require('dotenv')
  .config({ path: path.resolve(__dirname, '../env/.env') });



mongoose.connect(config.connectionString,)
  .then(() => console.log('Db connected '))
  .catch(console.error)
mongoose.set('debug', true);
app.set('trust proxy', true)
app.use(cors())
app.use(express.json())
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/views'));



app.use('/', mainRouter)


app.use(cookieParser());
app.use(morgan('tiny'));


const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Ecommerce Apis',
      version: '1.0.0'
    },
    servers: [
      {
        api: 'http://localhost:3000'
      }
    ]
  },
  apis: ['./mongodb.js']
}
const swaggerSpec = swaggerJsdoc(options)
app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);

app.use((req, res, next) => {
  const error = new Error('No api matched');
  error.status = 404;
  next(error)
});
app.use((error, req, res, next) => {
  res.status(error.status || 500).json({ message: error.message })
})
app.listen(port, () => {
  console.log(`App running at port: ${port}`)
})