import Model3d from '../models/model3d';
import mongoose from 'mongoose';
const MODEL3D_CODE = require('./code/model3d_code');
var multer = require('multer');
var fs = require('fs');
var path = require('path');
// var model3d = mongoose.model('model3d', model3dSchema);

module.exports = {
    uploadModel,
    deleteModel,
    updateModel,
    downloadModel,
    viewModel
}

//upload model3d:
//test: http://localhost:8000/api/model3d/upload/ (phuong thuc: post)
// co 3 key: name, description & file
    function  uploadModel (req, res, next) {
        if (!fs.existsSync('./upload')) {
            fs.mkdir('./upload', function(err, data) {
                createModel();
            });
        } else {
            createModel();
        }
        function createModel() {
            let fileModel = new Model3d();
            let storage = multer.diskStorage({
                destination: function(req, file, cb) {
                    cb(null, './upload');
                },
                filename: function(req, file, cb) {
                    fileModel.type = path.extname(file.originalname)
                    fileModel.name = file.originalname;
                    fileModel.size = file.size;
                    cb(null, fileModel._id + ".zip");
                }
            });
            var upload = multer({storage: storage}).single('file');
            upload(req, res, function(err) {
                if (!req.file){
                    return res.json(MODEL3D_CODE.CHECKFILE.FAIL.UNFILE);
                }
                fileModel.name = req.body.name;
                fileModel.description = req.body.description;
                fileModel.userId= req.verify._id;
                if (path.extname(req.file.originalname) !== '.zip') {
                  return  res.json(MODEL3D_CODE.CHECKFILE.FAIL.UNUPLOAD);
                }
                fileModel.save()
                    .then(filemodeldata => {
                        // res.send(filemodeldata);
                        return res.json(MODEL3D_CODE.CHECKFILE.SUCCESS.UPLOADED);
                    }, err => {
                        return res.send(err);
                    });
            });

        }
    }
//download model3d dua vao objectid
//test: http://localhost:8000/api/model3d/download/objectId (phuong thuc: get)
    function downloadModel (req, res, next) {
        let filename = req.params.fileId;
        if (!fs.existsSync('./upload/' + filename + '.zip')) {
            // console.log(filename);
            res.json(MODEL3D_CODE.CHECKFILE.FAIL.UNDOWNLOAD);
        } else {
            downloadFile();
        }
        function downloadFile() {
            res.download('./upload/' + filename + '.zip', );
        }
    }
//update model3d dua vao objectid
//test: http://localhost:8000/api/model3d/update/objectId (phuong thuc: post)
//body->raw(JSON)-> {"name":"newww", "description":"testnew"}
    function updateModel (req, res, next) {
        // console.log(req.params.fileId);
        let newModel3d = req.body;
        // console.log(req.body);
        newModel3d.updateDate = new Date();
        let fileId = req.params.fileId;
        Model3d.findOneAndUpdate({
            _id: fileId,
        }, {
            $set: newModel3d
        }, {
            rawResult: true,
            new: true
        }, function(err, model3d) {
            if (err || !model3d) {
                // console.log(err);
                // console.log(model3d);
                res.json(MODEL3D_CODE.CHECKFILE.FAIL.UNUPDATE);
            } else {
                // res.json(model3d);
                res.json(MODEL3D_CODE.CHECKFILE.SUCCESS.UPDATED);
            }
        });
    }
//delete model3d dua vao objectid
//test: http://localhost:8000/api/model3d/delete/objecId (phuong thuc: delete)
    function deleteModel (req, res, next) {
        // console.log(req.params.fileId);
        Model3d.findByIdAndRemove(req.params.fileId).exec();
        let filename = req.params.fileId;
        fs.unlink('./upload/' + filename + '.zip', function(err) {
            if (err) {
                res.json(MODEL3D_CODE.CHECKFILE.FAIL.UNDELETE);
            } else {
                // res.send('Deleted');
                res.json(MODEL3D_CODE.CHECKFILE.SUCCESS.DELETED);
            }
        });
    }
//view user's model
//test: http://localhost:8000/api/model3d/viewmodel (phuong thuc: get)
    function viewModel(req,res,next){
        Model3d.find({userId: req.verify._id}).sort({createDate:-1}).exec(function(err, data){
            if(err || !data){
                res.send('Oop! Can not view');
                next();
            } else {
                // console.log(data);
                res.json(data);
            }
        });
    }
