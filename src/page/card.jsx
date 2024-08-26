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

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Card key={item.url} isFooterBlurred className="w-[400] h-[270px] md:h-[330px] bg-transparent border-none shadow-lg">
            <div className="relative w-full h-full overflow-hidden">
              <Link to={item.url}>
                <Image
                  removeWrapper
                  alt={item.name}
                  className="w-full px-[20px] md:p-[37px] h-full bg-gradient-to-bl from-slate-200 to-slate-400 object-scale-down transition-transform duration-300 ease-in-out transform hover:scale-110"
                  src={item.image}
                />
              </Link>
            </div>
            <CardFooter className="absolute  bottom-0 border-t border-zinc-100/50 z-10 p-2 flex justify-between items-center">
              <div className=''>
                <p className="text-black  pr-2 md:py-1 md:pl-3 font-medium text-xl">{item.name}</p>
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
        </TooltipTrigger>
        <TooltipContent>
          <p>{item.tooltip}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default MovieCard;
