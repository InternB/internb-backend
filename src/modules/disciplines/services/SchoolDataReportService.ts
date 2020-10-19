import { inject, injectable } from 'tsyringe';
import IGenericUsersRepository from '@modules/users/repositories/IGenericUsersRepository';
import Professor from '@modules/users/infra/typeorm/entities/Professor';
import AppError from '@shared/errors/AppError';
import School from '@modules/schools/infra/typeorm/entities/School';
import AdmRegion from '@modules/schools/infra/typeorm/entities/AdmRegion';
import IInternshipsRepository from '../repositories/IInternshipsRepository';
import SchoolData from '../reports/SchoolData';

interface IRequest {
  user_id: string;
  professor_id: string;
}

@injectable()
class SchoolDataReportService {
  constructor(
    @inject('InternshipsRepository')
    private internshipsRepository: IInternshipsRepository,

    @inject('ProfessorsRepository')
    private professorsRepository: IGenericUsersRepository<Professor>,
  ) {}

  public async execute({
    user_id,
    professor_id,
  }: IRequest): Promise<SchoolData> {
    const professor = await this.professorsRepository.findUserOfTypeById(
      user_id,
    );

    if (!professor) throw new AppError('Professor not found', 404);

    const interns = await this.internshipsRepository.findAllInternsOfProfessor(
      professor_id,
    );

    const schools: Set<School> = new Set<School>();
    const admRegions: Set<AdmRegion> = new Set<AdmRegion>();
    interns.forEach(intern => {
      if (intern.school) {
        schools.add(intern.school);
        admRegions.add(intern.school.adm_region);
      }
    });

    const schoolsArr = Array.from(schools);
    const admRegionsArr = Array.from(admRegions);

    const totalSchoolsServed = schoolsArr.length;
    const totalPublicSchools = schoolsArr.reduce(
      (acc, cur) => (cur.adm_region.cre ? acc + 1 : acc),
      0,
    );
    const totalPrivateSchools = schoolsArr.reduce(
      (acc, cur) => (!cur.adm_region.cre ? acc + 1 : acc),
      0,
    );
    const publicSchoolsCREs = admRegionsArr.reduce(
      (acc, cur) => (cur.cre ? [...acc, cur.name] : acc),
      [] as string[],
    );
    const privateSchoolsCities = admRegionsArr.reduce(
      (acc, cur) => (!cur.cre ? [...acc, cur.name] : acc),
      [] as string[],
    );
    const schoolAddresses = schoolsArr.map(school => school.address);

    const report = new SchoolData();
    Object.assign(report, {
      totalSchoolsServed,
      totalPublicSchools,
      totalPrivateSchools,
      publicSchoolsCREs,
      privateSchoolsCities,
      schoolAddresses,
    });

    return report;
  }
}

export default SchoolDataReportService;
