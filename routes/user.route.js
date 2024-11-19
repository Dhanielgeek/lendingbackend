import express from "express";
const router = express.Router();

// Define routes here
router.get("/test", (req, res) => {
  res.send("Hello this is the routes ");
});

export default router;
