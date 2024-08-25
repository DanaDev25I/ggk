
import Allsites from "@/constant/constant";
import MovieCard from "./card"; 

function Movies() {
   

  return (
    <div className="p-4">
      <div className="mb-4">
        <h1>Sports</h1>
       
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Allsites.Sports.length > 0 ? (
          Allsites.Sports.map((item) => (
            <MovieCard key={item.url} item={item} />
          ))
        ) : (
          <p className="text-center col-span-full">No items found for the selected category.</p>
        )}
      </div>
    </div>
  );
}

export default Movies;
