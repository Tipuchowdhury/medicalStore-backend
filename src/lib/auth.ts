import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
// If your Prisma file is located elsewhere, you can change the path
import { prisma } from "./prisma";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use true for port 465, false for port 587
  auth: {
    user: process.env.APP_NAME,
    pass: process.env.APP_PASS,
  },
});

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql", // or "mysql", "postgresql", ...etc
  }),
  trustedOrigins: [process.env.APP_URL!],
  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "CUSTOMER",
        required: false,
      },
      phone: {
        type: "string",
        required: false,
      },
      status: {
        type: "string",
        required: false,
        defaultValue: "ACTIVE",
      },
    },
  },
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    requireEmailVerification: true,
  },

  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url, token }, request) => {
      try {
        const verificationUrl = `${process.env.APP_URL}/verify-email?token=${token}`;
        const info = await transporter.sendMail({
          from: '"MediStore" <maddison53@ethereal.email>',
          to: user.email!,
          subject: "MediStore - Verify your email address",
          html: `<!DOCTYPE html>
        <html lang="en">
        <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Verify Your Email</title>
        </head>
        <body style="margin:0; padding:0; background-color:#f4f6f8; font-family:Arial, Helvetica, sans-serif;">
         <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center" style="padding:40px 0;">
          <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:8px; overflow:hidden;">
            
            <!-- Header -->
            <tr>
              <td style="padding:24px; background:#111827; color:#ffffff; text-align:center;">
                <h1 style="margin:0; font-size:22px;">MediStore</h1>
              </td>
            </tr>

            <!-- Content -->
            <tr>
              <td style="padding:32px; color:#333333;">
                <h2 style="margin-top:0;">Verify your email address</h2>
                <p style="font-size:15px; line-height:1.6;">
                  Thanks for signing up! Please confirm your email address by clicking the button below.
                </p>

                <div style="text-align:center; margin:32px 0;">
                  <a
                    href="${verificationUrl}"
                    style="
                      background:#2563eb;
                      color:#ffffff;
                      padding:12px 24px;
                      text-decoration:none;
                      border-radius:6px;
                      font-weight:600;
                      display:inline-block;
                    "
                  >
                    Verify Email
                  </a>
                </div>

                <p style="font-size:14px; color:#6b7280;">
                  If you didn’t create an account, you can safely ignore this email.
                </p>

                <p style="font-size:14px; color:#6b7280;">
                  This link will expire in a short time for security reasons.
                </p>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="padding:16px; background:#f9fafb; text-align:center; font-size:12px; color:#9ca3af;">
                © 2026 MediStore. All rights reserved.
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`, // HTML version of the message
        });
      } catch (error) {
        throw new Error("Failed to send verification email");
      }
    },
  },
});
