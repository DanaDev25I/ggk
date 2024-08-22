import { useStateContext } from '../../store/usecontext';

function Images() {
  const { data } = useStateContext();

  console.log(data);

  return (
    <div className="flex flex-wrap shadow  justify-center items-center">
      {data && data.length > 0 ? (
        data.map((item, index) => (
          item.pagemap && item.pagemap.cse_image && item.pagemap.cse_image.length > 0 && (
            <a 
              href={item.link} 
              target="_blank" 
              key={index} 
              rel="noreferrer" 
              className="sm:p-3 p-5"
            >
              <div className="m-4 ">
                <img 
                  src={item.pagemap.cse_image[0].src} 
                  alt={`Thumbnail ${index}`} 
                  className="w-64 h-auto rounded" 
                />
                <p className="sm:w-36 w-36 break-words text-sm mt-2">{item.title}</p>
              </div>
            </a>
          )
        ))
      ) : (
        <p>No images found.</p>
      )}
    </div>
  );
}

export default Images;
