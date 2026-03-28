const express = require("express");
const Task = require("../models/Task");
const router = express.Router();
const auth = require('../middleware/authMiddleware');

router.get("/", auth, async (req, res) => {
  const tasks = await Task.find();
  res.send(tasks);
});

router.post("/", auth, async (req, res) => {
  try {
    req.body.user = req.user.userId;
    const task = new Task(req.body);
    await task.save();
    res.send(task);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted!" });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.put('/:id', auth, async (req, res) => {
    try {
        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
            res.json(updatedTask);
    } catch (error) {
        res.status(500).send(error.message);
    }
})

module.exports = router;
