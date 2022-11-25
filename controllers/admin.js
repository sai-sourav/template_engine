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
  const product = new Product(title, imageUrl, description, price);
  product.save().catch(err => {console.log("error saving product:",err)});
  res.redirect('/');
};

exports.getEditProduct = (req, res, next) => {
  const editmode = req.query.edit;
  if (!editmode) {
    return res.redirect('/');
  }
  const prodid = req.params.productid;
  Product.findbyid(prodid).then(([product,metadata]) => {
    // if (!product[0]) {
    //   return res.redirect('/');
    // }
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing: editmode,
      product: product[0]
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
    Product.update(req.body).catch(err => {console.log("update failed:",err)});
    res.redirect('/admin/products');
}

exports.deleteproduct = (req,res,next) => {
  const prodid = req.params.productid;
  Product.deletebyid(prodid).catch(err => {console.log("error at deletion:",err)});
  res.redirect('/admin/products');
}

exports.getProducts = (req, res, next) => {
  Product.fetchAll().then(products => {
    res.render('admin/products', {
      prods: products[0],
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  });
};
