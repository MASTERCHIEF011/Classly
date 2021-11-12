import express from 'express';

import auth from '../../middleware/middleware.js'

import * as TeacherController from './teacherController.js'

const router = express.Router();


router.post('/analysis', auth, TeacherController.sendVideoData);
router.post('/createclass', auth, TeacherController.createClass);

router.get('/classes:id', auth, TeacherController.viewClasses);


export default router;