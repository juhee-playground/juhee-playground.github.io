import { useEffect, useRef, useState } from 'react';

import { SelectChangeEvent } from '@mui/material/Select';

import ResumeView from '@/components/resume/ResumeView';
import usePrintMode from '@/hooks/usePrintMode';
import useResumeData from '@/hooks/useResumeMainData';
import { useSettings } from '@/stores/useSettings';

const ResumeContainer = () => {
  const [sortValue, setSortValue] = useState('N');
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>();
  const [selectedSkillOptions, setSelectedSkillOptions] = useState<string[]>();
  const [selectedProjectTypes, setSelectedProjectTypes] = useState<string[]>();

  const { pointColor } = useSettings();
  const { mode } = usePrintMode();
  const seenCompaniesRef = useRef<readonly string[]>([]);

  const {
    projectQuery,
    toyProjectData,
    companies,
    skillOptions,
    projectTypeOptions,
    parseCompanyQuery,
    parseProjectQuery,
  } = useResumeData({
    selectedCompanies,
    selectedSkillOptions,
    selectedProjectTypes,
    sortValue,
  });

  useEffect(() => {
    const seen = seenCompaniesRef.current;
    const arrived = companies.filter(name => !seen.includes(name));
    seenCompaniesRef.current = companies;
    if (arrived.length === 0) return;

    setSelectedCompanies(current => {
      if (!current) return [...companies];
      const added = arrived.filter(name => !current.includes(name));
      return added.length === 0 ? current : [...current, ...added];
    });
  }, [companies]);

  useEffect(() => {
    if (!selectedSkillOptions) setSelectedSkillOptions(skillOptions);
  }, [skillOptions, selectedSkillOptions]);

  useEffect(() => {
    if (projectTypeOptions.length === 0) return;
    setSelectedProjectTypes(current => {
      if (!current) return [...projectTypeOptions];
      const arrived = projectTypeOptions.filter(name => !current.includes(name));
      return arrived.length === 0 ? current : [...current, ...arrived];
    });
  }, [projectTypeOptions]);

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

  const handleChangeSelectedProjectTypes = (projectType: string) => {
    setSelectedProjectTypes(prev =>
      prev?.includes(projectType)
        ? prev.filter(name => name !== projectType)
        : [...(prev || []), projectType],
    );
  };

  return (
    <ResumeView
      isLoading={projectQuery.isLoading}
      sortValue={sortValue}
      onChangeSort={handleChangeSelect}
      companies={companies}
      skillOptions={skillOptions}
      projectTypeOptions={projectTypeOptions}
      selectedCompanies={selectedCompanies}
      selectedSkillOptions={selectedSkillOptions}
      selectedProjectTypes={selectedProjectTypes}
      onChangeCompany={handleChangeSelectedCompanies}
      onChangeSkill={handleChangeSelectedSkillOptions}
      onChangeProjectType={handleChangeSelectedProjectTypes}
      pointColorHex={pointColor.hex}
      mode={mode}
      parseCompanyQuery={parseCompanyQuery}
      parseProjectQuery={parseProjectQuery}
      toyProjectData={toyProjectData}
    />
  );
};

export default ResumeContainer;
