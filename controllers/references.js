import { Reference } from '../models/reference.js'
import { v2 as cloudinary } from 'cloudinary'

function create(req, res) {
  req.body.author = req.user.profile
  Reference.create(req.body)
  .then(reference => {
    Reference.findById(reference._id)
    .populate('author')
    .then(populatedReference => {
      res.json(populatedReference)
    })
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({err: err.errmsg})
  })
}

function index(req, res) {
  Reference.find({})
  .populate('author')
  .then(references => {
    res.json(references)
  })
}

async function update(req, res) {
  console.log(req.body)
  try {
    const reference = await Reference.findById(req.params.id)
    if (reference.author._id.equals(req.user.profile)) {
      const updatedReference = await Reference.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('author')
      res.json(updatedReference)
    } else {
      res.status(401).json({ err: "Not authorized!" })
    }
  } catch (err) {
    console.log(err)
    res.status(500).json({ err: err.errmsg })
  }
}

function deleteOne(req, res) {
  Reference.findById(req.params.id)
  .then(reference => {
    if (reference.author._id.equals(req.user.profile)){
      Reference.findByIdAndDelete(reference._id)
      .then(deletedReference => {
        res.json(deletedReference)
      })
    } else {
      res.status(401).json({err: "Not authorized"})
    }
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({err: err.errmsg})
  })
}

function addPhoto(req, res) {
    const imageFile = req.files.photo.path
    Reference.findById(req.params.id)
    .then(reference => {
      cloudinary.uploader.upload(imageFile, {tags: `${reference.name}`})
      .then(image => {
        reference.photo = image.url
        reference.save()
        .then(reference => {
          res.status(201).json(reference.photo)
        })
      })
      .catch(err => {
        console.log(err)
        res.status(500).json(err)
      })
    })
  }

export {
  create,
  index,
  update,
  deleteOne as delete,
  addPhoto
}