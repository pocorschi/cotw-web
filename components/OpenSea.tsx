type Props = {
  link?: string | null;
  align?: 'left' | 'right' | 'center';
};
const OpenSea = ({ link = null, align = 'right' }: Props) => {
  const href = link ?? 'https://opensea.io/';
  return (
    <div className="opensea-container" style={{ textAlign: align }}>
      <a href={href} rel="noreferrer" target="_blank">
        <img src="/opensea-light.png" alt="Available on OpenSea" />
      </a>
    </div>
  );
};

OpenSea.defaultProps = {
  link: null,
  align: 'right',
};

export default OpenSea;
