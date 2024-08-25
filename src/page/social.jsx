
import Allsites from "@/constant/constant";
import MovieCard from "./card"; 

function Social() {
   

  return (
    <div className="p-4">
      <div className="mb-4">
<<<<<<< HEAD
        <h1>Sport</h1>
=======
        <h1>Social</h1>
>>>>>>> 2bbc6d9a3119c8507f3bceda4be07c85ba524a0f
       
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Allsites.Social.length > 0 ? (
          Allsites.Social.map((item) => (
            <MovieCard key={item.url} item={item} />
          ))
        ) : (
          <p className="text-center col-span-full">No items found for the selected category.</p>
        )}
      </div>
    </div>
  );
}

export default Social;
