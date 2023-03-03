const { Thought, User } = require('../models');

module.exports = {
// Get all thoughts
getThoughts(req, res) {
    Thought.find().populate('reactions')
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },
// Get a thought
getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select('-__v')
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with that ID' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Create a thought
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => {
        User.findOneAndUpdate(
          {_id: req.params.userId},
          { $addToSet: {thought: thought._id}}
        )
        res.json(thought)
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  //   Delete a thought
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then(() => res.json({ message: 'thought deleted!' }))
      .catch((err) => res.status(500).json(err));
  },
  // update thought by Id
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with this id!' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },


   // Add a reaction to a thought
   addReaction(req, res) {
    console.log('You are adding a reaction');
    console.log(req.body);
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } }
    )
      .then((reaction) =>
        !reaction
          ? res
            .status(404)
            .json({ message: 'No thought found with that ID :(' })
          : res.json(reaction)
      )
      .catch((err) => res.status(500).json(err));
  },

    // delete a reaction to a thought
    deleteReaction(req, res) {
      console.log('You are deleting a reaction');
      console.log(req.body);
      Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: {reactionId: req.params.reactionId } } }
      )
        .then((thought) =>
          !thought
            ? res
              .status(404)
              .json({ message: 'No thought found with that ID :(' })
            : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },
};