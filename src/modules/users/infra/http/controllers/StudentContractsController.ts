import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

import UploadStudentContractFilesService from '../../../services/UploadStudentContractFilesService';

export default class StudentContractsController {
  public async update(request: Request, response: Response): Promise<Response> {
    const student_id = request.params.id;

    const { commitmentTerm, firstCopy, secondCopy, thirdCopy } = request.files;

    const uploadStudentContractFilesService = container.resolve(
      UploadStudentContractFilesService,
    );

    const user = await uploadStudentContractFilesService.execute({
      student_id,
      commitmentTerm: commitmentTerm[0].filename,
      contract: {
        firstCopy: firstCopy[0].filename,
        secondCopy: secondCopy[0].filename,
        thirdCopy: thirdCopy[0].filename,
      },
    });

    return response.json(classToClass(user));
  }
}
