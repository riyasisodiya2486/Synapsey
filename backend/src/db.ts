import mongoose, { model, Schema } from "mongoose";
require("dotenv").config();

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("❌ MONGO_URI is undefined. Check your .env file.");
  process.exit(1);
}

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

const UserSchema = new Schema({
    username: {type: String, unique: true},
    password: String
})


const ContentSchema = new Schema({
    title: String,
    link: String,
    tags: [{type: mongoose.Types.ObjectId, ref: 'Tag'}],
    type: String,
    userId: {type: mongoose.Types.ObjectId, ref: 'Users', required: true}
})

const LinkSchema = new Schema({
    hash: String,
    userId: {type: mongoose.Types.ObjectId, ref: 'Users', required: true,
        unique: true
    }
})

export const UserModel = model("Users", UserSchema);
export const ContentModel = model("Content", ContentSchema)
export const LinkModel = model("Link", LinkSchema)
