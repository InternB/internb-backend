import { container } from 'tsyringe';
import { Request, Response } from 'express';

import RegisterStudentInternshipService from '@modules/disciplines/services/RegisterStudentInternshipService';
import RegisterInternToSchoolService from '@modules/disciplines/services/RegisterInternToSchoolService';
import UploadInternContractFilesService from '@modules/disciplines/services/UploadInternContractFilesService';
import UploadInternWorkPlanService from '@modules/disciplines/services/UploadInternWorkPlanService';
import UploadInternCompromiseService from '@modules/disciplines/services/UploadInternCompromiseService';
import ListStudentInternshipsService from '@modules/disciplines/services/ListStudentInternshipsService';
import UpdateInternshipDatesService from '@modules/disciplines/services/UpdateInternshipDatesService';
import ListPreceptorInternshipsService from '@modules/disciplines/services/ListPreceptorInternshipsService';
import RegisterInternToPreceptorService from '@modules/disciplines/services/RegisterInternToPreceptorService';

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

  public async preceptorInternships(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id: user_id } = request.user;

    const listPreceptorInternshipsService = container.resolve(
      ListPreceptorInternshipsService,
    );

    const internships = await listPreceptorInternshipsService.execute({
      user_id,
    });

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

  public async registerInternToSchool(
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

  public async registerInternToPreceptor(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { internship_id, preceptor_id } = request.params;

    const registerInternToPreceptorService = container.resolve(
      RegisterInternToPreceptorService,
    );

    const internship = await registerInternToPreceptorService.execute({
      internship_id,
      preceptor_id,
    });

    return response.json(internship);
  }

  public async updateInternshipDates(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.params;
    const { begins, ends } = request.body;

    const updateInternshipDatesService = container.resolve(
      UpdateInternshipDatesService,
    );

    const internship = await updateInternshipDatesService.execute({
      id,
      begins,
      ends,
    });

    return response.json(internship);
  }

  public async uploadStudentCompromise(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { internship_id, compromise_filename } = request.body as {
      internship_id: string;
      compromise_filename: string;
    };

    const uploadInternCompromise = container.resolve(
      UploadInternCompromiseService,
    );

    const internship = await uploadInternCompromise.execute({
      internship_id,
      compromise_filename,
    });

    return response.json(internship);
  }

  public async uploadStudentContract(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const {
      internship_id,
      first_copy,
      second_copy,
      third_copy,
    } = request.body as {
      internship_id: string;
      first_copy: string;
      second_copy: string;
      third_copy: string;
    };

    const uploadInternContract = container.resolve(
      UploadInternContractFilesService,
    );

    const internship = await uploadInternContract.execute({
      internship_id,
      first_copy,
      second_copy,
      third_copy,
    });

    return response.json(internship);
  }

  public async uploadStudentWorkPlan(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { internship_id, work_plan } = request.body as {
      internship_id: string;
      work_plan: string;
    };

    const uploadInternWorkPlan = container.resolve(UploadInternWorkPlanService);

    const internship = await uploadInternWorkPlan.execute({
      internship_id,
      work_plan,
    });

    return response.json(internship);
  }
}
