import bcrypt from 'bcryptjs';
const users =[

    {
        name:"Admin User",
        email:"admin@example.com",
        password: bcrypt.hashSync('123456',10),
        isAdmin:true
    },
    {
        name:"Tejas",
        email:"tejas@example.com",
        password: bcrypt.hashSync('123456',10)
    },
    {
        name:"Tanu",
        email:"tanu@example.com",
        password: bcrypt.hashSync('123456',10)
    }
]


export default users