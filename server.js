

const Razorpay = require("razorpay")
const crypto = require("crypto");


const express = require("express")
const app = express();


// connecting the frontend with the backend
const path = require("path");
app.use(express.static(path.join(__dirname, './build')))


const razor = new Razorpay({
    key_id: '*************',
    key_secret: '**************'
});
app.use(express.urlencoded({ extended: true }));

app.use(express.json())

app.post("/checkout", async (req, res) => {
    console.log("req.body", req.body)
    const options = {

        amount: (+req.body.Price) * 100,
        currency: "INR"
    };
    try {
        const order = await razor.orders.create(options);
        console.log("order data: ", order);
        res.send(order);
    } catch (err) {
        console.log(err);
    }
})


app.post("/paymentVerification", async (req, res) => {
    console.log("body", req.body);
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const hmac = crypto.createHmac('sha256', key_secret);

    hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
    let generatedSignature = hmac.digest('hex');

    let isSignatureValid = (generatedSignature === razorpay_signature);

    res.send("Your Payment is Successfull");

})

app.get("/getkey", async (req, res) => {
    res.send({ key: "rzp_test_PynI3KMWv9teZO" })
})

// app.listen(process.env.PORT, ()=> console.log("Server is Running on ", process.env.PORT))

app.listen(4000, () => console.log("Server is running on port number: 4000",))



//  const checkout = require("./api/paymentapi")
//  app.use("/api", checkout)
