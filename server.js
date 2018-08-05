var express = require('express');
var fs = require('fs')
var request = require('request')
var path = require('path')
var app = express();
var axios = require('axios')
const cors = require('cors');

//app.use(cors());

app.use(cors({
  origin: '*',
  credentials: true
}));

//test
app.get('/', (req,res) => {
  res.send('working');
});

app.get('/searchSong', function(req,res){
  let q = req.query.song //REMEMBER THIS!!
  axios({
    method:'get',
    url: 'http://api.7digital.com/1.2/track/search?shopId=2020&oauth_consumer_key=7d4vr6cgb392&usageTypes=adsupportedstreaming&q='+q,
    headers: {
      accept: 'application/json',
    },
  })
  .then(responseJson => {
    console.log('response', responseJson.data)
    res.json(responseJson.data.searchResults)
})
  .catch(function(error){
    console.log("error", error)
    res.send(error)
  })
})



app.listen(4000)
