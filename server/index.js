const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');

const foodModel = require('./models/Food');


app.use(express.json());
app.use(cors());


mongoose.connect("mongodb+srv://irfan123:irfan@crud.6i2or.mongodb.net/food?retryWrites=true&w=majority",
    {
        useNewUrlParser: true
    }
);


app.post("/insert", async (req, res) => {
    const foodName = req.body.foodName;
    const days = req.body.days;
    const food = new foodModel({ foodName: foodName, sinceIAteIt: days });
    try {
        await food.save();
        res.send("Inserted Data");
    }
    catch (err) {
        console.log(err);
    }
})

app.put("/update", async (req, res) => {
    const newfoodName = req.body.newFoodName;
    const id = req.body.id;
    try {
        await foodModel.findById(id, (err, updatedFood) => {
            updatedFood.foodName = newfoodName;
            updatedFood.save();
            res.send("FoodName Updated!")
        })
    }
    catch (err) {
        console.log(err);
    }
})

app.delete("/delete/:id", async (req, res) => {
    const id = req.params.id;
    await foodModel.findByIdAndRemove(id).exec();
    res.send("Food Deleted!")
})

app.get("/read", async (req, res) => {
    foodModel.find({}, (err, result) => {
        if (err) {
            res.send(err)
        }
        res.send(result);
    });
});

app.listen(3001, '0.0.0.0', () => {
    console.log("Server is running at port 3001")
});
