/* eslint-disable camelcase */
import axios from 'axios';
import { useQuery } from 'react-query';
import Trait from './Trait';

const jsonCID = 'QmcroEguuDg1qfnVhhJgQCAnKyqmb9WHFT41Ko53V75md7';
const jsonBase = `metadata/${jsonCID}`;

type Props = {
  idx: number;
};

type Attribute = {
  trait_type: string;
  value: string;
};

const MetadataInfo = ({ idx }: Props) => {
  const { data, isLoading } = useQuery(['COTW', idx], () => axios(`${jsonBase}/${idx}.json`));

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {data && (
        <div className="metadata-container">
          <h2>Description:</h2>
          <h4>{data.data.description}</h4>
          <div className="traits-container">
            {data.data.attributes.map((attr: Attribute) => (
              <Trait key={attr.trait_type} name={attr.trait_type} value={attr.value} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MetadataInfo;
