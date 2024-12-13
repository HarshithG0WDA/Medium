import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { sign } from "hono/jwt";
import { signupInput, signinInput } from "@100xharshith/medium-common";
// Define the interface for request bodies
interface AuthBody {
    email: string;
    password: string;
}

export const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    }
}>();

userRouter.post('/signup', async (c) => {
  const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const {success} = signupInput.safeParse(body)
  if(!success) {
    c.status(411)
    c.json({
        message : "Inputs are not correct"
    })
  }

  // Ensure all required fields are provided
  if (!body.email || !body.password || !body.name) {
      return c.json({ error: "All fields (email, password, name) are required" }, 400);
  }

  try{
    
      const user = await prisma.user.create({
          data: {
              email: body.email,
              password: body.password,
              name: body.name, 
          },
      });
    
      const token = await sign({ id: user.id }, c.env.JWT_SECRET);
    
      return c.json({
          jwt: token,
          message : "Sign-up Successful",
      });
  }
  catch(e){
    c.status(411)
    console.log(e)
    return c.text("Invalid credentials")

  }
});

userRouter.post('/signin', async (c) => {
  const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const {success} = signinInput.safeParse(body)
  if(!success) {
    c.status(411)
    c.json({
        message : "Inputs are not correct"
    })
  }


  // Ensure email and password are provided
  if (!body.email || !body.password) {
      return c.json({ error: "Email and password are required" }, 400);
  }

  // Find user with matching email and password
  try{

      const user = await prisma.user.findFirst({
          where: {
              email: body.email,
              password: body.password, // This is for demonstration; hashing should be used for security.
          },
      });
    
      if (!user) {
          return c.json({ error: "Invalid email or password" }, 403);
      }
    
      const token = await sign({ id: user.id }, c.env.JWT_SECRET);
    
      return c.json({
        
          jwt: token,
          message : "Successfully Signed-In",
      });
  }
  catch(e){
    c.status(403);
    return c.text("Invalid credentials/Something went wrong")

  }
});