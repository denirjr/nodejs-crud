const express = require('express');
const UserRouter = express.Router();

const User = require('../models/User');

UserRouter.route('/create').post( (req, res) => {
  const user = new User(req.body);
  console.log(user);
  user.save()
    .then(user => {
      res.json('User added successfully');
    })
    .catch(err => {
      res.status(400).send("unable to save to database");
    });
});

UserRouter.route('/').get(( req, res ) => {
 User.find({}, (err, users) => {
   res.json(users)
 })
})

UserRouter.route('/:userId')
.get((req, res)=> {
  User.findById(req.params.userId, (err, user) => {
    res.json(user);
  })
})

module.exports = UserRouter;