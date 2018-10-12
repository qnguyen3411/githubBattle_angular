const express = require('express')
const mongoose = require('mongoose')
const bParser = require('body-parser')
const app = express()


app.use(express.static( __dirname + '/./public/dist/public' ));
app.use(bParser.json())

mongoose.connect('mongodb://localhost/githubbattle');
mongoose.Promise = global.Promise;

const UserSchema = new mongoose.Schema({
  username: {type: String, required: true, unique: [true, "ALREADY IN DATABASE BROSKI"]},
  avatarUrl: {type: String, required: true},
  numRepos: {type: Number, required: true},
  numFollowers: {type: Number, required: true}
})

mongoose.model('User', UserSchema)
const User = mongoose.model('User')

app.get('/api/users', (req, res) => {
  User.find().then(result => {
    res.json({status: "success", data: result});
  }).catch(err => {
    const errMessages = Object.keys(err.errors)
      .map(key => ({tag: key, message: err.errors[key].message}));
    res.json({status: "error", data: errMessages});
  });
})

app.post('/api/users', (req, res) => {
  console.log(req.body);
  User.create(req.body).then(result => {
    res.json({status: "success", data: result});
  }).catch(err => {
    res.json({status: "error", data: err});
  });
})


app.all("*", (req,res) => {
  res.sendFile(__dirname + "/./public/dist/public/index.html")
});


app.listen(8000, () => {
  console.log("LISTENIN")
})

