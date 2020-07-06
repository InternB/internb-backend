/* eslint-disable @typescript-eslint/interface-name-prefix */
declare namespace Express {
  export interface Request {
    user: {
      id: string;
    };
    files: {
      commitmentTerm: Multer.File[];
      firstCopy: Multer.File[];
      secondCopy: Multer.File[];
      thirdCopy: Multer.File[];
    };
  }
}
