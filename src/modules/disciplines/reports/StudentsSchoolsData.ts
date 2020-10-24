import School from '@modules/schools/infra/typeorm/entities/School';
import Preceptor from '@modules/users/infra/typeorm/entities/Preceptor';
import Student from '@modules/users/infra/typeorm/entities/Student';

export default class StudentsSchoolsData {
  [key: string]: {
    [key: string]: {
      student: Student;
      preceptor: Preceptor;
      school: School;
    }[];
  };
}
