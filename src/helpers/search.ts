import Fuse from 'fuse.js';

// const options: Fuse.FuseOptions<any> = {
//   keys: ['author', 'tags'],
// };

export default function search(
  dataToSearch: any,
  basedOnOptionsKey: string[],
  searchByValue = '',
) {
  if (searchByValue.trim()) {
    const fuse = new Fuse(dataToSearch, {
      shouldSort: true,
      threshold: 0.3,
      location: 0,
      distance: 100,
      // maxPatternLength: 32,
      minMatchCharLength: 2,
      keys: basedOnOptionsKey,
    });
    const result = fuse.search(searchByValue);

    return result;
  }

  return dataToSearch;
}
