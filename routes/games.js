const express = require('express');
const router = express.Router();
const Game = require('../models/game');
const Hole = require('../models/hole');

router.get('/', (req, res) => {
  Game.find( ( err, games ) => {
    res.json(games);
  });
});

router.post('/', (req, res) => {
  const date = new Date();
  new Game({
    playerIds: req.body['playerIds[]'],
    holes: req.body.holes,
    playedHoles: [],
    name: date.toLocaleString(),
    date: date
  }).save( (err, game) => {
    const holeIds = Array.apply(null, {length: req.body.holes}).map((hole, index) => {
      const holeNumber = parseInt(index + 1);
      const date = new Date();
      new Hole({
        name: `Hole ${index + 1}`,
        playerIds: game.playerIds,
        hole: holeNumber,
        gameId: game._id,
        date: date
      }).save( (err, hole) => {
        if (err)
          console.warn(err);
        return hole._id;
      })
    })
    res.json(game);
  });
});

router.put('/:id', ( req, res ) => {
  let { name } = req.body;
  Game.findByIdAndUpdate(
    req.params.id,
    { $set: { name } },
    { new: true },
    (err, game) => {
      res.json(game);
    });
});

router.delete('/:id', (req, res) => {
  let gameId = req.params.id;
  Game.findById(gameId, (err, game) => {
    game.remove();
    // List.find({ gameId }, (err, lists) => {
    //   lists.forEach( list => {
    //     Card.find({'listId': list._id}).remove().exec();
    //     list.remove()
    //   } );
    // });
    res.status(200).send({success: true});
  });
});

router.get('/:id', (req, res) => {
  Game.findById(req.params.id, (err, game) => {
    res.json(game);
  })
});

module.exports = router;
