const fs = require('fs');
const path = require('path');

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'products.json'
);

const getProductsFromFile = cb => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  constructor(title, imageUrl, description, price) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    this.id = Math.random().toString();
    getProductsFromFile(products => {
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), err => {
        console.log(err);
      });
    });
  }

  static update(products) {
    fs.writeFile(p, JSON.stringify(products), err => {
      if (err){
        console.log(err);
      }
    });
  }

  static deletebyid(id) {
    Product.fetchAll(products => {
      const existingproductindex = products.findIndex(prod => prod.id === id);
      products.splice(existingproductindex, 1);
      Product.update(products);
     })
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }

  static findbyid(id, cb){
    getProductsFromFile(products => {
      const product = products.find(p => p.id === id);
      cb(product);
    })
  }
};
