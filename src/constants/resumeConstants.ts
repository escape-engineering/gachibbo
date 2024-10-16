import { EducationType, ExperienceType, LicenseType } from '@/type/resumeTypes';

const EMPTY_EDU_OBJ: Omit<EducationType, 'edu_id'> = {
  graduated_at: '',
  school_name: '',
  major: ''
};
const EMPTY_EXP_OBJ: Omit<ExperienceType, 'exp_id'> = {
  exp_period: '',
  exp_desc: '',
  exp_position: '',
  exp_region: ''
};
const EMPTY_LIC_OBJ: Omit<LicenseType, 'lic_id'> = {
  lic_date: '',
  lic_title: '',
  lic_agency: ''
};

export { EMPTY_EDU_OBJ, EMPTY_EXP_OBJ, EMPTY_LIC_OBJ };
