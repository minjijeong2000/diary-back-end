import mongoose from 'mongoose'
const Schema = mongoose.Schema

const referenceSchema = new Schema({
  name: {type: String, required: true},
  photo: {type: String, required: true},
},{
  timestamps: true,
})

const Reference = mongoose.model('Reference', referenceSchema)

export { Reference }