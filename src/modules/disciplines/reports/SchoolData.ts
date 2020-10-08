import { Expose } from 'class-transformer';

export default class SchoolData {
  totalSchoolsServed: number;

  totalPublicSchools: number;

  totalPrivateSchools: number;

  publicSchoolsCREs: string[];

  privateSchoolsCities: string[];

  schoolAddresses: string[];

  @Expose({ name: 'publicSchoolsPercentage ' })
  getPublicSchoolPercentage(): string {
    const percentage = (
      (this.totalPublicSchools / this.totalSchoolsServed) *
      100
    ).toFixed(2);

    return percentage.toString();
  }

  @Expose({ name: 'privateSchoolsPercentage ' })
  getPrivateSchoolPercentage(): string {
    const percentage = (
      (this.totalPrivateSchools / this.totalSchoolsServed) *
      100
    ).toFixed(2);

    return percentage.toString();
  }
}
