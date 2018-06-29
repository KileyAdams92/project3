// var express = require("express");
var router = require("express").Router();
// grabbing our models
var db = require("../../models");
var passport = require("../../config/passport");


module.exports = function (app) {
  // get route, edited to match sequelize
  app.get("/api/dogs", (req, res) => {
    // replace old function with sequelize function
    db.Dog.findAll({
      //attributes that will not reflect on the dog card on the search page
      attributes: { exclude: ['password', 'zipcode', 'id', 'size','zipcode', 'email', 'createdAt', 'updatedAt' ]}, 
      order: [
        ["state"]
      ]
    })
     // use promise method to pass the dogs...
      .then(function (dbDog) {
        res.json(dbDog);
      });
  });

  // post route to create dogs
  app.post("/api/signup", function (req, res) {  //or api/users
    db.Dog.create({
      id: req.body.id,
      username: req.body.username,
      password: req.body.password,
      pet_name: req.body.pet_name,
      breed: req.body.breed,
      city: req.body.city,
      state: req.body.state,
      zipcode: req.body.zipcode,
      size: req.body.size,
      description: req.body.description,
      email: req.body.email,
      //imgurl: req.body.imgurl
    })
      .then(function (dbDog) {
        console.log(dbDog);
        res.json(dbDog);
      });
  });

  //route for login
  app.post("/api/login", passport.authenticate("local"), function (req, res) {
    db.Dog.findOne({
      username: req.body.username,
      password: req.body.password,
    }).then (function(dbDog){
      res.json(dbDog);
    })
  });


  app.get("/api/profile", function (req, res) {
    db.Dog.findOne({
      where: { id: id }
    })
  })
};

//doing nothing just trying to push to github



