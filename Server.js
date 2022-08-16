import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import { Client } from "square";
import userRoutes from "./routes/userRoutes.js";
import { errorHandler, notFound } from "./models/middleWare/errorMiddleWare.js";
import uuid from 'uuid-random';

const app = express();
dotenv.config();
connectDB();

const PORT = process.env.PORT || 6000;
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/api/notes", (req, res) => {
  res.send(notes);
});

app.get("/api/notes/:id", (req, res) => {
  const note = notes.find((n) => n._id === req.params.id);
  res.send(note);
});
const { paymentsApi } = new Client({
  accessToken: "EAAAEDTh_NFOSKtlKC9emzZRNJrGreuBq-0hQQw027yhC6qQ4RZtKWv6HSC7czFi",
  environment: "sandbox",
});
app.post("/process-payment", async (req, res) => {
  if(req.method === 'POST'){
    const {result} = await paymentsApi.createPayment({
      idempotencyKey:uuid(),
      sourceId:req.body.sourceId,
      amountMoney:{
        currency:'USD',
        amount:200
      }

    })

    console.log(result);
    res.status(200).json(result)
  }
  else{
    res.status(500).send({message:"error"});
  }
});

app.use("/api/users", userRoutes);
app.use(notFound);
app.use(errorHandler);
app.listen(PORT, console.log(`app listen on PORT ${PORT}`));
