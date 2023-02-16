const conn = require(".././db_connection")
const bcrypt = require('bcrypt');
require('dotenv').config()
const jwt = require('jsonwebtoken');

const registration = async (req, resp) => {
        // check wheather the userName & Password Already Available or not 
        conn.query(`SELECT * FROM  users  WHERE NAME = ?`, [req.body.name], function (error, result) {
                if (error) {
                        console.log(error)
                }
                else {
                        if (result.length) {

                                return resp.send({
                                        "msg": "User Already Available ! Choose Another UserName "
                                })
                        }
                        else {
                                // if user not available then register 

                                req.body.password = bcrypt.hashSync(req.body.password, 10);
                                conn.query(`INSERT INTO users set ?   `, req.body, function (error, result) {
                                        if (error) {
                                                console.log(error)
                                        }
                                        else {
                                                return resp.send(
                                                        {
                                                                "msg": "Registration SuccessFully "
                                                            })
                                        }
                                });
                        }
                }
        });
}
const login = async (req,resp)=>{
       
    const email=req.body.email
    const password=req.body.password


    conn.query(`select * from  users where email = ?   `, email, function (error, result) {
        if (error) {
                console.log(error)
        }
        else {
           

           result.map( async (data,pos)=>{
          
     let verifypassword=   await bcrypt.compare(password, data.password) // true

    // console.log(verifypassword)
if(verifypassword){
      
        let jwtSecretKey = process.env.JWT_SECRET_KEY;
        const token = jwt.sign({
                ...data

        }, jwtSecretKey);
        resp.send({
                ...data,
                
                result:"login Succes ",
                token:token
        })


}else{
        resp.send({
                ...req.body,
                result:"Incorrect User Name Or Password"
        })

}



           })




        }
});   
}


let update =(req,resp)=>{

      const token =  req.headers.authentication ;
     
      if(!token ){
 return resp.send({
        Msg:"please login and provide token"})
      }

      jwt.verify(token, process.env.JWT_SECRET_KEY, (err, authData) => {
        if (err) {
          resp.send({ result: "no login ! Unauthorised Token" });
        } else {
        
        //       Autheticated User

       


        conn.query(`UPDATE   users SET  ?   WHERE ID = ? `, [req.body,authData.id], function (error, result) {
                if (error) {
                   return resp.send({
                        Msg:"Something Went Wrong "
                   })   
                }
                else {
                        return resp.send({
                                Msg:"Updated Succesfully "
                           }) 
                }
    
          });
    





        
        }
      });

}


module.exports={login ,registration ,update }