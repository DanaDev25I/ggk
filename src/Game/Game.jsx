import { Button } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import '../index.css';

const images = [
  { src: "/img/helmet-1.png", matched: false }, 
  { src: "/img/potion-1.png", matched: false },
  { src: "/img/ring-1.png", matched: false },
  { src: "/img/scroll-1.png", matched: false },
  { src: "/img/shield-1.png", matched: false },
  { src: "/img/sword-1.png", matched: false },
];

function Card() {
  const [cards, setCards] = useState([]);
  const [firstCard, setFirstCard] = useState(null);
  const [secondCard, setSecondCard] = useState(null);
  const [coins, setCoins] = useState(0);
  const { theme } = useTheme();

  const shuffleCards = () => {
    const shuffledCards = [...images, ...images]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random(), matched: false }));
    setCards(shuffledCards);
    setFirstCard(null);
    setSecondCard(null);
  };

  useEffect(() => {
    if (firstCard && secondCard) {
      if (firstCard.src === secondCard.src) {
        setCards(prevCards => 
          prevCards.map(card => 
            card.src === firstCard.src ? { ...card, matched: true } : card
          )
        );
        setCoins(prevCoins => prevCoins + 100); // Add 100 coins for each match
        setFirstCard(null);
        setSecondCard(null);
      } else {
        setTimeout(() => {
          setFirstCard(null);
          setSecondCard(null);
        }, 700); 
      }
    }
  }, [firstCard, secondCard]);

  const handleChoice = (card) => {
    if (!firstCard && !secondCard) {
      setFirstCard(card);
    } else if (firstCard && !secondCard) {
      setSecondCard(card);
    }
  };

  useEffect(() => {
    shuffleCards();
  }, []);

  return (
    <main className={`flex flex-col items-center h-screen p-4 md:p-6 text-lg md:text-3xl font-bold ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'} transition-colors duration-300`}>
      <div className="mb-4">
        <Button auto onClick={shuffleCards} color="primary" className="bg-gray-200 text-gray-900 hover:bg-gray-300">
          New Game
        </Button>
      </div>
      <div className="text-xl mb-4 flex items-center">
        <img className='h-8 w-8 md:h-12 md:w-12' alt="Coin" src="/img/—Pngtree—glossy golden coin icon_5986301.png" />
        <span className="ml-2 text-base md:text-xl">{coins}</span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {cards.map((card) => (
          <div key={card.id} className="flex items-center justify-center">
            <div 
              className={`card ${card.matched || card === firstCard || card === secondCard ? 'flipped' : ''}`} 
              onClick={() => !card.matched && card !== firstCard && card !== secondCard && handleChoice(card)}
            >
              <img className="Back" src={card.src} alt="Card image" />
              <img className="Front" src="/img/cover.png" alt="Cover image" />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default Card;
