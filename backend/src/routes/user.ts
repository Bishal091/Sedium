import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign } from "hono/jwt";
import { signinInput, signupInput } from "@boss109/sedium-common";
import { verify } from "hono/jwt"; // Import verify function for JWT verification

export const userRoute = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

// Signup route
userRoute.post("/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const body = await c.req.json();
  const { success } = signupInput.safeParse(body);

  if (!success) {
    c.status(411);
    return c.json({ message: 'Invalid Inputs' });
  }
  try {
    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
        username: body.username
      },
    });
    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);

    return c.text(jwt);
  } catch {
    c.status(411);
    return c.text('Error');
  }
});

// Signin route
userRoute.post("/signin", async (c) => {
  const body = await c.req.json();
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const { success } = signinInput.safeParse(body);

  if (!success) {
    c.status(411);
    return c.json({ message: 'Invalid Inputs' });
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
        password: body.password,
      },
    });

    if (!user) {
      c.status(403);
      return c.json({ error: "User Does not exist" });
    }

    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);

    return c.json({ jwt, user });
  } catch {
    c.status(411);
    return c.text('Error');
  }
});

// User route to fetch user data
userRoute.get("/data", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const authHeader = c.req.header("Authorization");
    if (!authHeader) {
      c.status(401);
      return c.json({ message: 'Unauthorized' });
    }

    const token = authHeader
    
    // .split(" ")[1];
    const decoded = await verify(token, c.env.JWT_SECRET);

    if (!decoded || !decoded.id) {
      c.status(401);
      return c.json({ message: 'Unauthorized' });
    }

    const user = await prisma.user.findUnique({
      where: {
        id: String(decoded.id),
      },
    });

    if (!user) {
      c.status(404);
      return c.json({ message: 'User not found' });
    }

    return c.json({ user });
  } catch (error) {
    c.status(500);
    return c.json({ message: 'Internal Server Error' });
  }
});