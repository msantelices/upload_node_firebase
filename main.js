const fs = require('fs')
const express = require('express')
const multer = require('multer')

const app = express()
app.use(express.static('ui'))

const upload = multer({ dest: 'temp/' })

const { initializeApp, cert } = require('firebase-admin/app')
const { getStorage, getDownloadURL } = require('firebase-admin/storage')

// const serviceAccount = require('./serviceKey.json')
const serviceAccount = require('./config.js')

initializeApp({
    credential: cert(serviceAccount),
    storageBucket: 'gs://test-a656c.appspot.com'
})

const storage = getStorage().bucket()


const uploadImage = async(name, extension)=> {
    await storage.upload(`./temp/${name}`, { destination: `recursos/${name}.${extension}` })
    
    const fileRef = storage.file(`recursos/${name}.${extension}`)
    const downloadURL = await getDownloadURL(fileRef)

    return downloadURL
}

app.post('/upload', upload.single('file'), async(req, res)=> {
    const file = req.file 
    const extension = file.originalname.split('.')[1]

    const imageURL = await uploadImage(file.filename, extension)

    fs.unlinkSync(`temp/${file.filename}`)

    res.json({ status: 'OK', url: imageURL })
})


app.listen(8080, ()=> console.log('App running on port 8080'))

