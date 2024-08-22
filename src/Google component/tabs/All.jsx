
import { useStateContext } from '../../store/usecontext';

function All() {
  const { data } = useStateContext();


  return (
    <div className="sm:px-56 flex flex-wrap justify-between space-y-6">
      {data?.map(({ link, title }, index) => (
        <div key={index} className="md:w-2/5 w-full">
          <a href={link}  rel="noreferrer">
            <p className="text-xl ">
              {link.length > 30 ? `${link.substring(0, 30)}...` : link}
            </p>
            <p className="text- hover:underline dark:text-blue-300 text-blue-700">
              {title}
            </p>
          </a>
        </div>
      ))}
    </div>
  );
}

export default All;
