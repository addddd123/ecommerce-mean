const express = require('express');
const mongoose = require('mongoose')
const app = express();
const config = require('./env/config')
const mainRouter = require('./routes/mainRouter')
const cookieParser = require("cookie-parser");
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./docs/api-docs.json')
console.log(swaggerDocument)
const cors = require('cors')
morgan = require('morgan')
let path = require('path')
const helmet = require('helmet')
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
app.use(helmet())


app.use('/', mainRouter)


app.use(cookieParser());
app.use(morgan('tiny'));



// const swaggerSpec = swaggerJsdoc(options)
app.use(
  '/api-docs',
  swaggerUi.serve
  ,
  swaggerUi.setup(swaggerDocument)
);

app.use((req, res, next) => {
  const error = new Error('No api matched');
  error.status = 404;
  next(error)
});
app.use((error, req, res, next) => {
  res.status(error.status || 500).json({ message: error.message })
})
app.listen(process.env.port || 3000, () => {
  console.log(`App running at port: ${process.env.port}`)
})