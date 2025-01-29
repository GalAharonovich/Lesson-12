import Express, { query } from "express"
import cors from "cors"

const app = Express()
app.use(Express.json())

app.use(cors({
    origin: "*"
}))

import mongoose from "mongoose"

mongoose.connect("mongodb+srv://galronov:0i6PeHYkOlWh4RYs@cluster0.oipij.mongodb.net/sv-test")
    .then(() => {
        console.log("mongodb is connected..")
    })
    .catch(error => {
        console.log(error)
    })

const employeeSchema = new mongoose.Schema({
    name: String,
    class: String,
    age: String,
    salary: String
})

const emplpyeeModel = mongoose.model("newusers", employeeSchema)


app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});


app.post('/signup', async (req, res) => {
    const data = req.body
    console.log(data)
    const addUser = await emplpyeeModel.create({
        name: req.body.name,
        class: req.body.class,
        age: req.body.age,
        salary: req.body.salary
    });
    console.log("user created..")
    res.send("ok")
});


app.post('/delete-users', async (req, res) => {
    const filter = req.body
    const result = await emplpyeeModel.find({ "age": { "$gte": req.body.age } }).deleteMany()
    console.log("user deleted..")
    res.send(result);
});


app.put("/update-class", async (req, res) => {
    const changes = req.body
    const updatedUser = await emplpyeeModel.updateMany(
        { class: changes.class },
        { $set: { class: changes.newClass } }
    )
    console.log("updated..")
    res.send(changes)
})