// import { container } from 'tsyringe';
import { Request, Response } from 'express';

export default class ReportsController {
  public async school_data(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { professor_id } = request.params;

    // TODO

    return response.json();
  }
}
