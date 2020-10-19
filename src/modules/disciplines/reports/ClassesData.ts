import { Expose } from 'class-transformer';

export default class ClassesData {
  disciplinesTotal: number;

  disciplinesCodes: string[];

  disciplinesClasses: {
    [key: string]: string[];
  };

  classesEnrolled: number[];

  classesRegistered: number[];

  @Expose({ name: 'studentsServed' })
  getStudentsServedPercentage(): string[] {
    const percentages: string[] = [];

    for (let i = 0; i < this.classesEnrolled.length; i += 1) {
      percentages.push(
        ((this.classesRegistered[i] / this.classesEnrolled[i]) * 100).toFixed(
          2,
        ),
      );
    }

    return percentages;
  }
}
