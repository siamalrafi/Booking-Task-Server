const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());

// apply_task
// Oe3esUQeQGDmhkJs


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://apply_task:Oe3esUQeQGDmhkJs@cluster0.ksaovkw.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


// const seatCollection = client.db("apply_task").collection("seats");
// const boookseat = client.db("apply_task").collection("bookSeat");



const availableSeats = client.db("apply_task").collection("seats");
const boookseat = client.db("apply_task").collection("bookSeat");
// create a route to get all the data from the database

const run = () => {
    // api for available seats
    app.get('/availableSeats', async (req, res) => {
        const cursor = availableSeats.find({});
        const result = await cursor.toArray();
        res.send(result);
    })
    // api for booked seats
    app.post('/bookSeat', async (req, res) => {
        const seat = req.body;
        const id = seat.bookId;
        const findBooked = await boookseat.findOne({ bookId: id });
        if (findBooked) {
            return res.status(403).send({ message: "This seat is already booked" })
        }
        else {
            // const updatingBooked = await availableSeats.updateOne({ _id: ObjectId(id) }, { $set: { book: "true" } })
            const result = await boookseat.insertOne(seat);
            console.log(result);
            res.send(result);
        }

    })

}
run()







app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})