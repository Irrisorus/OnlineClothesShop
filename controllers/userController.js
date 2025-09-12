const {products}=require('../data/shop');
const { users,validateCredentials,findUserInSession,countCartSumForUser,clearUsersShoppingCart} = require('../data/users');
const {loadData,updateData}=require('../data/FileManager')
const templateMailer = require("../utils/EmailService/templateMailer");

const addToCart=(req,res)=>{
    const{}=req.body
}


const checkUser=(req,res)=>{
  
    
    if(req.session.auth==true){
        return res.json({path:"/brandhouse/personalAccount"})
    }
    else{
        return res.status(404)
                  .json({message:"not authorized"})
                  
    }

}

const userLog=(req,res)=>{
    const{userEmail,password}=req.body;
    if (validateCredentials(userEmail, password)){
        let code=Math.floor(100000 + Math.random() * 900000).toString()
        templateMailer.sendVerif({to:userEmail, num:code})
        req.session.code=code;
    
        
        res.status(200).json({path:`http://localhost:3000/brandhouse/verification?userEmail=${userEmail}`})

    
    }
    else{
        return res
        .status(404)
        .json({ message: "неправильный пароль или почта" });
    }

    
}

const checkCode=(req,res)=>{
    const{usercode,userEmail}=req.body
    
    
    if (req.session.code==usercode) {
        req.session.auth = true;
        req.session.userEmail = userEmail;
       if (userEmail=="admin@gmail.com") {
            return res.json({path:"http://localhost:3000/admin/adminCatalog",redir:true})
            
       }
       

        let index=users.indexOf(users.find((user) => user.email === req.session.userEmail))
      
        
        if (users[index].cart) {
           
            if (req.session.cart) {
                users[index].cart=[...users[index].cart,...req.session.cart]
            }
           

            
        }else{
          
            
            if (req.session.cart) {
                users[index].cart=req.session.cart
            }
            else{
                users[index].cart=[]
            }
           
        }

       
        updateData(users,"users")
      
        return res.json({path:"http://localhost:3000/brandhouse/catalog"}) 
    }else
    {
 
         res.status(404).json()
    }
}




const newUser=(req,res)=>{
    const{userEmail,password}=req.body;
    if(validateCredentials(userEmail, password)){

        return res
        .status(404)
        .json({ message: "Такой пользователь уже существует" });
    }else{
        let obj={
            email:userEmail,
            password:password
        }
        users.push(obj)
        
        
    
        req.session.auth = true;
        req.session.userEmail = userEmail;

        let index=users.indexOf(users.find((user) => user.email === req.session.userEmail))
       
        if (users[index].cart) {
            if (req.session.cart) {
                users[index].cart=[...users[index].cart,...req.session.cart]
            }
        }else{
            if (req.session.cart) {
                users[index].cart=req.session.cart
            }
            else{
                users[index].cart=[]
            }
           
        }
        updateData(users,"users")
        return res.status(200)
                .json({path:"/brandhouse/catalog"}) 
    }
    
}

const logOut=(req,res)=>{
    req.session.auth = false;
    req.session.userEmail=undefined;
    req.session.cart=undefined;
    req.session.destroy();
    res.status(200).json();
}

const updateInfo=(req,res)=>{
    const{name,adress,phoneNumber,password}=req.body;
    if(validateCredentials(req.session.userEmail,password)){
        let changedUserIndex=users.indexOf(users.find((user) => user.email === req.session.userEmail))
        users[changedUserIndex].name=name
        users[changedUserIndex].adress=adress
        users[changedUserIndex].phoneNumber=phoneNumber
        updateData(users,"users")
        res.status(200).json()
    }
    else{
        res.status(404).json()
    }
}

const confirmOrder=(req,res)=>{
    const{name,adress,email,number}=req.body

    
    
    let orderStr="";
    if (req.session.auth==true) {
        let localUser=findUserInSession(req.session.userEmail)
        let sum=countCartSumForUser(localUser.cart)
      
        orderStr=`Ваш заказ на сумму ${sum} BYN оформлен. В скором времени с вами свяжуться по номеру ${number} для уточнения деталей заказа. Всего наилучшего, ${name}`
        clearUsersShoppingCart(localUser);
    }
    else{
       
        
        let sum=countCartSumForUser(req.session.cart)
       
        
        orderStr=`Ваш заказ на сумму ${sum} BYN оформлен. В скором времени с вами свяжуться по номеру ${number} для уточнения деталей заказа. Всего наилучшего, ${name}`
    }
    req.session.cart=[];

    templateMailer.sendVerif({to:email, num:orderStr})

    res.status(200).json()
    
}

const resendCode=(req,res)=>{
    const {userEmail}=req.body
    templateMailer.sendVerif({to:userEmail, num:req.session.code})
}


module.exports={userLog,newUser,addToCart,checkUser,logOut,updateInfo,confirmOrder,checkCode,
    resendCode
}