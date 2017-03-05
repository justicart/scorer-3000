const express = require('express');
const router = express.Router();
const Player = require('../models/player');

router.get('/', (req, res) => {
  Player.find( ( err, players ) => {
    res.json(players);
  });
});

router.post('/', (req, res) => {
  console.log(req.body);
  new Player({
    name: req.body.name,
    image: req.body.image
  }).save( (err, player) => {
    res.json(player);
  });
});

router.put('/:id', ( req, res ) => {
  let { name } = req.body;
  Player.findByIdAndUpdate(
    req.params.id,
    { $set: { name }},
    { new: true },
    (err, player) => {
      res.json(player);
    });
});

router.delete('/:id', (req, res) => {
  let playerId = req.params.id;
  Player.findById(playerId, (err, player) => {
    player.remove();
    // List.find({ playerId }, (err, lists) => {
    //   lists.forEach( list => {
    //     Card.find({'listId': list._id}).remove().exec();
    //     list.remove()
    //   } );
    // });
    res.status(200).send({success: true});
  });
});

router.get('/:id', (req, res) => {
  Player.findById(req.params.id, (err, player) => {
    res.json(player);
  })
});

module.exports = router;
