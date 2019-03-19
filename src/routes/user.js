const express = require('express');
const router = express.Router();
const model = require('../../db/mongoose').model;

//user는 delete, update 불가

//get all users
router.get('/', function(req, res) {
  model.user
    .find()
    .then(result => res.send(result))
    .catch(err => res.status(500).send(err));
});

//add new user
router.post('/', function(req, res) {
  const user = new model.user({
    _id: req.body._id,
    name: req.body.name,
  });
  model.user
    .create(req.body)
    .then(result => res.send(result))
    .catch(err => res.status(500).send(err));
});

//get user
router.get('/:id', function(req, res) {
  model.user
    .findOne({ _id: req.params.id })
    .then(result => res.json(result))
    .catch(err => res.status(500).send(err));
});

//get all posts by user id
router.get('/:id/post', function(req, res) {
  model.post
    .find({ author: req.params.author })
    .then(result => res.json(result))
    .catch(err => res.status(500).send(err));
});

//get all comments by user id
router.get('/:id/comment', function(req, res) {
  model.comment
    .find({ author: req.params.author })
    .then(result => res.json(result))
    .catch(err => res.status(500).send(err));
});

module.exports = router;