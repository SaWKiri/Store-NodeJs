const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error.controller');
const sequelize = require('./utils/database');
const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin.route');
const shopRoutes = require('./routes/shop.route');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findByPk(1)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch(console.log);
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

//Sequelize Relation definitions
Product.belongsTo(User, { constrains: true, onDelete: 'CASCADE' });
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });

sequelize
  // .sync({ force: true }) // dont force in production
  .sync()
  .then((res) => {
    return User.findByPk(1);
    // console.log(res);
  })
  .then((user) => {
    if (!user) {
      return User.create({ userName: 'Max', email: 'test@test.com' });
    }
    return user;
  })
  .then((user) => {
    user.createCart();
  })
  .then((cart) => {
    app.listen(4200);
  })
  .catch(console.log);
