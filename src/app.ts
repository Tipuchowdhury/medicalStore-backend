import express from "express";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import cors from "cors";
import { authRouter } from "./modules/auth/auth.route";
import { medicineRouter } from "./modules/medicine/medicine.route";
import { categoryRouter } from "./modules/category/category.route";
import { orderRouter } from "./modules/order/order.router";
// import errorHandler from "./middleware/globalErrorHandler";
// import { notFound } from "./middleware/notFound";

const app = express();

app.use(
  cors({
    origin: process.env.APP_URL,
    credentials: true,
  }),
);

app.all("/api/auth/*splat", toNodeHandler(auth));

app.use(express.json());

//auth router
app.use("/api/v1/auth", authRouter);

//medicine router
app.use("/api/v1/medicine", medicineRouter);

//category router
app.use("/api/v1/category", categoryRouter);

//order router
app.use("/api/v1/order", orderRouter);

app.get("/", (reg, res) => {
  res.send("Hello world");
});
// app.use(notFound);
// app.use(errorHandler);
export default app;
