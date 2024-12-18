import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";
import { createBlog, updateBlog } from "@100xharshith/medium-common";


export const blogRouter = new Hono<{
    Bindings : {
        DATABASE_URL : string, 
        JWT_SECRET : string ,
    },
    Variables : {
        userid : string
    }
}>();

blogRouter.use("/*", async (c, next) => {
    const jwt = c.req.header('authorization');
    if (!jwt) {
        c.status(401);
        return c.json({ error: "unauthorized" });
    }
    
    try {
        const token = jwt.split(" ")[1];

        const payload = await verify(token, c.env.JWT_SECRET);
        if (!payload) {
            c.status(401);
            return c.json({ error: "unauthorized" });
        }

        c.set('userid', payload.id as string);
        await next();
    } catch (error) {
        console.error("JWT Verification Error:", error);
        c.status(401);
        return c.json({ error: "unauthorized" });
    }
});



blogRouter.post('/', async(c) => {
    const userId = c.get('userid');
    const prisma = new PrismaClient({
        datasourceUrl : c.env.DATABASE_URL,
    }).$extends(withAccelerate());

   
    const body = await c.req.json();
    const {success} = createBlog.safeParse(body)
    if(!success) {
        c.status(411)
        c.json({
            message : "Inputs are not correct"
        })
    }
   try{

       const post = await prisma.post.create({
           data : {
               title : body.title,
               content : body.content,
               authorid : userId
           }
       });
       return c.json({
           id : post.id
       })
   }
   catch(e){
    console.log(e)
   }
} )


blogRouter.put("/", async(c) => {
    const userId = c.get('userid');
    const prisma = new PrismaClient({
        datasourceUrl : c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();
    const {success} = createBlog.safeParse(body)
    if(!success) {
        c.status(411)
        c.json({
            message : "Inputs are not correct"
        })
    }
    try {

        prisma.post.update({
            where : {
                id : body.id,
                authorid : body.userId
            },
            data : {
                title : body.title,
                content : body.content
            }
        });
        return c.text("Updated the Blog!!")
    }
    catch(e){
        return c.text("Something went wrong :( ")
    }
})

blogRouter.get("/bulk", async(c) => {
    const prisma = new PrismaClient({
        datasourceUrl : c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const posts = await prisma.post.findMany({
        select : {
            content : true,
            title : true,
            id : true,
            author : {
                select : {
                    name : true
                }
            },
        }
    });
    return c.json(posts)
})


blogRouter.get("/:id",async(c) => {
    const userId = c.get('userid');
    const prisma = new PrismaClient({
        datasourceUrl : c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const id = c.req.param('id')

    try{

        const post = await prisma.post.findUnique({
            where : {
                id : id,
            },
            select :{
                id : true,
                title: true,
                content : true,
                author : {
                    select : {
                        name : true
                    }
                }
            }
        });
    
        return c.json(post);
    }
    catch(e){
        c.status(411);
        return c.text("Something wrong occured!")
    }

})


