import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'

const app = new Hono()

app.post('/api/v1/signup',(c) =>{
  const prisma = new PrismaClient({
    datasourceUrl: env.DATABASE_URL,
  }).$extends(withAccelerate())
  
  return c.text('Sign up successful')
})

app.post('/api/v1/signin', (c) => {
  return c.text('Sign-in Successful')
})

app.post('/api/v1/blog',(c) => {
  return c.text('Blog Created Successfully!')
})

app.put('/api/v1/blog',(c) => {
  return c.text("Updated the contents of the blog")
})
app.get('/api/v1/blog/:id', (c) => {
  const blog_Id = c.req.param('id')
  return c.text('blog')
})

export default app
