import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

import UploadStudentContractFiles from '../../../services/UploadStudentContractFiles';

export default class StudentIntershipContractsController {
  public async update(request: Request, response: Response): Promise<Response> {
    const student_id = request.params.id;

    const { commitmentTerm, firstCopy, secondCopy, thirdCopy } = request.files;

    const uploadStudentContractFiles = container.resolve(
      UploadStudentContractFiles,
    );

    const user = await uploadStudentContractFiles.execute({
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
