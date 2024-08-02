const express = require('express');
const router = express.Router();
const { createProject, getProjects, applyToProject } = require('../controllers/projectController');
const auth = require('../middleware/auth');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.post('/', auth, upload.array('images'), createProject);
router.get('/', auth, getProjects);
router.post('/apply', auth, applyToProject);

module.exports = router;
