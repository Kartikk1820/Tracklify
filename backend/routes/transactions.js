const express = require("express");
const router = express.Router();
const ctrl = require("../controller/transactionsController.js");
const auth = require("../middleware/auth");

router.get("/", auth, ctrl.getAll);
router.get("/:id", auth, ctrl.getById);
router.post("/", auth, ctrl.create);
router.put("/:id", auth, ctrl.update);
router.delete("/:id", auth, ctrl.delete);

module.exports = router;
