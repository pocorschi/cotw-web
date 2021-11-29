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
      <h5 className="name">{name}</h5>
      <h4 className="value">{value}</h4>
      <h4 className="rarity">
        {rarity}% <span>have this trait</span>
      </h4>
    </div>
  );
};

export default Trait;
