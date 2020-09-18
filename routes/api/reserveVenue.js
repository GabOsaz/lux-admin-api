const express = require('express');
const router = express.Router();

const ReservedVenues = require('../../models/ReservedVenues');

router.get('/', async (req, res) => {
  try {
    const reservedVenues = await ReservedVenues.estimatedDocumentCount();
    if(!users) res.json({ message: '0' });
    res.status(200).json({ reservedVenues });
  } catch (error) {
    res.status(400).json({ message: 'Unable to fetch reserved venues' })
  }
})

module.exports = router;