const express = require("express");
const bodyParser = require("body-parser");
const axios = require('axios')



const app = express();
const port = 5000;

app.use(bodyParser.json());
require('dotenv').config()


app.get("/books", (req, res) => {

    res.send("Enter ISBN in request");

  });

app.get("/books/:id", (req, res) => {
    const {id} = req.params;
    

    const sendGetReq = async () => {
      try {

        // res.send(id.toString().length());
          // console.log(id.toString().length())
          if(((id+'').length)==13 || ((id+'').length)==10){
            const resp = await axios.get('https://www.googleapis.com/books/v1/volumes?key='+process.env.API_KEY+'&q='+id);
            
            if(resp.data.totalItems > 0) {
              res.status(200).json(resp.data.items[0].volumeInfo);
            }
            else{
              res.status(404).json("No book data found with that ISBN number");
            }
          }
          else{
            res.status(400).json("Enter 10 or 13 digit ISBN number");
          }
          
      } catch (err) {
          res.status(500).json("Internal Server Error"+ err);          
      }
  };
  
  sendGetReq();
    
  });

app.listen(port,()=>{
    console.log(`Server is running on port: ${port}`);
})