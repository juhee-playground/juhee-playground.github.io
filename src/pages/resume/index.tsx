import { useState, useEffect } from 'react';

import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useTheme } from '@mui/material/styles';

import Loading from '@/components/Loading';
import useResumeMainData from '@/hooks/useResumeMainData';
import CardListItem from '@/pages/resume/card/CardListItem';
import FilterOption from '@/pages/resume/filter/FilterOption';
import PointStackCard from '@/pages/resume/overview/Card';
import LeftSection from '@/pages/resume/panel/LeftInfoPanel';

import { useAppSelector } from '@/redux/hooks';
import type { TRootState } from '@/redux/store';

import './index.scss';

export default function Main() {
  const [sortValue, setSortValue] = useState('N');
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>();
  const [selectedSkillOptions, setSelectedSkillOptions] = useState<string[]>();

  const theme = useTheme();
  const { pointColor, isPrintMode } = useAppSelector((state: TRootState) => state.settings);
  const mode = isPrintMode ? 'print' : '';

  const {
    projectQuery,
    mainSkillSelectOptions,
    toyProjectData,
    companies,
    skillOptions,
    parseCompanyQuery,
    parseProjectQuery,
  } = useResumeMainData({ selectedCompanies, selectedSkillOptions, sortValue });

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
    <>
      <LeftSection />
      <div
        className={`section-right section-right--${theme.palette.mode} ${isPrintMode ? `section-right--${mode}` : ''}`}
      >
        {projectQuery.isLoading && <Loading />}

        <section className={isPrintMode ? `action--${mode}` : 'action'}>
          <ul className='filter__container'>
            <FilterOption
              options={companies}
              title='company'
              selected={selectedCompanies}
              color={pointColor.hex}
              onChange={handleChangeSelectedCompanies}
            />
            <FilterOption
              options={skillOptions}
              colorOptions={mainSkillSelectOptions.data}
              color={pointColor.hex}
              title='skill'
              selected={selectedSkillOptions}
              onChange={handleChangeSelectedSkillOptions}
            />
          </ul>

          <div className='sort__container'>
            <FormControl sx={{ m: 1, minWidth: 120 }} size='small'>
              <InputLabel id='demo-select-small-label'>정렬방법</InputLabel>
              <Select
                className='sort__select-input'
                labelId='demo-simple-select-label'
                id='demo-select-small'
                value={sortValue}
                label='정렬방법'
                onChange={handleChangeSelect}
              >
                <MenuItem sx={{ color: theme.palette.mode === 'dark' ? 'white' : 'black' }} value='N'>
                  최신순
                </MenuItem>
                <MenuItem sx={{ color: theme.palette.mode === 'dark' ? 'white' : 'black' }} value='O'>
                  오래된순
                </MenuItem>
              </Select>
            </FormControl>
          </div>

          <hr className='hrBasic' />
        </section>

        <PointStackCard />

        <hr className='hrBasic' />

        <section className='career'>
          <div className='group__header'>
            <span className='box-icon'>⚽️</span>
            <h4 style={{ color: pointColor.hex }} className='box-title'>
              CAREER
            </h4>
          </div>

          {parseCompanyQuery.map((company, index) => (
            <CardListItem
              key={company.id}
              info={company}
              subInfo={parseProjectQuery}
              filters={companies}
              isLastCompany={!companies[index + 1]}
            />
          ))}
        </section>

        <hr className='hrBasic' />

        <section className='career'>
          <div className='group__header'>
            <span className='box-icon'>⚽️</span>
            <h4 style={{ color: pointColor.hex }} className='box-title'>
              SIDE PROJECT
            </h4>
          </div>

          {toyProjectData.map((company, index) => (
            <CardListItem
              key={company.id}
              info={company}
              filters={skillOptions}
              subInfo={parseProjectQuery}
              isLastCompany={!companies[index + 1]}
            />
          ))}
        </section>
      </div>
    </>
  );
}
