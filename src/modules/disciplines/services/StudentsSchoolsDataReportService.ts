import { inject, injectable } from 'tsyringe';

import StudentsSchoolsData from '../reports/StudentsSchoolsData';
import IInternshipsRepository from '../repositories/IInternshipsRepository';

interface IRequest {
  professor_id: string;
}

@injectable()
class StudentsSchoolsDataReportService {
  constructor(
    @inject('InternshipsRepository')
    private internshipsRepository: IInternshipsRepository,
  ) {}

  public async execute({
    professor_id,
  }: IRequest): Promise<StudentsSchoolsData> {
    const internships = await this.internshipsRepository.findAllInternsOfProfessor(
      professor_id,
      ['class', 'school', 'preceptor'],
    );

    const report = new StudentsSchoolsData();
    internships.forEach(intern => {
      if (!report[intern.class_discipline_id])
        report[intern.class_discipline_id] = {};

      if (!report[intern.class_discipline_id][intern.class.sign])
        report[intern.class_discipline_id][intern.class.sign] = [];

      report[intern.class_discipline_id][intern.class.sign].push({
        student: intern.student,
        preceptor: intern.preceptor,
        school: intern.school,
      });
    });

    return report;
  }
}

export default StudentsSchoolsDataReportService;
