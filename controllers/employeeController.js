const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Employee = mongoose.model('Employee');

router.get('/', (req, res) => {
    res.render("employee/addOrEdit", {
        viewTitle: "Registration Form"
    });
});


router.post('/', (req, res) => {
    if (req.body._id == '')
        insertRecord(req, res);
        else
        updateRecord(req, res);
});

//Function to upload the file 
function uploadFile(req,res){
    try {
        if(req.files){
            const file = req.files.file
            const filename = req.body.fullName+'.jpg'
            file.mv('./uploads/' + filename, (err)=>{
                if(!err){
                    console.log('Data and File uploaded');
                }
                else
                console.log(err);
            })
        }
    } 
    catch (error) {
     console.log(error);
  } 
}

function insertRecord(req, res) {
    uploadFile(req,res);
    var employee = new Employee();
    employee.fullName = req.body.fullName;
    employee.email = req.body.email;
    employee.mobile = req.body.mobile;
    employee.city = req.body.city; 
    employee.save((err, doc) => {
        if (!err){
            res.redirect('/list');
        }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("employee/addOrEdit", {
                    viewTitle: "Insert Employee",
                    employee: req.body
                });
            }
            else
            console.log('Error during record insertion : ' + err);
        }
    });
}

function updateRecord(req, res) {
    uploadFile(req,res);
    Employee.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('employee/list'); }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("employee/addOrEdit", {
                    viewTitle: 'Update Employee',
                    employee: req.body
                });
            }
            else
                console.log('Error during record update : ' + err);
        }
    });
}

router.get('/list', (req, res) => {
    Employee.find((err, docs) => {
        if (!err) {
            res.render("employee/list", {
            list: docs
            });
        }
        else {
            console.log('Error in retrieving employee list :' + err);
        }
    });
});

router.get('/Admin/list', (req, res) => {
    Employee.find((err, docs) => {
        if (!err) {
            res.render("employee/adminlist", {
            list: docs
            });
        }
        else {
            console.log('Error in retrieving employee list :' + err);
        }
    });
});



router.get('/Alldata', (req, res) => {
    Employee.find((err, docs) => {
        if (!err) {
            res.send(docs);
        }
        else {
            console.log('Error in retrieving employee list :' + err);
        }
    });
});

function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'fullName':
                body['fullNameError'] = err.errors[field].message;
                break;
            case 'email':
                body['emailError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}

router.get('/user/:id', (req, res) => {
    Employee.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("employee/addOrEdit", {
                viewTitle: "Update Employee",
                employee: doc
            });
        }
    });
});

router.get('/user/delete/:id', (req, res) => {
    Employee.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/Admin/list');
        }
        else { console.log('Error in employee delete :' + err); }
    });
});

module.exports = router;