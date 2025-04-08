import express from 'express'; 

const app = express();

app.use(express.json())

const port :number  = 3000;

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, ()=>{
    console.log("listening on port", port);
})

