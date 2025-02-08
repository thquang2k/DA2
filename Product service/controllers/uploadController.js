const uploadImage = async (req, res, next) => {
    console.log(req.body)
    console.log(req.files)
    return res.json({
        message: "OK",
    })
}

module.exports = {
    uploadImage
}