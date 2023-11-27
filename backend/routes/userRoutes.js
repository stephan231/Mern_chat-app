const express = require('express');
const router = express.Router();
const {
  registerUser,
  authUser,
  alluser,
} = require("../controllers/userControllers");
const { protect } = require("../Middleware/authMiddleware");

router.route("/").post(registerUser).get(protect,alluser);
router.post('/login',authUser)

module.exports = router;