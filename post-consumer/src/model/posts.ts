import mongoose from "mongoose";

interface Post{
    title: string;
    content: string;
    createdAt: Date;
}

const postSchema = new mongoose.Schema<Post>({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now // Sets default to the current date and time
    }
})

const PostModel = mongoose.models.Post || mongoose.model("Post", postSchema);
export default PostModel;