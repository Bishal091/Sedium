import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign } from "hono/jwt";
import { verify } from "hono/utils/jwt/jwt";
import { createBlogInput, updateBlogInput } from "@boss109/sedium-common";

export const blogRoute = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  },
  Variables: {
    userId: any; // added so that set can get the type of userId key
  };
}>();

// MIDDLEWARE
// In middleware we can set any value that can be used using set, and can be used in the route using get
const authMiddleware = async (c: any, next: any) => {
  const authHeader = c.req.header("authorization") || "";
  try {
    const user = await verify(authHeader, c.env.JWT_SECRET);
    if (user) {
      console.log("User:", user);
      console.log("User:", user.id);
      c.set("userId", user.id);
      
      await next();
    } else {
      c.status(403);
      return c.json({
        message: "Not Logged IN"
      });
    }
  } catch (e) {
    console.error("Authentication error:", e);
    c.status(403);
    return c.json({
      message: "Not Logged IN"
    });
  }
};


// c stands for context which has, req, res + ...

blogRoute.post("/create", authMiddleware, async (c: any) => {
  const body = await c.req.json();
  const authorId = c.get("userId");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const { success } = createBlogInput.safeParse(body);

  if (!success) {
    c.status(411);
    return c.json({ message: 'Invalid Inputs' });
  }

  const post = await prisma.post.create({
    data: {
      title: body.title,
      content: body.content,
      authorId: authorId,
    },
  });

  return c.json({ id: post.id });
});

blogRoute.put("/edit", authMiddleware, async (c: any) => {
  const body = await c.req.json();
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const { success } = updateBlogInput.safeParse(body);

  if (!success) {
    c.status(411);
    return c.json({ message: 'Invalid Inputs' });
  }

  const post = await prisma.post.update({
    where: {
      id: body.id,
    },
    data: {
      title: body.title,
      content: body.content,
    },
  });

  return c.json({ id: post.id });
});

blogRoute.get("/all", async (c: any) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const blogs = await prisma.post.findMany({
    select: {
      content: true,
      title: true,
      id: true,
      author: {
        select: {
          username: true
        }
      },
      date: true,
    }
  });
  console.log("Blogs fetched:", blogs);
  return c.json({
    blogs
  });
});

blogRoute.get("/myblogs", authMiddleware, async (c: any) => {
  const userId = c.get("userId");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  console.log("Fetching blogs for user:", userId);
  try {
    console.log("Fetching blogs for user:", userId);
    const blogs = await prisma.post.findMany({
      where: {
        authorId: userId,
      },
      select: {
        content: true,
        title: true,
        id: true,
        date: true,
      }
    });
    console.log("Blogs fetched:", blogs);
    return c.json({ blogs });
  } catch (e) {
    console.error("Error fetching blogs:", e);
    c.status(500);
    return c.json({ message: "Error while fetching blogs" });
  }
});

blogRoute.get("/:id", authMiddleware, async (c: any) => {
  const id = c.req.param("id");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const post = await prisma.post.findFirst({
      where: {
        id: id,
      },
      select: {
        content: true,
        title: true,
        id: true,
        author: {
          select: {
            username: true
          }
        },
        date: true,
      }
    });

    return c.json({ post });
  } catch (e) {
    c.status(411);
    return c.text("Error while fetching");
  }
});
