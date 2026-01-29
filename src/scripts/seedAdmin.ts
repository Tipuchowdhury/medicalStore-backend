import { prisma } from "../lib/prisma";
import { UserRole } from "../middleware/auth";

async function seedAdmin() {
  try {
    const adminData = {
      name: process.env.name,
      email: process.env.email,
      role: UserRole.ADMIN,
      password: process.env.password,
      emailVerified: process.env.emailVerified,
    };
    if (!adminData.email) {
      throw new Error("Email is missing");
    }
    const existingUser = await prisma.user.findUnique({
      where: {
        email: adminData.email,
      },
    });

    if (existingUser) {
      throw new Error("User already exists!!");
    }

    const signUpAdmin = await fetch(
      `${process.env.BETTER_AUTH_URL}/api/auth/sign-up/email`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Origin: `${process.env.APP_URL}`,
        },
        body: JSON.stringify(adminData),
      },
    );
    if (signUpAdmin.ok) {
      console.log("**** Admin created");
      await prisma.user.update({
        where: {
          email: adminData.email,
        },
        data: {
          emailVerified: true,
        },
      });
    }
  } catch (error) {
    console.error(error);
  }
}

seedAdmin();
