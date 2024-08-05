import express,{Request,Response} from 'express';
import bodyParser from 'body-parser'
import WebSocket, { WebSocketServer } from 'ws';


const app = express();
app.use(express.json())
app.use(bodyParser.json({limit:'35mb'}))
let group:{id:Number,ws:WebSocket}[]=[]
let id=0;

app.get('/',(req,res)=>{
  res.send('ehllo');
})

const h_server=app.listen(3000);
const wss=new WebSocketServer({server:h_server},{})
wss.on('connection',function connection(ws){
    group.push({'id':++id,ws})
    console.log(group)
  ws.on('message',function message(data){
    const parsed_data=JSON.parse(data);
    const sender=group.find(g=> g.id===parsed_data.to);
    if(sender){
      console.log("sender ye h",sender);
      const passing=JSON.stringify(parsed_data);
      sender.ws.send(passing,{},()=>{});
    }
  })
  ws.on('error', (err) => console.log('error:', err));
})
