import express from 'express';
import { StudentController } from './student.controller';

const router = express.Router();

// get all students
router.get('/', StudentController.getAllStudents);
// get single students
router.get('/:studentId', StudentController.getSingleStudent);
// delete student
router.delete('/:studentId', StudentController.deleteStudent);
//  this delete id will be the generated id  we have  created by server

export const StudentRoutes = router;
