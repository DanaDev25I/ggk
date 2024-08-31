import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardFooter, Image, Button } from '@nextui-org/react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

function MovieCard({ item }) {
  const [copiedUrl, setCopiedUrl] = useState(null);

  const handleCopy = (url) => {
    navigator.clipboard.writeText(url).then(() => {
      setCopiedUrl(url);
      setTimeout(() => setCopiedUrl(null), 2000); // Reset after 2 seconds
    });
  };
//make it responsive to laptop 
  return (
    <TooltipProvider>
    <Tooltip>
      <TooltipTrigger>
        <Card key={item.url} isFooterBlurred className="sm:w-[444px] w-[180px] flex flex-wrap h-[220px] sm:h-[335px] bg-white border-none">
          <div className="relative w-full h-full overflow-hidden">
            <Link to={item.url}>
              <Image
                removeWrapper
                alt={item.name}
                className="w-full px-[20px] sm:p-[37px] h-full bg-gradient-to-bl from-slate-200 to-slate-400 object-scale-down transition-transform duration-300 ease-in-out transform hover:scale-110"
                src={item.image}
              />
            </Link>
          </div>
          <CardFooter className="absolute h-[40] text-center bottom-0 border-t border-zinc-100/50 z-10  flex justify-between place-items-center">
          <div className='flex-wrap  flex  items-center'>
          <p className="text-black md:font-bold  md:text-lg text-xs translate-x-[-5]  lg:text-base font-medium truncate">{item.name}</p>
              </div>
            <Button
                size="sm"
                onClick={() => handleCopy(item.url)}
                color={copiedUrl === item.url ? 'success' : 'primary'}
                className="text-sm md:text-xl    sm:p-6"
              >
                {copiedUrl === item.url ? 'Copied!' : 'Copy Link'}
              </Button>
          </CardFooter>
        </Card>
      </TooltipTrigger>
      <TooltipContent>
        <p>{item.tooltip}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
  );
}

export default MovieCard;

