const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require("cors")

const app = express();
app.use(fileUpload());

app.use(cors())
app.use(express.json({ limit: "50mb", extended: true }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });

app.post('/upload-audio', (req, res) => {
  const audioFile = req.files.audio;
  console.log(audioFile)
  audioFile.mv('audio.mp3', (err) => {
    console.log('Run')
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }

    res.status(200).json({ message: 'Audio uploaded successfully!' });
  });
});

app.get('/', (req, res) => {
    res.status(200).json("Hello")
})

app.listen(3000, () => {
  console.log('Server started on port 3000');
});