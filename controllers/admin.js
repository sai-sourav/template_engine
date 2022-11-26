const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
  });
};

exports.postAddProduct = (req, res, next) => {
  console.log(req.body);
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  // const product = new Product(title, imageUrl, description, price);
  // product.save().catch(err => {console.log("error saving product:",err)});
  req.user.createProduct({
    title: title,
    price: price,
    imageUrl: imageUrl,
    description: description
  })
  // Product.create({
  //   title: title,
  //   price: price,
  //   imageUrl: imageUrl,
  //   description: description
  // })
  .then(result => {
    res.redirect('/admin/products');
  })
  .catch(err => {
    console.log("error at saving:",err);
  })
  
};

exports.getEditProduct = (req, res, next) => {
  const editmode = req.query.edit;
  if (!editmode) {
    return res.redirect('/');
  }
  const prodid = req.params.productid;
  req.user.getProducts({ where: {id : prodid} })
  // Product.findByPk(prodid)
  .then((products) => {
    const product = products[0];
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing: editmode,
      product: product
    });
  })
};

exports.posteditproduct = (req, res, next) => {
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
  req.user.getProducts()
  // Product.findAll()
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
