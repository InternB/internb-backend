import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

import SchoolDataReportService from '@modules/disciplines/services/SchoolDataReportService';
import ClassesReportService from '@modules/disciplines/services/ClassesReportService';

export default class ReportsController {
  public async school_data(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id: user_id } = request.user;
    const { professor_id } = request.params;

    const schoolDataReportService = container.resolve(SchoolDataReportService);

    const schoolDataReport = await schoolDataReportService.execute({
      user_id,
      professor_id,
    });

    return response.json(classToClass(schoolDataReport));
  }

  public async classes_data(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { professor_id } = request.params;

    const classesReportService = container.resolve(ClassesReportService);

    const classesReport = await classesReportService.execute({ professor_id });

    return response.json(classToClass(classesReport));
  }
}
