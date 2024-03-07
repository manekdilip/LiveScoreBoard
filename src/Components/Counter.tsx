import { useEffect, useState } from 'react';
import { ScoreBox } from './styleComponents';

interface CountProp {
  score: number;
}

const Counter = ({ score }: CountProp) => {
  const [count, setCount] = useState(0);

  const handleCount = (score: number) => {
    for (let i = score - 200; i <= score; i++) {
      setTimeout(() => {
        setCount(i);
      }, 10);
    }
  };

  useEffect(() => {
    handleCount(score);
  }, [score]);

  return <ScoreBox score={count} />;
};

export default Counter;
