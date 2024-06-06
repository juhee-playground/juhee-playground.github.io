
interface ILiveSectionProps {
  message: string;
}
const LiveSection = ({ message = 'Please wait. Loading products' } : ILiveSectionProps) => {
  return (
    <div aria-live="assertive" role="alert">
      {message}
    </div>
  );
};

export default LiveSection;
