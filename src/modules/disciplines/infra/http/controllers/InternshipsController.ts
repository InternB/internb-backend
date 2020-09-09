import { container } from 'tsyringe';
import { Request, Response } from 'express';

import RegisterStudentInternshipService from '@modules/disciplines/services/RegisterStudentInternshipService';
import RegisterInternToSchoolService from '@modules/disciplines/services/RegisterInternToSchoolService';
import AppError from '@shared/errors/AppError';
import UploadInternContractFilesService from '@modules/disciplines/services/UploadInternContractFilesService';
import UploadInternWorkPlanService from '@modules/disciplines/services/UploadInternWorkPlanService';
import UploadInternCompromiseService from '@modules/disciplines/services/UploadInternCompromiseService';
import ListStudentInternshipsService from '@modules/disciplines/services/ListStudentInternshipsService';

export default class InternshipsController {
  public async studentInternships(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id: user_id } = request.user;

    const listStudentInternships = container.resolve(
      ListStudentInternshipsService,
    );

    const internships = await listStudentInternships.execute({ user_id });

    return response.json(internships);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { class_id, password } = request.body;
    const { id: user_id } = request.user;

    const registerStudentInternship = container.resolve(
      RegisterStudentInternshipService,
    );

    const internship = await registerStudentInternship.execute({
      user_id,
      class_id,
      password,
    });

    return response.status(201).json(internship);
  }

  public async registerStudentToSchool(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id: internship_id, school_id } = request.params;
    const { id: user_id } = request.user;

    const registerInternToSchool = container.resolve(
      RegisterInternToSchoolService,
    );

    const internship = await registerInternToSchool.execute({
      internship_id,
      school_id,
      user_id,
    });

    return response.json(internship);
  }

  public async uploadStudentCompromise(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { internship_id } = request.params;
    const compromise = request.file;

    if (!compromise) {
      return response
        .status(400)
        .json(new AppError('Must upload the compromise file'));
    }

    const uploadInternCompromise = container.resolve(
      UploadInternCompromiseService,
    );

    const internship = await uploadInternCompromise.execute({
      internship_id,
      compromise: compromise.filename,
    });

    return response.json(internship);
  }

  public async uploadStudentContract(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { internship_id } = request.params;
    const { firstCopy, secondCopy, thirdCopy } = request.files;

    if (!firstCopy || !secondCopy || !thirdCopy) {
      return response
        .status(400)
        .json(
          new AppError('Must upload all three copies of the contract', 400),
        );
    }

    const uploadInternContract = container.resolve(
      UploadInternContractFilesService,
    );

    const internship = await uploadInternContract.execute({
      internship_id,
      firstCopy: firstCopy[0].filename,
      secondCopy: secondCopy[0].filename,
      thirdCopy: thirdCopy[0].filename,
    });

    return response.json(internship);
  }

  public async uploadStudentWorkPlan(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { internship_id } = request.params;
    const work_plan = request.file;

    if (!work_plan) {
      return response
        .status(400)
        .json(new AppError('Must upload the work plan file', 400));
    }

    const uploadInternWorkPlan = container.resolve(UploadInternWorkPlanService);

    const internship = await uploadInternWorkPlan.execute({
      internship_id,
      work_plan: work_plan.filename,
    });

    return response.json(internship);
  }
}
