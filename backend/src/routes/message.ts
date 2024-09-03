import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign } from "hono/jwt";
import { messageInput } from "@boss109/sedium-common";

export const messageRoute = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

messageRoute.post("/message", async (c) => {
  const body = await c.req.json();
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const { success } = messageInput.safeParse(body);

  if (!success) {
    c.status(411);
    return c.json({ message: 'Invalid Inputs' });
  }

  try {
    const { username, email, content } = body;

    // Check if the user exists
    const userExists = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!userExists) {
      c.status(400);
      return c.json({ message: "Email address not found. Please enter a valid email." });
    }

    // Create a new message
    const newMessage = await prisma.messages.create({
      data: {
        content: content,
        senderId: userExists.id,
        username: username,
        email: email,
      },
    });

    if (newMessage) {
      c.status(200);
      return c.json({
        message: "Message sent successfully.",
        messageId: newMessage.id.toString(),
      });
    }
  } catch (error) {
    // Handle different types of errors
    if (error instanceof Error) {
      if (error.name === 'ValidationError') {
        c.status(400);
        return c.json({ message: `Validation error: ${error.message}` });
      } else if (error.name === 'PrismaClientKnownRequestError') {
        // Handle Prisma known request errors
        c.status(400);
        return c.json({ message: `Database error: ${error.message}` });
      } else {
        // General server error
        c.status(500);
        return c.json({ message: "Server error. Please try again later." });
      }
    } else {
      // Handle unknown error types
      c.status(500);
      return c.json({ message: "An unexpected error occurred." });
    }
  }
});