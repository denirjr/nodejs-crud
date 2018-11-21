const express = require('express');
const UserRouter = express.Router();

const User = require('../models/User');

UserRouter.route('/create').post((req, res) => {
  const user = new User(req.body);
  user.save()
    .then(() => {
      res.json(user);
    })
    .catch(() => {
      res.status(400).send("unable to save to database");
    });
});

UserRouter.route('/').get((req, res) => {
  User.find({}, (err, users) => {
    res.json(users)
  })
})

UserRouter.route('/:userId')
  .get((req, res) => {
    User.findById(req.params.userId, (err, user) => {
      res.json(user);
    })
  })

UserRouter.route('/update/:userId')
  .get((req, res) => {
    User.findById(req.params.userId, (err, user) => {
      res.json(user);
    })
  })
  .put((req, res) => {
    User.findById(req.params.userId, (err, user) => {
      user.name = req.body.name;
      user.email = req.body.email;
      user.save()
      res.json(user)
    })
  })

  UserRouter.route('/:userId')
  .get((req, res) => {
    User.findById(req.params.userId, (err, user) => {
      res.json(user);
    })
  })
  .put((req, res) => {
    User.findById(req.params.userId, (err, user) => {
      user.name = req.body.name;
      user.email = req.body.email;
      user.save();
      res.json(user);
    })
  })
  .patch((req, res) => {
    User.findById(req.params.userId, (err, user) => {
      if(req.body._id){
        delete req.body._id;
      }
      for(let u in req.body) {
        user[u] = req.body[u];
      }
      user.save();
      res.json(user);
    })
  })

  UserRouter.route('/delete/:userId')
  .get((req, res) => {
    User.findById(req.params.userId, (err, user) => {
      res.json(user);
    })
  })
  .put((req, res) => {
    User.findById(req.params.userId, (err, user) => {
      user.name = req.body.name;
      user.email = req.body.email;
      user.save()
      res.json(user)
    })
  })
  .patch((req, res) => {
    User.findById(req.params.userId, (err, user) => {
      if(req.body._id){
        delete req.body._id;
      }
      for(let u in req.body) {
        user[u] = req.body[u];
      }
      user.save();
      res.json(user);
    })
  })
  .delete((req, res) => {
    User.findById(req.params.userId,(err, user) => {
      user.remove(err => {
        if (err) {
          res.status(500).send(err)
        } else {
          res.status(200).send('User removed with success')
        }
      })
    })
  })

module.exports = UserRouter;