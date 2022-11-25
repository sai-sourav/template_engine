const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  // const product = new Product(title, imageUrl, description, price);
  // product.save().catch(err => {console.log("error saving product:",err)});
  Product.create({
    title: title,
    price: price,
    imageUrl: imageUrl,
    description: description
  }).catch(err => {
    console.log("error at saving:",err);
  })
  res.redirect('/');
};

exports.getEditProduct = (req, res, next) => {
  const editmode = req.query.edit;
  if (!editmode) {
    return res.redirect('/');
  }
  const prodid = req.params.productid;
  Product.findByPk(prodid).then((product) => {
    // if (!product[0]) {
    //   return res.redirect('/');
    // }
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing: editmode,
      product: product
    });
  })
};

exports.posteditproduct = (req, res, next) => {
    //  let prodid = req.body.id;
    //  Product.fetchAll(products => {
    //   const existingproductindex = products.findIndex(prod => prod.id === prodid);
    //   products[existingproductindex].title = req.body.title;
    //   products[existingproductindex].imageUrl = req.body.imageUrl;
    //   products[existingproductindex].price = req.body.price;
    //   products[existingproductindex].description = req.body.description;
    //   Product.update(products);
    //  })
    const prodId = req.body.id;
    const updatedTitle = req.body.title;
    const updatedPrice = req.body.price;
    const updatedImageUrl = req.body.imageUrl;
    const updatedDesc = req.body.description;
    Product.findByPk(prodId)
    .then(product => {
    //   console.log(product);
    // })
      product.title = updatedTitle,
      product.price = updatedPrice,
      product.imageUrl = updatedImageUrl,
      product.description = updatedDesc
      return product.save();
    }).then(result => {
      console.log("updated successfully");
    }).catch(err => console.log("error in saving:",err));
    // Product.update(req.body).catch(err => {console.log("update failed:",err)});
    res.redirect('/admin/products');
}

exports.deleteproduct = (req,res,next) => {
  const prodid = req.params.productid;
  // Product.deletebyid(prodid).catch(err => {console.log("error at deletion:",err)});
  Product.findByPk(prodid)
    .then(product => {
      return product.destroy();
    }).then(result => {
      console.log("deleted successfully");
      res.redirect('/admin/products');
    }).catch(err => console.log("error in deleting:",err));
}

exports.getProducts = (req, res, next) => {
  Product.findAll()
  .then(products => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  })
  .catch(err => {
    console.log("error at get all data:",err);
  })
  // Product.fetchAll().then(products => {
  //   res.render('admin/products', {
  //     prods: products[0],
  //     pageTitle: 'Admin Products',
  //     path: '/admin/products'
  //   });
  // });
};
