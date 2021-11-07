import jwt from 'jsonwebtoken'


const generateToken=(id)=>{

    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn: "30min"
    })
}


export default generateToken;