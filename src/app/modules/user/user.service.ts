import config from '../../config';

import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TStudent } from '../students/student.interface';
import { Student } from '../students/student.model';
import { TUser } from './user.interface';

import { User } from './user.model';
import { generateStudentId } from './user.utils';

const createStudentInDB = async (payload: TStudent, password: string) => {
  // create a user object
  const userData: Partial<TUser> = {};

  // if password is not given use default password
  //   if (!password) {
  //     user.password = config.default_password as string;
  //   } else {
  //     user.password = password;
  //   }
  userData.password = password || (config.default_password as string);

  //   console.log('password:', password);
  // console.log(studentData);

  // set student role
  userData.role = 'student';

  // find academic semester info
  const admissionSemester = await AcademicSemester.findById(
    payload.admissionSemester,
  );
  if (!admissionSemester) {
    throw new Error('Academic semester not found'); // Handle the error as needed
  }
  userData.id = await generateStudentId(admissionSemester);

  //    create a user
  const newUser = await User.create(userData);

  //    create a student
  if (Object.keys(newUser).length) {
    //  set id, _id as user
    payload.id = newUser.id; //embedding id
    payload.user = newUser._id; //reference _d

    const newStudent = await Student.create(payload);
    return newStudent;
  }
};

export const UserServices = {
  createStudentInDB,
};
