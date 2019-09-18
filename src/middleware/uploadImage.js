const { dataUri } = require("./multer")
const { uploader } = require("../config/cloudinaryConfig")

const uploadImage = async rq => {
  if (rq.files) {
    const images = []

    for (let i = 0; i < rq.files.length; i++) {
      const file = dataUri(rq.files[i]).content
      await uploader
        .upload(file, {
          folder: "papikos"
        })
        .then(result => {
          console.log("Sukses Upload", result.public_id)
          images.push(result.url)
        })
        .catch(err => console.log(err))
    }
    return images
  }
}

const deleteImage = id => {
  console.log("cek id", id)
  if (id.indexOf("cloudinary") > -1) {
    let newId = id.split("/")[8].substring(0, 20)
    return uploader.destroy(`papikos/${newId}`, function(error, result) {
      console.log(result, error)
    })
  }
}

module.exports = { uploadImage, deleteImage }
