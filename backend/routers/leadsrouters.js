const express = require("express");
const leadsController = require("../controllers/leadsControllers");
const leadrouters = express.Router();




leadrouters.post("/create", leadsController.create);
leadrouters.get("/read", leadsController.read);
leadrouters.delete("/delete/:id", leadsController.delete);
leadrouters.patch("/Status/:id", leadsController.updateStatus);






module.exports = leadrouters;