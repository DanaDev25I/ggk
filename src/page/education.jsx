
import  Allsites from "@/constant/constant";
import MovieCard from "./card"; 
import backgroundImage from "../../public/img/Apa.jpg";

function Sport() {
  

  return (
    <div className="relative">
      <section className="relative h-[200px] sm:h-[300px] lg:h-[600px] border-[rgb(69,215,203)] border">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src={backgroundImage}
            className="w-full h-full object-fill"
            alt="Sport Background"
          />
        </div>
        {/* Overlay Content */}
        <div className="relative border border-[rgb(69,215,203)] shadow-lg z-10 h-[637px] flex flex-col justify-between p-12  bg-black bg-opacity-60">
          <div className="flex items-center justify-evenly h-[80px] sm:h-[100px] lg:h-[120px]">
            <div className="md:border-b-[7px] border-b-5 translate-x-[-70px] translate-y-[-60px] md:translate-x-[-340px] md:translate-y-[-40px] md:p-4 border-[rgb(69,215,203)] py-2 rounded-xl md:rounded-full">
              <h1 className="text-white md:text-4xl font-bold">Apps</h1>
            </div>

          </div>
        </div>
      </section>

      <div className="relative bottom-10 md:bottom-16 border-b-0 z-20 grid border-t-0 p-6 grid-cols-2 gap-4 sm:grid-cols-2 border-[rgb(69,215,203)] border-3 lg:grid-cols-4 bg-gradient-to-b from-gray-400 via-white to-white dark:bg-gradient-to-t dark:from-black dark:to-gray-600">
      {Allsites.Education.length > 0 ? (
          Allsites.Education.map((item) => (
            <div key={item.url} className="relative w-[174px] h-[225px] md:h-[296px] md:w-[365px] border-3 p-0 m-0 rounded-2xl border-[rgb(69,215,203)]">
            <MovieCard key={item.url} item={item} />

            </div>
          ))
        ) : (
          <p className="text-center col-span-full">No items found for the selected category.</p>
        )}
      </div>
    </div>
  );
}

export default Sport;
