const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const errorController = require('./controllers/error.controller');
// const mongoConnect = require('./utils/database').mongoConnect;
// const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin.route');
const shopRoutes = require('./routes/shop.route');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// app.use((req, res, next) => {
//   console.log('getting user');
//   User.findById('5f33fe870356b4e247e31063')
//     .then((user) => {
//       if (user !== null) {
//         req.user = new User(user.name, user.email, user.cart, user._id);
//       } else {
//         console.log(
//           'please create new user in db manually adn update id in code(above)'
//         );
//       }
//       next();
//     })
//     .catch(console.log);
// });

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose
  .connect(
    'mongodb+srv://shopUser:zaq1xsw2@shop-cluster.ex40w.mongodb.net/shopApp?retryWrites=true&w=majority'
  )
  .then((res) => {
    app.listen(4200);
  })
  .catch(console.log);
