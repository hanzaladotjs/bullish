import * as mongoose from "mongoose";

const blogSchema :any = new mongoose.Schema({
    title: {
        type: String}
        ,
    description: {
        type: String
    },
    content: {
        type: String
    }, author: {
        type: String
    }
})
export const Blog: any= mongoose.model("Blog", 
    blogSchema
)