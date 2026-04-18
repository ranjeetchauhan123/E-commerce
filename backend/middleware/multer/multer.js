const multer = require('multer');
const path = require('path');

const uploadPath = path.join(__dirname, '../../public/');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if(file.fieldname === 'image'){
            cb(null, `${uploadPath}/upload`);
        }else{
            cb(null, `${uploadPath}/profile`);
        }
        
    },
    filename: function (req, file, cb) {
        const uniqueName = Date.now() + '-' + file.originalname;
        cb(null, uniqueName);
    }
});

const upload = multer({ storage });

module.exports = { upload };