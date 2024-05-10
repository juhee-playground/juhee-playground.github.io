
interface Props {
  message: string;
}
const LiveSection = ({ message = 'Please wait. Loading products' } : Props) => {
  return (
    <div aria-live="assertive" role="alert">
      {message}
    </div>
  );
};

export default LiveSection;
