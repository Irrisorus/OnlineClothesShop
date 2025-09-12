const {products,FilterBy,getProductByArticle}=require('../data/shop');
const { users} = require('../data/users');
const {loadData,updateData}=require('../data/FileManager')

const getCatalog=(req,res)=>{
    const{sex,brand,type,title}=req.query;
    if (!sex & !brand & !type & !title) {
      res.render("adminCatalog.hbs", {products});
    }
    else{
      let products=FilterBy(sex,brand,type,title);
      res.render("adminCatalog.hbs", {products});
    }
}

const getCard=(req,res)=>{
  const{article}=req.query
  let product=getProductByArticle(article);

  product.edit=true
  res.render("adminCard.hbs",product)
}


const   changeProduct=(req,res)=>{
 const {article,availableAmount}=req.body
  let product=getProductByArticle(article);

  for (let key in req.body) {
    if ((req.body).hasOwnProperty(key)) {
        
        
        product[key] = req.body[key];
    }
  }

  
  for (let obj of product.availableAmount) {
    if(obj.amount>0){
      product.outOfstock=false;
      break;
    }
  }

  updateData(products,"productsData")

  res.status(200).json();
}


const getCreationCard=(req,res)=>{
    res.render("adminCard.hbs",{new:true})
}

const createProduct=(req,res)=>{
  let product=req.body

  let key=true;
  for (let obj of product.availableAmount) {
    if(obj.amount>0){
      key=false;
      break;
    }
  }
  if (key) {
    product.outOfstock=true;
  }
  else{
    product.outOfstock=false; 
  }

  products.push(product)
  updateData(products,"productsData")
  
  res.status(200).json();
}

const deleteProduct=(req,res)=>{
  const {article}=req.query
  let index=products.findIndex(obj=>obj.article==article)
  products.splice(index,1)
  updateData(products,"productsData")
  
  res.status(200).json();

}
module.exports={getCatalog,getCard,changeProduct,getCreationCard,createProduct,deleteProduct}