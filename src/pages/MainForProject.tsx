// import React, { useEffect, useState } from 'react';
// import { AxiosError } from 'axios';
// import { format, differenceInYears, differenceInMonths } from 'date-fns';

// import { getCompanies, getProjects, getStackOptions, getRoleOptions } from '../api/notion';
// import { useQuery } from 'react-query';

// import './Main.scss';
// import Chip from '@mui/material/Chip';
// import Stack from '@mui/material/Stack';
// import LabelIcon from '@mui/icons-material/Label';
// import DChip from 'components/custom/DChip';
// import ToggleChip from 'components/custom/ToggleChip';

// interface filterSelected {
//   [key: string]: string[];
// }

export default function Main() {
  //   const companyQuery = useQuery<NotionData[], AxiosError, NotionData[]>(['getCompanies'], () =>
  //     getCompanies(),
  //   );
  //   const projectQuery = useQuery<NotionData[], AxiosError, NotionData[]>(['getProjects'], () => getProjects());
  //   const stackSelectOptions = useQuery<SelectProperty[], AxiosError, SelectProperty[]>(
  //     ['getStackOptions'],
  //     () => getStackOptions(),
  //   );
  //   // const roleSelectOptions = useQuery<SelectProperty[], AxiosError, SelectProperty[]>(['getRoleOptions'], () =>
  //   //   getRoleOptions(),
  //   // );
  //   const companies = companyQuery.data
  //     ? companyQuery.data.map((company) => company.properties.name.title[0].plain_text)
  //     : [];
  //   // const stackOptions = stackSelectOptions.data ? stackSelectOptions.data.map((select) => select.name) : [];
  //   const filterDefault = {
  //     company: [],
  //     stack: [],
  //   };
  //   const [selectedChips, setSelectedChips] = useState<filterSelected>(filterDefault);
  //   const handleChange = (option: string, key: string): void => {
  //     setSelectedChips((prevChips: filterSelected): filterSelected => {
  //       const newChips = JSON.parse(JSON.stringify(prevChips));
  //       if (prevChips[key].includes(option)) {
  //         newChips[key] = prevChips[key].filter((chip: string) => chip !== option);
  //       } else {
  //         newChips[key] = [...prevChips[key], option];
  //       }
  //       return newChips;
  //     });
  //   };
  //   if (projectQuery.data) {
  //     const aaa = projectQuery.data.filter((project) => {
  //       const stacks = project.properties.stack.multi_select;
  //       const filtering = stacks.filter((stack: any) => selectedChips.stack.includes(stack.name));
  //       return filtering;
  //     });
  //   }
  //   if (companyQuery.data) {
  //     const bbb = companyQuery.data.filter((company) => {
  //       const name = company.properties.name.title;
  //       const filtering = selectedChips.company.includes(name[0].plain_text);
  //       return filtering;
  //     });
  //   }
  //   return (
  //     <div className='section-right'>
  //       <section className='action'>
  //         <ul className='filter__container'>
  //           <li className='list__item'>
  //             <span className='filter__left'>회사별 </span>
  //             <div className='filter__chips'>
  //               <Stack direction='row' spacing={1}>
  //                 {companies.map((company: string, index: number) => (
  //                   <ToggleChip
  //                     key={`company_${index}`}
  //                     label={company}
  //                     color='primary'
  //                     clickable={true}
  //                     parentFunction={() => handleChange(company, 'company')}
  //                   />
  //                 ))}
  //               </Stack>
  //             </div>
  //           </li>
  //           <li className='list__item'>
  //             <span className='filter__left'>스택별 </span>
  //             <div className='filter__chips'>
  //               <Stack direction='row' flexWrap='wrap' spacing={1} useFlexGap>
  //                 {stackSelectOptions.data ? (
  //                   stackSelectOptions.data.map((select: SelectProperty) => {
  //                     const { id, name, color } = select;
  //                     return (
  //                       <DChip
  //                         key={id}
  //                         color={color}
  //                         label={name}
  //                         clickable={true}
  //                         parentFunction={() => handleChange(name, 'stack')}
  //                       />
  //                     );
  //                   })
  //                 ) : (
  //                   <DChip color='a' label='Vue' clickable={false} />
  //                 )}
  //               </Stack>
  //             </div>
  //           </li>
  //           {/* <li className='list__item'>
  //             <span className='filter__left'>시간별 : </span>
  //             <div className='filter__chips'>
  //               <Chip sx={{ borderRadius: 1 }} label='최근 3개월' size='small' variant='outlined' />
  //               <Chip sx={{ borderRadius: 1 }} label='6개월' size='small' variant='outlined' />
  //               <Chip sx={{ borderRadius: 1 }} label='1년' size='small' variant='outlined' />
  //               <Chip sx={{ borderRadius: 1 }} label='전체' size='small' variant='outlined' />
  //             </div>
  //           </li> */}
  //         </ul>
  //         <div>
  //           선택한 것은:
  //           <p>{selectedChips ? selectedChips.stack : null}</p>
  //         </div>
  //       </section>
  //       <section className='career'></section>
  //     </div>
  //   );
}
