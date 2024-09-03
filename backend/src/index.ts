import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign } from "hono/jwt";
import { userRoute } from './routes/user';
import { blogRoute } from './routes/blog';
import { messageRoute } from "./routes/message";
import { cors } from 'hono/cors';

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

// Configure CORS with a specific origin
app.use('/*', cors({
  origin: 'https://your-allowed-origin.com', // Replace with your allowed origin URL
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization']
}));

app.route("/user", userRoute);
app.route("/blog", blogRoute);
app.route("/sedium", messageRoute);

export default app;