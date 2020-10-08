import { container } from 'tsyringe';
import { Request, Response } from 'express';
import CreateInternshipAssessmentService from '@modules/disciplines/services/CreateInternshipAssessmentService';
import ICreateAssessmentDTO from '@modules/disciplines/dtos/ICreateAssessmentDTO';

export default class AssessmentsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { id: user_id } = request.user;
    const assessment_data = request.body as ICreateAssessmentDTO;

    const createInternshipAssessmentService = container.resolve(
      CreateInternshipAssessmentService,
    );

    const assessment = await createInternshipAssessmentService.execute({
      user_id,
      assessment_data,
    });

    return response.json(assessment);
  }
}
