import CONTENT_MAIN from '@/constants/description';
import { useSettings } from '@/stores/useSettings';

interface ICardContentProperty {
  content: string;
  link?: string;
  bold: string;
}

const contents = CONTENT_MAIN;

const PointStackCard = () => {
  const { pointColor } = useSettings();
  return (
    <div className='px-3'>
      <div className='flex items-center mb-2'>
        <span className='px-1'>⚽️</span>
        <h4 style={{ color: pointColor.hex }} className='m-0 px-1 leading-7'>
          OVERVIEW
        </h4>
      </div>
      <hr className='w-full my-0.5' />

      <ul className='p-1'>
        {contents.map((card: ICardContentProperty) => {
          const { content, link, bold } = card;
          const [prefix, suffix] = content.split(bold);
          return (
            <li key={content} className='text-[13px] p-1'>
              {bold ? (
                <>
                  {prefix}

                  <a href={link} className='no-underline text-inherit'>
                    <b className='font-extrabold'>{bold}</b>
                  </a>

                  {suffix}
                </>
              ) : (
                content
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default PointStackCard;
