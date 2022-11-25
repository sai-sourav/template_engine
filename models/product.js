// const fs = require('fs');
// const path = require('path');

// const p = path.join(
//   path.dirname(process.mainModule.filename),
//   'data',
//   'products.json'
// );

const db = require('../util/database');

// const getProductsFromFile = cb => {
//   fs.readFile(p, (err, fileContent) => {
//     if (err) {
//       cb([]);
//     } else {
//       cb(JSON.parse(fileContent));
//     }
//   });
// };

module.exports = class Product {
  constructor(title, imageUrl, description, price) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    // this.id = Math.random().toString();
    // getProductsFromFile(products => {
    //   products.push(this);
    //   fs.writeFile(p, JSON.stringify(products), err => {
    //     console.log(err);
    //   });
    // });
    return db.execute(`insert into products (title, price, description, imageUrl)
                                   values ('${this.title}', ${this.price}, '${this.description}', '${this.imageUrl}');`)
  }

  static update(product) {
    // fs.writeFile(p, JSON.stringify(products), err => {
    //   if (err){
    //     console.log(err);
    //   }
    // });
    return db.execute(`update products set title = '${product.title}', 
                                           price = ${product.price}, 
                                           description = '${product.description}',
                                           imageUrl = '${product.imageUrl}'
                                       where id = ${product.id}  `);
  }

  static deletebyid(id) {
    // Product.fetchAll(products => {
    //   const existingproductindex = products.findIndex(prod => prod.id === id);
    //   products.splice(existingproductindex, 1);
    //   Product.update(products);
    //  })
    return db.execute(`DELETE FROM products WHERE id='${id}';`);
  }

  static fetchAll() {
    // getProductsFromFile(cb);
    return db.execute('SELECT * from products');
  }

  static findbyid(id){
    // getProductsFromFile(products => {
    //   const product = products.find(p => p.id === id);
    //   cb(product);
    // })
    return db.execute(`select * from products where id = ${id};`);
  }
};
