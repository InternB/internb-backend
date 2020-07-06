import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

import UploadStudentWorkPlanService from '../../../services/UploadStudentWorkPlanService';

export default class StudentWorkPlansController {
  public async patch(request: Request, response: Response): Promise<Response> {
    const { id: student_id } = request.user;
    const work_plan = request.file;

    const uploadStudentWorkPlanService = container.resolve(
      UploadStudentWorkPlanService,
    );

    const user = await uploadStudentWorkPlanService.execute({
      student_id,
      work_plan: work_plan.filename,
    });

    return response.json(classToClass(user));
  }
}
