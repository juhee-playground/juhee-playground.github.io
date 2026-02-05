import CardListItem from '@/components/resume/card/CardListItem';

interface ISideProjectSectionProps {
  data: ICompanyProperties[];
  projects: IProjectProperties[];
  filters: string[];
  pointColor: string;
}

const SideProjectSection = ({ data, projects, filters, pointColor }: ISideProjectSectionProps) => {
  return (
    <section className='p-1 px-2'>
      <div className='flex items-center my-2'>
        <span className='px-1'>⚽️</span>
        <h4 style={{ color: pointColor }} className='m-0 px-1 leading-7'>
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
