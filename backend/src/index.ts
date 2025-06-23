import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { ContentModel, LinkModel, UserModel } from "./db";
import { authValidation } from "./zod";
import { userMiddleware } from "./middleware";
import { random } from "./utils";
import bcrypt from "bcrypt";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const JWT_PASSWORD = process.env.JWT_PASSWORD;
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;

if (!JWT_PASSWORD) {
  console.error("❌ JWT_PASSWORD is undefined. Check your .env file.");
  process.exit(1);
}

const app = express();
app.use(express.json());
app.use(cors())

  app.post('/api/v1/signup', async(req, res)=>{
    const username = req.body.username;
    const password = req.body.password;
    const parsePayload = authValidation.safeParse({username, password})

    if(!parsePayload.success){
        res.status(411).json({
            msg:"invalid input"
        })
    }

    try{
        const hashedPassword = await bcrypt.hash(password, 10);

         await UserModel.create({
            username: username,
            password: hashedPassword
         })
            
        res.json({
            msg: "User signed up"
        })

    }catch(e){
        res.status(411).json({
            msg: "user already exists"
        })
    }
  })

 app.post('/api/v1/signin', async (req, res) => {
  const username: string = req.body.username;
  const password: string = req.body.password;

  const userExist = await UserModel.findOne({ username });

  if (userExist && userExist.password) {
    const passwordMatch = await bcrypt.compare(password, userExist.password);

    if (!passwordMatch) {
       res.status(403).json({
        msg: "Incorrect password"
      });
    }

    const token = jwt.sign(
      { id: userExist._id },
      JWT_PASSWORD,
      { expiresIn: "1h" }
    );

    res.json({ token });
  } else {
    res.status(403).json({
      msg: "User doesn't exist"
    });
  }
});

  app.post('/api/v1/content', userMiddleware, async(req, res)=>{
    const link = req.body.link;
    const type = req.body.type;
    const title = req.body.title;
    await ContentModel.create({
        link,
        type,
        title,
        //@ts-ignore
        userId: req.userId,
        tags: []
    })

      res.json({
        msg: "Content added"
    })
 })

   app.get('/api/v1/content', userMiddleware, async(req, res)=>{
    //@ts-ignore
    const userId = req.userId;
    const content  = await ContentModel.find({
        userId:userId
    }).populate("userId", "username")
    res.json({
        content
    })
 })

 
   app.delete('/api/v1/content', userMiddleware, async(req, res)=>{
    const { id } = req.body;;
    await ContentModel.deleteOne({
        _id: id,

        //@ts-ignore
        userId: req.userId
    })

    res.json({
        msg:"successfully deleted"
    })
  
 })

   app.post('/api/v1/brain/share', userMiddleware, async (req, res)=>{
    const share = req.body.share;

    if(share){
       const existingLink = await LinkModel.findOne({
            //@ts-ignore
             userId: req.userId, 
       })  

       if(existingLink){
            res.json({
                hash: existingLink.hash
            })
            return;
       }
       const hash = random(10)
       await LinkModel.create({
            //@ts-ignore
            userId: req.userId,
            hash: hash
        })

        res.json({
            msg: "/share/" + hash
        })
    } else{
        await LinkModel.deleteOne({
            //@ts-ignore
            userId: req.userId
        })

        res.json({
            msg:"Removed link"
        })
    }

    
 })

    app.get('/api/v1/brain/:shareLink', async(req, res)=>{
        const hash = req.params.shareLink;

        const link = await LinkModel.findOne({
            hash
        })
        
        if(!link){
            res.status(411).json({
                msg: "Sorry incorrect input"
            })
            return;
        } 
        const content =  await ContentModel.find({
            userId: link.userId
        })

        const user = await UserModel.findOne({
            _id: link.userId
        })

        if(!user){
            res.status(411).json({
                msg: "user not found"
            })
            return;
        }

        res.json({
            username: user.username,
            content: content
        })
        




        
 })

 

app.listen(PORT, ()=>{
    console.log(`Server running on http://localhost: ${PORT}`)
})