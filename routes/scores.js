const express = require('express');
const router = express.Router();
const Score = require('../models/score');

router.get('/', (req, res) => {
  console.log('routes')
  Score.find( ( err, scores ) => {
    res.json(scores);
  });
});

router.post('/', (req, res) => {
  new Score({
    score: req.body.score,
    playerId: req.body.playerId,
    holeId: req.body.holeId,
    gameId: req.body.gameId
  }).save( (err, score) => {
    res.json(score);
  });
});

router.put('/:id', ( req, res ) => {
  const date = new Date();
  Score.findByIdAndUpdate(
    req.params.id,
    { $set: { finished_at: date }},
    { new: true },
    (err, score) => {
      res.json(score);
    });
});

router.delete('/:id', (req, res) => {
  let scoreId = req.params.id;
  Score.findById(scoreId, (err, score) => {
    score.remove();
    // List.find({ scoreId }, (err, lists) => {
    //   lists.forEach( list => {
    //     Card.find({'listId': list._id}).remove().exec();
    //     list.remove()
    //   } );
    // });
    res.status(200).send({success: true});
  });
});

router.get('/:id', (req, res) => {
  Score.findById(req.params.id, (err, score) => {
    res.json(score);
  })
});

module.exports = router;
