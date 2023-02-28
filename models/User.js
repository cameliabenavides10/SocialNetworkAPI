const { Schema, model } = require('mongoose');


// Schema to create User model
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: { 
      type: String,
      required: true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
      unique: true,
    },
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false
  }
);






const User = model('User', userSchema);
module.exports = User;
