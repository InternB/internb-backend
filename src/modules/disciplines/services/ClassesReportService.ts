import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import ClassesData from '../reports/ClassesData';
import ListClassesDisciplineService from './ListClassesDisciplineService';

interface IRequest {
  professor_id: string;
}

@injectable()
class ClassesReportService {
  constructor(
    @inject(ListClassesDisciplineService)
    private listClassesDisciplineService: ListClassesDisciplineService,
  ) {}

  public async execute({ professor_id }: IRequest): Promise<ClassesData> {
    const professorClasses = await this.listClassesDisciplineService.execute({
      professor_id,
      discipline_id: undefined,
    });

    if (professorClasses.length === 0)
      throw new AppError('Professor does not have any classes yet');

    const classesDataReport = new ClassesData();
    Object.assign(classesDataReport, {
      disciplinesCodes: [],
      disciplinesClasses: {},
      classesEnrolled: [],
      classesRegistered: [],
    });

    professorClasses.forEach(professorClass => {
      const { discipline_id } = professorClass;
      if (!classesDataReport.disciplinesCodes.includes(discipline_id))
        classesDataReport.disciplinesCodes.push(discipline_id);

      if (!classesDataReport.disciplinesClasses[discipline_id])
        classesDataReport.disciplinesClasses[discipline_id] = [];

      classesDataReport.disciplinesClasses[discipline_id].push(
        professorClass.sign,
      );

      classesDataReport.classesEnrolled.push(
        professorClass.total_students_enrolled,
      );
      classesDataReport.classesRegistered.push(
        professorClass.total_students_registered,
      );
    });

    classesDataReport.disciplinesTotal =
      classesDataReport.disciplinesCodes.length;

    return classesDataReport;
  }
}

export default ClassesReportService;
