const express = require('express');
const router = express.Router();

const EventCenter = require('../../models/EventCenters');

router.post('/', async (req, res) => {
    try {
      const { name } = req.body;
      console.log(req.body)
  
      const existingName = await EventCenter.findOne({
        name
      }).lean();
  
      if (existingName) {
        return res
          .status(400)
          .json({ message: 'That name already exists' });
      }
  
      const newCenter = new EventCenter(req.body);
      const savedCenter = await newCenter.save();
  
      if (savedCenter) {
        return res.json({
          message: 'Event center created!',
          savedCenter
        });
      } else {
        return res.status(400).json({
          message: 'There was a problem creating the Event Center'
        });
      }
    }
    catch (err) {
      return res.status(400).json({
        message: 'There was a problem creating the Event Center'
      });
    }
});

router.get('/', async (req, res) => {
  try {
    const EventCenters = await EventCenter.find();
    res.json(EventCenters);
  } catch(error) {
    res.status(400).json({ error })
  }
});

router.patch('/', async (req, res) => {
  try {
    const { id, ...rest} = req.body;
    await EventCenter.findOneAndUpdate(
      { _id: req.body.id },
      { ...rest }, { new: true}
    );
    res.json({
      message:
        'Event center updated!'
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: err, message: 'Sorry, something went wrong' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedCenter = await EventCenter.findOneAndDelete(
      { _id: req.params.id }
    );
    res.status(201).json({
      message: 'Event Center Deleted!',
      deletedCenter
    });
  } catch (err) {
    return res.status(400).json({
      message: 'There was a problem deleting the event center.'
    });
  }
});

module.exports = router;