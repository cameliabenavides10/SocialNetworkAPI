const router = require('express').Router();

const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
  } = require('../../controllers/user-controller.js');

  router.route('/').get(getUsers).post(createUser);

  module.exports = router;