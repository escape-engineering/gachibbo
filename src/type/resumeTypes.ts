export interface ResumeFormType {
  user_uuid: string;
  post_id: string;
  use_point: string | number;
  isadopted: boolean;
  experience: string | number;
  region: string | number;
  post_title: string | number;
  resume_url: string;
  portfolio_url: string;
  post_desc: string | number;
  name: string | number;
  gender: string | number;
  phoneNum: string | number;
  email: string | number;
  address: string | number;
}

export interface EduFormType {
  edu_id: string;
  graduated_at: string;
  school_name: string;
  major: string;
  post_id: string;
  user_uuid: string;
}

export interface ExpFormType {
  exp_id: string;
  exp_period: string;
  exp_region: string;
  exp_position: string;
  exp_desc: string;
  post_id: string;
  user_uuid: string;
}

export interface LicFormType {
  lic_id: string;
  lic_date: string;
  lic_title: string;
  lic_agency: string;
  post_id: string;
  user_uuid: string;
}

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
