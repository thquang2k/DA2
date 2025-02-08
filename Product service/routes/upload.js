var express = require('express');
var router = express.Router();

const upload = require('../utils/upload')

router.post("/upload", upload.single("file"), (req, res) => {
	// check whether req.file contians the file
	// if not multer is failed to parse so notify the client
	if (!req.file) {
		res.status(413).send(`File not uploaded!, Please 
							attach jpeg file under 5 MB`);
		return;
	}
	// successfull completion
	res.status(201).send("Files uploaded successfully");
});

module.exports = router;
