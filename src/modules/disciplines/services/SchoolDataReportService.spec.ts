/* eslint-disable no-await-in-loop */

import 'reflect-metadata';

import School from '@modules/schools/infra/typeorm/entities/School';
import AdmRegion from '@modules/schools/infra/typeorm/entities/AdmRegion';
import FakeProfessorsRepository from '@modules/users/repositories/fakes/FakeProfessorsRepository';
import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import SchoolDataReportService from './SchoolDataReportService';
import FakeInternshipsRepository from '../repositories/fakes/FakeInternshipsRepository';
import Internship from '../infra/typeorm/entities/Internship';
import SchoolData from '../reports/SchoolData';

let fakeInternshipsRepository: FakeInternshipsRepository;
let fakeProfessorsRepository: FakeProfessorsRepository;
let schoolDataReportService: SchoolDataReportService;

interface IFakeInternship {
  index: number;
  cre_name: string;
  school_name: string;
}

async function createFakeInternship({
  index,
  cre_name,
  school_name,
}: IFakeInternship): Promise<Internship> {
  const cre = new AdmRegion();
  Object.assign(cre, {
    cre: !!(index % 2),
    name: cre_name,
  });

  const school = new School();
  Object.assign(school, {
    name: school_name,
    address: `${school_name} address`,
    adm_region: cre,
  });

  const internship = new Internship();
  Object.assign(internship, {
    student_id: 'student-id',
    class_id: 'class-id',
    class_discipline_id: 'class-discipline-id',
    class_professor_id: 'professor-id',
    school_id: index !== 5 ? `school-${index}` : null,
    school: index !== 5 ? school : null,
  });

  return internship;
}

describe('SchoolDataReport', () => {
  beforeEach(() => {
    fakeInternshipsRepository = new FakeInternshipsRepository();
    fakeProfessorsRepository = new FakeProfessorsRepository();
    schoolDataReportService = new SchoolDataReportService(
      fakeInternshipsRepository,
      fakeProfessorsRepository,
    );
  });

  it("should return the 'School Data Report' for all the students/interns of a Professor", async () => {
    await fakeProfessorsRepository.createUserOfType({
      id: 'professor-id',
      user_id: 'user-id',
      user: new User(),
    });

    for (let i = 1; i <= 5; i += 1) {
      await fakeInternshipsRepository.create(
        await createFakeInternship({
          index: i,
          school_name: `school-${i}`,
          cre_name: `cre-${i}`,
        }),
      );
    }

    const response = await schoolDataReportService.execute({
      user_id: 'user-id',
      professor_id: 'professor-id',
    });

    expect(response).toBeInstanceOf(SchoolData);
    expect(response).toEqual(
      expect.objectContaining({
        totalSchoolsServed: 4,
        totalPublicSchools: 2,
        totalPrivateSchools: 2,
        publicSchoolsCREs: expect.arrayContaining(['cre-1', 'cre-3']),
        privateSchoolsCities: expect.arrayContaining(['cre-2', 'cre-4']),
        schoolAddresses: expect.arrayContaining([
          'school-1 address',
          'school-2 address',
          'school-3 address',
          'school-4 address',
        ]),
      }),
    );
  });

  it('should not return a report if the professor does not exist', async () => {
    await expect(
      schoolDataReportService.execute({
        user_id: 'invalid-user',
        professor_id: 'invalid-professor',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
