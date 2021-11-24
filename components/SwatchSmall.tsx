type Props = {
  color: string;
};
const SwatchSmall = ({ color }: Props) => (
  <div className="h-8 p-2 w-1/10">
    <div style={{ backgroundColor: color }} className="w-full h-full border-2 border-white" />
  </div>
);

export default SwatchSmall;
