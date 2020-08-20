const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const errorController = require('./controllers/error.controller');
// const mongoConnect = require('./utils/database').mongoConnect;
const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin.route');
const shopRoutes = require('./routes/shop.route');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  console.log('getting user');
  User.findById('5f3dfbab539155310805daa7')
    .then((user) => {
      console.log('found user saving to req');
      console.log(user);
      req.user = user;
      next();
    })
    .catch(console.log);
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose
  .connect(
    'mongodb+srv://shopUser:zaq1xsw2@shop-cluster.ex40w.mongodb.net/shopApp?retryWrites=true&w=majority',
    { useNewUrlParser: true }
  )
  .then((res) => {
    User.findOne().then((user) => {
      if (!user) {
        const user = new User({
          name: 'Max',
          email: 'Max@test.com',
          cart: { items: [] },
        });
        user.save();
      }
    });
    app.listen(4200);
  })
  .catch(console.log);
