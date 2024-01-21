const express = require("express");
const path= require('path');
const fs = require("fs");
const app = express();
const bodyparser=require("body-parser");
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/NewSignup');}
const port = 8000;

const contactSchema = new mongoose.Schema({
    name: String,
    number: String,
    password: String,
    cpassword: String,
    email: String,
    
  });
const  mymy= mongoose.model('NewSignup', contactSchema);

app.use("/static", express.static('static'))
app.use(express.urlencoded())

app.set('view engine','pug')
app.set('views',path.join(__dirname,'views'))



app.get('/', (req, res)=>{
    
    const params = {}
    res.status(200).render('Home.pug', params);})

app.get('/login', (req, res) => {
        const params = {};
        res.status(200).render('login.pug', params);
      });
      

app.post('/login', async (req, res) => {
    const { name, password } = req.body;
      
        try {
          // Find user in the database
          const user = await mymy.findOne({ name, password });
      
          if (user) {
            res.send('Login successful!'); // You can redirect to another page or send a JSON response based on your needs
          } else {
            res.send('Invalid credentials');
          }
        } catch (error) {
          console.error(error);
          res.status(500).send('Internal Server Error');
        }
      });

app.get('/signup', (req, res)=>{
    
    const params = {}
    res.status(200).render('signup.pug', params);})
    
    app.post('/signup', (req, res)=>{
        
            var mydata = new mymy(req.body);
            mydata.save().then(()=>{
                res.redirect('/login');
            }).catch(()=>{
                res.status(400).send("not saved")
            });
            // const params = {'message': 'Your form has been submitted successfully'}
            // res.status(200).render('demo.pug', params);
            
        });

app.listen(port, ()=>{
        console.log(`The application started successfully on port ${port}`);
    });