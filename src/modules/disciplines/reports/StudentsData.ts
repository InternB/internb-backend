import Student from '@modules/users/infra/typeorm/entities/Student';
import Activity from '../infra/typeorm/entities/Actvitity';
import Calendar from '../infra/typeorm/entities/Calendar';

export default class StudentsData {
  [key: string]: {
    [key: string]: {
      id: string;

      student: Student;

      student_id: string;

      has_activities: boolean;

      activities: Activity[];

      calendar: Calendar;

      has_work_plan: boolean;

      work_plan: string;

      assessment_id: string;
    }[];
  };
}
