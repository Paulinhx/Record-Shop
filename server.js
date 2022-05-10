import express from 'express'
import cors from  'cors'
import logger from "morgan"

//DB-------------------
//lowdb
import { join, dirname } from 'path'
import { Low, JSONFile } from 'lowdb'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url));


//Use JSON file for storage
const file = join(__dirname, "db.json");

const adapter = new JSONFile(file);
const db = new Low(adapter);
await db.read();
db.data ||= { records: [] };

const app = express()
const port = process.env.PORT || 5000
app.use (express.json())


app.get('/get', (req, res, next)=>{
    const { records } = db.data
    res.status(200).send(records)
})

app.post('/post', async (req, res, next)=>{
    const { records } = db.data
    records.push(req.body.test)
    await db.write();
    res.status(200).send(records)
})





app.listen(port, ()=>{
    console.log("listening on port" + port);
});