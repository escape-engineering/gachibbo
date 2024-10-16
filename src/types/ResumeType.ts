export interface EducationType {
  edu_id: string;
  graduated_at: string;
  school_name: string;
  major: string;
}
export interface ExperienceType {
  exp_id: string;
  exp_period: string;
  exp_region: string;
  exp_position: string;
  exp_desc: string;
}
export interface LicenseType {
  lic_id: string;
  lic_date: string;
  lic_title: string;
  lic_agency: string;
}

export interface ResumeType {
  user_uuid: string;
  post_id: string;
  use_point: number;
  isadopted: boolean;
  experience: number;
  region: string;
  post_title: string;
  resume_url: string;
  portfolio_url: string;
  post_desc: string;
  name: string;
  gender: string;
  phoneNum: string;
  email: string;
  address: string;
}

export interface CommentType {
  feedback_id: string;
  post_id: string;
  user_uuid: string;
  feedback_desc: string;
}
