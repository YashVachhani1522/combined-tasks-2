const jwt=require('jsonwebtoken');


const checkToken=(req,res,next)=>{
    if(req.cookies.token!=undefined)
    {
        var token=req.cookies.token
        console.log(req.cookies)
        const decode=jwt.verify(token,process.env.SECRET_KEY)
        console.log(decode)
        if(decode.id!="")
        {
            next()
        }
    }
    else
    {
        res.render("main-login-project/login.ejs")
    }
      
}

module.exports=checkToken