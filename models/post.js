import mongoose from 'mongoose'
const Schema = mongoose.Schema

const categorySchema = new Schema({
  category: { type: String },
},{
  timestamps: true,
})


const postSchema = new Schema({
  title: {type: String, required: true},
  code: {type: String, required: true},
  author: {type: mongoose.Schema.Types.ObjectId, ref:"Profile"},
  category:[categorySchema]
},{
  timestamps: true,
})

const Post = mongoose.model('Post', postSchema)

export { Post }
