//
const express = require("express");
const path    = require("path")   ;
const fs      = require("fs")   ;
//
const app = express(); // initiate express
const PORT = 8000;
//
let _MY_PATH_ = process.env.MY_PATH==undefined ? "/var/lib/my_path" : process.env.MY_PATH ;
//
app.get("/", function(req, res) {
   //
   try {
      //
      console.log("..._MY_PATH_: "+_MY_PATH_+";") ;
      if ( fs.existsSync(_MY_PATH_) ){
         let arrayPaths = fs.readdirSync( _MY_PATH_ )  ;
         res.json({
            msg:   "hello from openshift",
            paths: arrayPaths
         }) ;
      } else {
         res.json({
            msg:  `**** path: '${_MY_PATH_}' do not exist.`
         }) ;
      } ;
      //
   } catch(errgp){
      console.log("***ERROR: ",errgp,"****") ;
      res.status(500) ;
      res.json(errgp)  ;
   } ;
   //
}) ;
//
app.listen(PORT, () => console.log("Server is running on http://localhost:" + PORT)); 
//
