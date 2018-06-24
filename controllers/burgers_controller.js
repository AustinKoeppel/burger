const express = require("express");
const router = express.Router();
const burger = require("../models/burger.js");

// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {
  burger.selectAll(function(data) {
    console.log("bork", data)
    // for(let i = 0; i <data.length; i++ ){
    //   if(data[i].devoured == 1) {
    //     data[i].devoured = false;
    //   }
    //   else {
    //     data[i].devoured = true;
    //   }
    // }
    var hbsObject = {
      burgers: data
      
    };
    console.log("hbsObject", hbsObject);
    res.render("index", hbsObject);
  });
});

router.post("/api/burgers", function(req, res) {
  console.log("bork",req.body.name)
  burger.insertOne(req.body.name, function(result) {
    // Send back the ID of the new quote
    res.json({ id: result.insertId });
  });
});

router.put("/api/burgers/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  console.log("condition", condition);

  burger.updateOne(
    {
      devoured: true
    },
    condition,
    function(result) {
      if (result.changedRows === 0) {
        // If no rows were changed, then the ID must not exist, so 404
        return res.status(404).end();
      }
      res.status(200).end();

    }
  );
});

// Export routes for server.js to use.
module.exports = router;
