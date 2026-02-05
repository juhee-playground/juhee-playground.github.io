import CardListItem from '@/components/resume/card/CardListItem';

interface ICareerSectionProps {
  data: ICompanyProperties[];
  projects: IProjectProperties[];
  filters: string[];
  pointColor: string;
}

const CareerSection = ({ data, projects, filters, pointColor }: ICareerSectionProps) => {
  return (
    <section className='p-1 px-2'>
      <div className='flex items-center my-2'>
        <span className='px-1'>⚽️</span>
        <h4 style={{ color: pointColor }} className='m-0 px-1 leading-7'>
          CAREER
        </h4>
      </div>

      {data.map((company, index) => (
        <CardListItem
          key={company.id}
          info={company}
          subInfo={projects}
          filters={filters}
          isLastCompany={!filters[index + 1]}
        />
      ))}
    </section>
  );
};

export default CareerSection;
