"use strict";

var Nightmare = require("nightmare");
var should = require("chai").should();
var expect = require("chai").expect;

var nightmare = Nightmare({
  show: true
});


nightmare
// Visit login page
  .goto("https://unc-camp.herokuapp.com/")
  // Enter camp search.
  .type(".form-control", "Yosemite")
<<<<<<< HEAD
  
  .click(".dropdown")
  .click("a[href='/backpack']")
  .wait("a[href='/backpack']")
=======
  // Enter trail search.
  .type(".form-control", "Monument Valley")
  // Click first aid link
  .click("a[href='/firstaid']")
  // Wait until the  link renders.
  .wait("a[href='/firstaid']")
  // Click a few items.
  .click("#checkbox13")
  .click("#checkbox15")
  // Scroll down a few hundred pixels.
  .scrollTo(500, 0)
  .back()
  .click(".dropdown")
  .click("a[href='/backpack]")
  .wait("a[href='/backpack]")
>>>>>>> dev
  .click("#checkbox1")
  .click("#checkbox5")
  .click("#checkbox6")
  .click("#checkbox10")
  .click("#checkbox13")
  .click(".btn-success")
<<<<<<< HEAD
  // Scroll down a few hundred pixels.
  .scrollTo(500, 0)
  .back()

=======
>>>>>>> dev
  // End test
  .end()
  // Execute commands
  .then(function () {
    console.log("Done!")
  })
  // Catch errors
  .catch(function (err) {
     console.log(err)
   })