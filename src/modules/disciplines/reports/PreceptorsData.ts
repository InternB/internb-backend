import School from '@modules/schools/infra/typeorm/entities/School';
import Preceptor from '@modules/users/infra/typeorm/entities/Preceptor';

export default class PreceptorsData {
  [key: string]: {
    [key: string]: {
      total_students: number;

      total_preceptors: number;

      total_students_with_preceptors: number;

      preceptors: Preceptor[];

      schools: School[];
    };
  };
}
