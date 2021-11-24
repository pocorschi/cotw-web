import { useContext } from 'react';
import { AppContext } from '../state/AppContext';

type Props = {
  name: string;
  value: string;
};

const Trait = ({ name, value }: Props) => {
  const { stats } = useContext(AppContext);

  const rarity = stats ? Math.ceil((stats[name][value] * 100) / stats.total).toFixed(0) : 0;

  return (
    <div className="trait">
      <h5>{name}</h5>
      <h4>{value}</h4>
      <h4>{rarity}%</h4>
    </div>
  );
};

export default Trait;
