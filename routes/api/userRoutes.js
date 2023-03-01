const router = require('express').Router();

const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
  } = require('../../controllers/user-controller.js');

  router.route('/').get(getUsers).post(createUser);

  router.route('/:userId').get(getSingleUser).delete(deleteUser).put(updateUser);

  router.route('/:userId/users/').post(addFriend);


  module.exports = router;
