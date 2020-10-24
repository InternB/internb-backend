import { inject, injectable } from 'tsyringe';
import StudentsData from '../reports/StudentsData';

import IInternshipsRepository from '../repositories/IInternshipsRepository';

interface IRequest {
  professor_id: string;
}

@injectable()
class StudentsDataReportService {
  constructor(
    @inject('InternshipsRepository')
    private internshipsRepository: IInternshipsRepository,
  ) {}

  public async execute({ professor_id }: IRequest): Promise<StudentsData> {
    const interns = await this.internshipsRepository.findAllInternsOfProfessor(
      professor_id,
      ['student', 'activities', 'asssessment', 'calendar', 'class'],
      true,
    );

    const report = new StudentsData();
    interns.forEach(intern => {
      if (!report[intern.class_discipline_id])
        report[intern.class_discipline_id] = {};

      if (!report[intern.class_discipline_id][intern.class.sign])
        report[intern.class_discipline_id][intern.class.sign] = [];

      report[intern.class_discipline_id][intern.class.sign].push({
        id: intern.id,
        student: intern.student,
        student_id: intern.student_id,
        has_activities: !!intern.activities,
        activities: intern.activities,
        calendar: intern.calendar,
        has_work_plan: !!intern.work_plan,
        work_plan: intern.work_plan,
        assessment_id: intern.assessment_id,
      });
    });

    return report;
  }
}

export default StudentsDataReportService;
