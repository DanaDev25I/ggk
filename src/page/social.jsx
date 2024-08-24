
import Allsites from "@/constant/constant";
import MovieCard from "./card"; 

function Social() {
   

  return (
    <div className="p-4">
      <div className="mb-4">
        <h1>Social</h1>
       
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
