const express = require('express')
const app = express()
const port = 3001
const bodyParser = require('body-parser');
const cors = require('cors')
const HttpStatus = require('http-status-codes');
const CheckInput = require('node-input-validator');

app.use(cors())
app.use(bodyParser.json({ extended: true }));


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/user/register', async function (req, res) {
    console.log(req.body)

    // Init rule of request body validation.
    let inputValidation = new CheckInput.Validator(req.body, {
      email:     'required|string',
      username:     'required|string',
    });
    
    // Validation process
    let matched = await inputValidation.check();

    // If not match then return error message.
    if(!matched) {
        res.send({
          status: HttpStatus.BAD_REQUEST,
          data: inputValidation.errors
        })

        return;
    }

    // If validation success do something below, like insert to db.
    // Do something ..

    
    res.send({
      status: HttpStatus.OK,
      data: "Successfully registered"
    })

})

app.listen(port, () => {
  console.log(`Application listening at http://localhost:${port}`)
})


