import app from "./app";
import { prisma } from "./lib/prisma";

const PORT = process.env.PORT || 5000;
const main = async () => {
  try {
    await prisma.$connect();
    app.listen(PORT, () => {
      console.log("Server is running on PORT:", PORT);
    });
    console.log("Connected to the database successfully");
  } catch (error) {
    console.log("Error occures:", error);
    await prisma.$disconnect();
    process.exit(1);
  }
};
main();
