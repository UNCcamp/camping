"use strict"
var mocha = require("mocha");
var assert = require('chai').assert;
var auth = require("../controllers/auth/authCode.js");
describe("auth testing", function() {
  var srambleMe = "testingMe45653"
  var encrypted = "";
  it("encrypting string",function() {

   encrypted = auth.encrypt(srambleMe);
    assert.isString(encrypted);
  });
  it("decrypting string",function() {
    
    assert.equal(auth.decrypt(encrypted), srambleMe);
  });
});
