import express,{Request,Response} from 'express';
import bodyParser from 'body-parser'
import {PrismaClient} from '@prisma/client'
const prisma=new PrismaClient();



const app = express();
type Sign={
    user:string
}
app.use(express.json())
app.use(bodyParser.json({limit:'35mb'}))
// app.post('/signup',(req:Request,res:Response)=>{

//     const name=req.body;
//     const pass=req.body;
//     console.log(name,pass);
    
// })
app.get('/',async(req:Request,res:Response)=>{
    try{
      await prisma.$connect();
      const users = await prisma.user.findMany();
      console.log(users);
    } catch (error) {
      console.error('Error connecting to the database:', error);
    } finally {
      // Disconnect the client
      await prisma.$disconnect();
    }
  }
    const {name,password}=req.body;


    res.json({name,password});
});
app.listen(3000, () =>{
  console.log('Example app listening on port 3000!')
});