import CardListItem from '@/components/resume/card/CardListItem';

interface ICareerSectionProps {
  data: ICompanyProperties[];
  projects: IProjectProperties[];
  filters: string[];
  pointColor: string;
}

const CareerSection = ({ data, projects, filters, pointColor }: ICareerSectionProps) => {
  return (
    <section className='career'>
      <div className='group__header'>
        <span className='box-icon'>⚽️</span>
        <h4 style={{ color: pointColor }} className='box-title'>
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
