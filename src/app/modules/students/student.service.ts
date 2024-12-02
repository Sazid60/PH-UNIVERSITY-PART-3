import { Student } from './student.model';

// *******************************************************************
// getting data service
const getAllStudentsFromDB = async () => {
  const result = await Student.find();
  return result;
};

// get single student from db
const getSingleStudentFromDB = async (id: string) => {
  // const result = await Student.findOne({ id });

  // using aggregate
  const result = await Student.aggregate([{ $match: { id: id } }]);
  return result;
};
// delete single student from db
const deleteStudentFromDB = async (id: string) => {
  const result = await Student.updateOne({ id }, { isDeleted: true });
  return result;
};
export const StudentServices = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
};
