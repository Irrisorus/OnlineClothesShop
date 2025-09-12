userBnt=document.querySelector("#user")
console.log(userBnt);

userBnt.addEventListener("click",()=>{
    console.log("aa");
    
    checkUser();
})



async function checkUser(){
   
    const response = await fetch("/brandhouse/checkUser", {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
         },
         body:JSON.stringify({userCheck:true})
        })
        
        const data = await response.json();
    
        
         if (!response.ok) {
            console.log(" response is not ok");
            
            document.location="http://localhost:3000/brandhouse/logIn";
            return;
        }
        console.log(data.path);
        
        document.location.pathname = data.path;

}

