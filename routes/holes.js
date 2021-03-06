const express = require('express');
const router = express.Router();
const Hole = require('../models/hole');

router.get('/', (req, res) => {
  console.log('routes')
  Hole.find( ( err, holes ) => {
    res.json(holes);
  });
});

router.post('/', (req, res) => {
  const date = new Date();
  new Hole({
    name: date.toLocaleString(),
    par: 4,
    playerIds: req.body.playerIds,
    hole: req.body.hole,
    created_at: date,
    gameId: req.body.gameId
  }).save( (err, hole) => {
    res.json(hole);
  });
});

router.put('/:id', ( req, res ) => {
  const date = new Date();
  Hole.findByIdAndUpdate(
    req.params.id,
    { $set: { finished_at: date }},
    { new: true },
    (err, hole) => {
      res.json(hole);
    });
});

router.delete('/:id', (req, res) => {
  let holeId = req.params.id;
  Hole.findById(holeId, (err, hole) => {
    hole.remove();
    // List.find({ holeId }, (err, lists) => {
    //   lists.forEach( list => {
    //     Card.find({'listId': list._id}).remove().exec();
    //     list.remove()
    //   } );
    // });
    res.status(200).send({success: true});
  });
});

router.get('/:id', (req, res) => {
  Hole.findById(req.params.id, (err, hole) => {
    res.json(hole);
  })
});

module.exports = router;
