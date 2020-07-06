declare namespace Express {
  export interface Request {
    user: {
      id: string;
      role: number;
    };
    files: {
      commitmentTerm: Multer.File[];
      firstCopy: Multer.File[];
      secondCopy: Multer.File[];
      thirdCopy: Multer.File[];
    };
  }
}
