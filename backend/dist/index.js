var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from 'express';
import bodyParser from 'body-parser';
const app = express();
app.use(express.json());
app.use(bodyParser.json({ limit: '35mb' }));
// app.post('/signup',(req:Request,res:Response)=>{
//     const name=req.body;
//     const pass=req.body;
//     console.log(name,pass);
// })
app.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, password } = req.body;
    res.json({ name, password });
}));
app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});
