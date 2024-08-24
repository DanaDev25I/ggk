import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardFooter, Image, Button } from '@nextui-org/react';

function MovieCard({ item }) {
  const [copiedUrl, setCopiedUrl] = useState(null);

  const handleCopy = (url) => {
    navigator.clipboard.writeText(url).then(() => {
      setCopiedUrl(url);
      setTimeout(() => setCopiedUrl(null), 2000); // Reset after 2 seconds
    });
  };

  return (
    <Card key={item.url} isFooterBlurred className="w-full h-[300px] bg-transparent border-none shadow-lg">
      <div className="relative w-full h-full overflow-hidden">
        <Link to={item.url}>
          <Image
            removeWrapper
            alt={item.name}
          x     className="w-full h-[250px] bg-gradient-to-bl bg-gradient-to-r from-slate-200 to-slate-300 object-scale-down transition-transform duration-300 ease-in-out transform hover:scale-110"
            src={item.image}
          />
        </Link>
       
      </div>
      <CardFooter className="absolute bottom-0 border-t border-zinc-100/50 z-10 p-2 flex justify-between items-center">
        <div>
          <p className="text-black font-medium text-lg">{item.name}</p>
        </div>
        <Button
          size="sm"
          onClick={() => handleCopy(item.url)}
          color={copiedUrl === item.url ? 'success' : 'primary'}
        >
          {copiedUrl === item.url ? 'Copied!' : 'Copy Link'}
        </Button>
      </CardFooter>
    </Card>
  );
}

export default MovieCard;
