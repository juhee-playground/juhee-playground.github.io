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

  const { pointColor } = useSettings();
  const { mode } = usePrintMode();
  const seenCompaniesRef = useRef<readonly string[]>([]);

  const { projectQuery, toyProjectData, companies, skillOptions, parseCompanyQuery, parseProjectQuery } = useResumeData(
    { selectedCompanies, selectedSkillOptions, sortValue },
  );

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
