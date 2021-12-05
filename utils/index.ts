import fs from 'fs';
import path from 'path';

const dir = path.join(process.cwd(), './public/metadata/QmRHuLNNHMxPqWyxdrQyGo9EqvZadV4hgaFcNkTciLq2fY');

export function getColorStats() {
  const filenames = fs.readdirSync(dir);
  const allData = filenames.map(filename => {
    const fullPath = path.join(dir, filename);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const json = JSON.parse(fileContents);
    return json;
  });

  const stats = allData.reduce(
    (acc, curr) => {
      if (acc[curr.attributes[0].trait_type][curr.attributes[0].value]) {
        acc[curr.attributes[0].trait_type][curr.attributes[0].value] += 1;
      } else {
        acc[curr.attributes[0].trait_type][curr.attributes[0].value] = 1;
      }
      if (acc[curr.attributes[1].trait_type][curr.attributes[1].value]) {
        acc[curr.attributes[1].trait_type][curr.attributes[1].value] += 1;
      } else {
        acc[curr.attributes[1].trait_type][curr.attributes[1].value] = 1;
      }
      if (acc[curr.attributes[2].trait_type][curr.attributes[2].value]) {
        acc[curr.attributes[2].trait_type][curr.attributes[2].value] += 1;
      } else {
        acc[curr.attributes[2].trait_type][curr.attributes[2].value] = 1;
      }
      return acc;
    },
    {
      [allData[0].attributes[0].trait_type]: {},
      [allData[0].attributes[1].trait_type]: {},
      [allData[0].attributes[2].trait_type]: {},
    }
  );
  stats.total = allData.length;
  return stats;
}
