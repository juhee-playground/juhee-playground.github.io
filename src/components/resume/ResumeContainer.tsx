import { useEffect, useState } from 'react';

import { SelectChangeEvent } from '@mui/material/Select';

import ResumeView from '@/components/resume/ResumeView';
import useResumeData from '@/hooks/useResumeMainData';
import { useAppSelector } from '@/redux/hooks';

const ResumeContainer = () => {
  const [sortValue, setSortValue] = useState('N');
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>();
  const [selectedSkillOptions, setSelectedSkillOptions] = useState<string[]>();

  const { pointColor, isPrintMode } = useAppSelector(state => state.settings);
  const mode = isPrintMode ? 'print' : '';

  const { projectQuery, toyProjectData, companies, skillOptions, parseCompanyQuery, parseProjectQuery } = useResumeData(
    { selectedCompanies, selectedSkillOptions, sortValue },
  );

  useEffect(() => {
    if (!selectedCompanies) setSelectedCompanies(companies);
  }, [companies, selectedCompanies]);

  useEffect(() => {
    if (!selectedSkillOptions) setSelectedSkillOptions(skillOptions);
  }, [skillOptions, selectedSkillOptions]);

  const handleChangeSelect = (event: SelectChangeEvent) => setSortValue(event.target.value);

  const handleChangeSelectedCompanies = (company: string) => {
    setSelectedCompanies(prev =>
      prev?.includes(company) ? prev.filter(name => name !== company) : [...(prev || []), company],
    );
  };

  const handleChangeSelectedSkillOptions = (skill: string) => {
    setSelectedSkillOptions(prev =>
      prev?.includes(skill) ? prev.filter(name => name !== skill) : [...(prev || []), skill],
    );
  };

  return (
    <ResumeView
      isLoading={projectQuery.isLoading}
      sortValue={sortValue}
      onChangeSort={handleChangeSelect}
      companies={companies}
      skillOptions={skillOptions}
      selectedCompanies={selectedCompanies}
      selectedSkillOptions={selectedSkillOptions}
      onChangeCompany={handleChangeSelectedCompanies}
      onChangeSkill={handleChangeSelectedSkillOptions}
      pointColorHex={pointColor.hex}
      mode={mode}
      parseCompanyQuery={parseCompanyQuery}
      parseProjectQuery={parseProjectQuery}
      toyProjectData={toyProjectData}
    />
  );
};

export default ResumeContainer;
