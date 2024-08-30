import { useStateContext } from '../../store/usecontext';
import { Card, CardFooter, Image } from '@nextui-org/react';
import { Skeleton } from '@nextui-org/react';

function Images() {
  const { data, loading } = useStateContext();

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-5">
        {/* Show skeleton loaders while data is loading */}
        <Skeleton
          className="w-full h-48 mb-4"
          variant="rect"
        />
        <Skeleton
          className="w-1/2 h-6 mb-2"
          variant="text"
        />
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-3 p-5">
      {data && data.length > 0 ? (
        data.map((item, index) => (
          item.pagemap && item.pagemap.cse_image && item.pagemap.cse_image.length > 0 && (
            <Card
              key={index}
              isFooterBlurred
              className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2 flex flex-col h-[335px] bg-white border-none shadow-lg"
            >
              <div className="relative w-full h-full overflow-hidden">
                <a href={item.link} target="_blank" rel="noreferrer" className="block w-full h-full">
                  <Image
                    removeWrapper
                    alt={`Thumbnail ${index}`}
                    className="w-full h-full object-scale-down transition-transform duration-300 ease-in-out transform hover:scale-110"
                    src={item.pagemap.cse_image[0].src}
                  />
                </a>
              </div>
              <CardFooter className="absolute bottom-0 w-full text-center border-t border-gray-200 bg-white z-10 p-2">
                <p className="text-black text-sm font-medium truncate">{item.title}</p>
              </CardFooter>
            </Card>
          )
        ))
      ) : (
        <p>No images found.</p>
      )}
    </div>
  );
}

export default Images;
