import CardListItem from '@/components/resume/card/CardListItem';

interface ISideProjectSectionProps {
  data: ICompanyProperties[];
  projects: IProjectProperties[];
  filters: string[];
  pointColor: string;
}

const SideProjectSection = ({ data, projects, filters, pointColor }: ISideProjectSectionProps) => {
  return (
    <section className='career'>
      <div className='group__header'>
        <span className='box-icon'>⚽️</span>
        <h4 style={{ color: pointColor }} className='box-title'>
          SIDE PROJECT
        </h4>
      </div>

      {data.map((company, index) => (
        <CardListItem
          key={company.id}
          info={company}
          filters={filters}
          subInfo={projects}
          isLastCompany={!filters[index + 1]}
        />
      ))}
    </section>
  );
};

export default SideProjectSection;
