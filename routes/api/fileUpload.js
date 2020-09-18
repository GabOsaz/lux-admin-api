const express = require('express');
const router = express.Router();
require('dotenv').config();

const cloudinary = require('cloudinary').v2;


cloudinary.config({
    cloud_name: 'omo-cloud',
    api_key: '244864298151684',
    api_secret: process.env.API_SECRET,
})

// router.post('/', async(req, res) =>{
//     // res_promises will be an array of promises
//     let res_promises = req.files.map(file => new Promise((resolve, reject) => {
//         cloudinary.v2.uploader.upload(file.path, { use_filename: true, unique_filename: false }, function (error, result) {
//             if(error) reject(error)
//             else resolve(result.public_id)
//         })
//     })
//     )
//     // Promise.all will fire when all promises are resolved 
//     Promise.all(res_promises)
//     .then(result =>  res.json({'response':upload}))
//     .catch((error) => res.status(400).json({message: 'Something went wrong.', error}))
// })

// router.post('/', async (req, res) => {
//     try {
//         const file = req.body.filepaths;
//         console.log(file);
//         const image = await cloudinary.uploader.upload(file, {});
//         if (image) {
//             res.send({
//                 message: 'Image uploaded successfully',
//                 image
//             });
//         } else {
//             res.send({
//                 message: 'There was an issues uploading to cloudinary'
//             })
//             // if(err) throw Error(err);
//         }
//             console.log(image);
//     } catch(error) {
//         console.log(error);
//         return res
//         .status(400)
//         .json({ message: 'Something went wrong.', error });
//     }
// })

router.post('/', async (req, res) => {
    try {
        const fileString = req.body.data;
        const uploadedResponse = await cloudinary.uploader.upload(fileString);
        console.log(uploadedResponse);
        res.json({ msg: 'Successfully Uploaded!', uploadedResponse})
    } catch(error) {
        console.error(error);
        res.status(500).json({msg: 'Something wrong with Cloudinary'})
    }
})

// router.post('/', async (req, res) => {
//     /* we would receive a request of file paths as array */
//     let filePaths = req.body.data;
//     console.log(filePaths);
//     let multipleUpload = new Promise(async (resolve, reject) => {
//       let upload_len = filePaths.length
//       let upload_res = new Array();

//         for(let i = 0; i <= upload_len + 1; i++)
//         {
//             let filePath = filePaths[i];
//             await cloudinary.v2.uploader.upload(filePath, (error, result) => {

//                 if(upload_res.length === upload_len)
//                 {
//                   /* resolve promise after upload is complete */
//                   resolve(upload_res)
//                 }else if(result)
//                 {
//                   /*push public_ids in an array */  
//                   upload_res.push(result.public_id);
//                 } else if(error) {
//                   console.log(error)
//                   reject(error)
//                 }

//             })

//         } 
//     })
//     .then((result) => result)
//     .catch((error) => res.json({ message: 'There was a problem uploading the images', error}))

//     /*waits until promise is resolved before sending back response to user*/
//     let upload = await multipleUpload; 
//     res.json({'response':upload})
// })

module.exports = router;