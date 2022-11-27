const sequelize = require('../util/database');

const Sequelize = require('sequelize');

const Cart = sequelize.define('cart',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

});

module.exports = Cart;









// const fs = require('fs');
// const path = require('path');
// const rootdir = require('../util/path'); 
// const p = path.join(rootdir,'data','cart');



// module.exports = class Cart{
//     static addproduct(id,productprice) {
//         // fetch the previous cart
//         fs.readFile(p, (err,filecontent) =>{
//             let cart = {products: [], totalprice: 0}
//             if (!err){
//                 cart = JSON.parse(filecontent);
//             }
//             // analyze the cart => find existing product
//             const existingproductindex = cart.products.findIndex(prod => prod.id === id);
//             const existingproduct = cart.products[existingproductindex];
//             let updatedproduct;
//             // addnew product / increase quantity
//             if (existingproduct) {
//                 updatedproduct = { ...existingproduct };
//                 updatedproduct.qty = updatedproduct.qty + 1;
//                 cart.products = [...cart.products];
//                 cart.products[existingproductindex] = updatedproduct;
//             } else {
//                 updatedproduct = {id: id, qty: 1};
//                 cart.products = [...cart.products, updatedproduct];
//             }
//             cart.totalprice = cart.totalprice + +productprice;
//             fs.writeFile(p, (JSON.stringify(cart)), err =>{
//                 if (err){
//                     console.log(err);
//                 }   
//             })
//         })

//     }
// }