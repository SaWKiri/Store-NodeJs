// const db = require('../utils/database');
// const Cart = require('./cart');

// module.exports = class Product {
//   constructor(id, title, imageUrl, description, price) {
//     this.id = id;
//     this.title = title;
//     this.description = description;
//     this.imageUrl = imageUrl;
//     this.price = price;
//   }

//   save() {
//     return db.execute('INSERT INTO products (title,price,imageUrl,description) VALUES (?,?,?,?)',
//     [this.title, this.price, this.imageUrl, this.description]);
//   }

//   static deleteById(id) {
//     getProductsFromFile((products) => {
//       const product = product.find((prod) => prod.id === id);
//       const updatedProducts = products.filter((p) => p.id !== id);
//       fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
//         if (!err) {
//           Cart.deleteProduct(id, product.price);
//         }
//       });
//     });
//   }

//   static fetchAll() {
//     return db.execute('SELECT * FROM products');
//   }

//   static findeById(id) {
//     return db.execute('SELECT * FROM products WHERE products.id = ?',[id]);
//   }
// };
const Sequelize = require('sequelize');

const sequelize = require('../utils/database');

const Product = sequelize.define('product', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNul: false,
    primaryKey: true,
  },
  title: {
    type: Sequelize.STRING,
    allowNul: false,
  },
  price: {
    type: Sequelize.DOUBLE,
    allowNul: false,
  },
  imageUrl: {
    type: Sequelize.STRING,
    allowNul: false,
  },
  description: {
    type: Sequelize.STRING,
    allowNul: false,
  },
});

module.exports = Product;
