export default interface ICreateAssessmentDTO {
  internship_id: string;
  ended: boolean;
  class_plan: number[];
  class_plan_comments?: string;
  content: number[];
  content_comments?: string;
  class_experience: number[];
  class_experience_comments?: string;
  methodology: number[];
  methodology_comments?: string;
  didactic: number[];
  didactic_comments?: string;
  evaluation: number[];
  evaluation_comments?: string;
  communication: number[];
  communication_comments?: string;
  general: number[];
  general_comments?: string;
}
