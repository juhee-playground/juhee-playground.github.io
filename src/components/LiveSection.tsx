interface ILiveSectionProps {
  message: string;
}
const LiveSection = ({ message }: ILiveSectionProps) => {
  return (
    <div aria-live='assertive' role='alert'>
      {message}
    </div>
  );
};

export default LiveSection;
