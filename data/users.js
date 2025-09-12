const {loadData,updateData}=require('./FileManager')
let users =JSON.parse(loadData("users"));

const validateCredentials = (userEmail, password) => {
    const user = users.find((user) => user.email === userEmail);
    return user && user.password === password;
  };

function findUserInSession(userEmail) {
  const user= users.find((user)=>user.email===userEmail);
  return user;
}
function clearUsersShoppingCart(user) {
  user.cart=[],
  updateData(users,"users")
}

function countCartSumForUser(cart) {
  let sum=0;
  cart.forEach(obj => {
    sum+=obj.amount*obj.price;
  });
  
  return sum;
}

module.exports={
    users,validateCredentials,findUserInSession,clearUsersShoppingCart,countCartSumForUser
}