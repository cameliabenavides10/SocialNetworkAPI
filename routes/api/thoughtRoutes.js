const router = require('express').Router();

const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
  } = require('../../controllers/thought-controller.js');

  router.route('/').get(getThoughts).post(createThought);

  router.route('/:thoughtId').get(getSingleThought).delete(deleteThought).put(updateThought);

  module.exports = router;