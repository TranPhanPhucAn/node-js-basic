import express from 'express'
import pool from '../configs/connectDB.js'
// import { json } from 'body-parser';
import multer from 'multer';
// import path from 'path'
let getHomepage = async (req, res) => {
    // let data = [];
    // connection.query(
    // 'SELECT * FROM `users` ',
    // function (err, results, fields) {
    //     console.log('>>sqlmy');
    //     console.log(results); // results contains rows returned by server
    //     // data = results.map((row) => { return row });
    //     results.map((row) => {
    //         data.push({
    //             id : row.id,
    //             email : row.email,
    //             firstName : row.firstName,
    //             lastName : row.lastName,
    //         })  
    //     })
    //     // return res.render('index.ejs', { dataUser: data });
    // // console.log(fields); // fields contains extra meta data about results, if available
    // }
    // );
    const [ rows, fields ] = await pool.execute('SELECT * FROM `users` ');
    return res.render('index.ejs', { dataUser: rows });
    
}

let getDetailPage = async (req, res) => {
    let userId = req.params.userId;
    let user = await pool.execute('SELECT * FROM `users` WHERE `id`=?', [ userId ]);
    // console.log('>>>check ', user);
    return res.send(JSON.stringify(user[ 0 ]))
    // return res.send('sdaf')
}
// function getHomepage(req, res) {
//     return res.render('index.ejs');
// }
// module.exports = {
//     getHomepage
// };
let createNewUser = async (req, res) => {
    let { firstName, lastName, email, address } = req.body;
    await pool.execute(`insert into users(firstName, lastName, email, address) values(?,?,?,?)`
        , [ firstName, lastName, email, address ]);
    return res.redirect('/')
}
let deleteUser = async(req, res) => {
    let { userId } = req.body;
    await pool.execute('delete from users where id=?', [ userId ]);
    return res.redirect('/')

}
let getEditPage = async(req, res) => {
    let id = req.params.id;
    let [ user ] = await pool.execute('select * from users where id=?', [ id ]); 
    return res.render('update.ejs', { dataUser: user[0] });
}
let postUpdateUser = async (req, res) => {
    let { id, firstName, lastName, email, address } = req.body;
    await pool.execute('update users set firstName=?, lastName=?, email=?, address=? where id=?',
        [firstName, lastName, email, address, id])
    return res.redirect('/');
}
let getUploadFilePage = async (req, res) => {
    return res.render('uploadFile.ejs')
}

// const storage = multer.diskStorage({
//     destination: function(req, file, cb) {
//         cb(null, 'uploads/');
//     },

//     // By default, multer removes file extensions so let's add them back
//     filename: function(req, file, cb) {
//         cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
//     }
// });
// const imageFilter = function(req, file, cb) {
//     // Accept images only
//     if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
//         req.fileValidationError = 'Only image files are allowed!';
//         return cb(new Error('Only image files are allowed!'), false);
//     }
//     cb(null, true);
// };
// // exports.imageFilter = imageFilter;

// let handleUploadFile = async (req, res) => {
//     // 'profile_pic' is the name of our file input field in the HTML form
//     let upload = multer({ storage: storage, fileFilter: imageFilter }).single('profile_pic');
//     upload(req, res, function(err) {
//         // req.file contains information of uploaded file
//         // req.body contains information of text fields, if there were any

//         if (req.fileValidationError) {
//             return res.send(req.fileValidationError);
//         }
//         else if (!req.file) {
//             return res.send('Please select an image to upload');
//         }
//         else if (err instanceof multer.MulterError) {
//             return res.send(err);
//         }
//         else if (err) {
//             return res.send(err);
//         }

//         // Display uploaded image for user validation
//         res.send(`You have uploaded this image: <hr/><img src="${req.file.path}" width="500"><hr /><a href="./">Upload another image</a>`);
//     });
// }

const upload = multer().single('profile_pic');
let handleUploadFile = async (req, res) => {
    upload(req, res, function (err) {
        // req.file contains information of uploaded file
        // req.body contains information of text fields, if there were any
        // console.log('>>check filename:', req.file);
        if (req.fileValidationError) {
            return res.send(req.fileValidationError);
        }
        else if (!req.file) {
            return res.send('Please select an image to upload');
        }
        else if (err instanceof multer.MulterError) {
            return res.send(err);
        }
        else if (err) {
            return res.send(err);
        }

        //         // Display uploaded image for user validation
        res.send(`You have uploaded this image: <hr/><img src="/image/${req.file.filename}" width="500"><hr /><a href="/upload">Upload another image</a>`);
    })
}





// app.post('/upload-profile-pic', (req, res) => {
//     // 'profile_pic' is the name of our file input field in the HTML form
//     let upload = multer({ storage: storage, fileFilter: helpers.imageFilter }).single('profile_pic');

    
// });

export default {
    getHomepage, getDetailPage, createNewUser, deleteUser, getEditPage, postUpdateUser
    , getUploadFilePage, handleUploadFile
};