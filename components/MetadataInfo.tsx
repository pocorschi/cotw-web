/* eslint-disable camelcase */
import axios from 'axios';
import { useQuery } from 'react-query';
import Trait from './Trait';

const jsonCID = 'QmT6WEiJ4a5XVUtQwgzCheX1NjhnEqpgwiLt9C3i4V1wBH';
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
    <>
      {isLoading && <p>Loading...</p>}
      {data && (
        <div className="metadata-container">
          <h4>{data.data.description}</h4>
          <div className="traits-container">
            {data.data.attributes.map((attr: Attribute) => (
              <Trait key={attr.trait_type} name={attr.trait_type} value={attr.value} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default MetadataInfo;
