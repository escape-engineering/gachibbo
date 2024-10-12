import { EducationType, ExperienceType, LicenseType } from '@/types/ResumeType';

const EMPTY_EDU_OBJ: EducationType = {
  graduated_at: '',
  school_name: '',
  major: ''
};
const EMPTY_EXP_OBJ: ExperienceType = {
  exp_period: '',
  exp_desc: '',
  exp_position: '',
  exp_region: ''
};
const EMPTY_LIC_OBJ: LicenseType = {
  lic_date: '',
  lic_title: '',
  lic_agency: ''
};

export { EMPTY_EDU_OBJ, EMPTY_EXP_OBJ, EMPTY_LIC_OBJ };
