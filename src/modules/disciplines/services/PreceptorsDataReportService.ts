import { inject, injectable } from 'tsyringe';

import School from '@modules/schools/infra/typeorm/entities/School';
import Preceptor from '@modules/users/infra/typeorm/entities/Preceptor';
import IGenericUsersRepository from '@modules/users/repositories/IGenericUsersRepository';
import Professor from '@modules/users/infra/typeorm/entities/Professor';
import AppError from '@shared/errors/AppError';
import PreceptorsData from '../reports/PreceptorsData';
import IInternshipsRepository from '../repositories/IInternshipsRepository';

interface IRequest {
  professor_id: string;
}

interface IClassData {
  total_students: number;
  total_preceptors: number;
  total_students_with_preceptors: number;
  preceptors: Preceptor[];
  schools: School[];
}

@injectable()
class PreceptorsDataReportService {
  constructor(
    @inject('InternshipsRepository')
    private internshipsRepository: IInternshipsRepository,

    @inject('ProfessorsRepository')
    private professorsRepository: IGenericUsersRepository<Professor>,
  ) {}

  public async execute({ professor_id }: IRequest): Promise<PreceptorsData> {
    const professor = await this.professorsRepository.findById(professor_id);
    if (!professor) throw new AppError('Professor not found', 404);

    const internships = await this.internshipsRepository.findAllInternsOfProfessor(
      professor_id,
    );

    const report = new PreceptorsData();
    internships.forEach(intern => {
      if (!report[intern.class_discipline_id])
        report[intern.class_discipline_id] = {};

      const data = report[intern.class_discipline_id];

      if (!data[intern.class.sign])
        data[intern.class.sign] = {
          total_preceptors: 0,
          total_students: intern.class.total_students_enrolled,
          total_students_with_preceptors: 0,
          preceptors: [],
          schools: [],
        };

      if (intern.preceptor)
        data[intern.class.sign].total_students_with_preceptors += 1;

      if (!!intern.preceptor_id && !!intern.preceptor) {
        let preceptor: Preceptor | undefined;

        if (data[intern.class.sign].preceptors.length !== 0) {
          preceptor = data[intern.class.sign].preceptors.find(
            x => x.id === intern.preceptor_id,
          );

          if (!preceptor) {
            data[intern.class.sign].preceptors.push(intern.preceptor);
            data[intern.class.sign].total_preceptors += 1;
          }
        } else {
          data[intern.class.sign].preceptors.push(intern.preceptor);
          data[intern.class.sign].total_preceptors += 1;
        }
      }

      if (!!intern.school_id && !!intern.school) {
        let school: School | undefined;

        if (data[intern.class.sign].schools.length !== 0) {
          school = data[intern.class.sign].schools.find(
            x => x.id === intern.school_id,
          );

          if (!school) data[intern.class.sign].schools.push(intern.school);
        } else {
          data[intern.class.sign].schools.push(intern.school);
        }
      }

      report[intern.class_discipline_id] = data;
    });

    return report;
  }
}

export default PreceptorsDataReportService;
