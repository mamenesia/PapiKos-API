const express = require("express")
const Route = express.Router()
const CtrlRegion = require("../controllers/regions")

Route.get("/", CtrlRegion.getRegions)
  .get("/:id", CtrlRegion.getARegions)
  .post("/", CtrlRegion.addRegions)
  .patch("/:id", CtrlRegion.updateRegions)
  .delete("/:id", CtrlRegion.deleteRegions)
module.exports = Route
