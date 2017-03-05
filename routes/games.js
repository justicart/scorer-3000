const express = require('express');
const router = express.Router();
const Game = require('../models/game');

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
    res.json(game);
  });
});

router.put('/:id', ( req, res ) => {
  let { name } = req.body;
  Game.findByIdAndUpdate(
    req.params.id,
    { $set: { name }},
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
