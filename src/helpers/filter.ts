import Fuse from 'fuse.js';
import { take } from 'lodash';

export const filterItems = (
  items?: any,
  limit = 10,
  offset = 0,
  text?: string,
  type?: string,
  category?: string,
): any => {
  let filteredItems = items;

  // Text filter
  const fuse = new Fuse(items, {
    threshold: 0.3,
    minMatchCharLength: 2,
    keys: ['title'],
  });

  if (text && text !== '') {
    filteredItems = fuse.search(text);
  }
  // Type filter
  if (type) {
    filteredItems = filteredItems.filter((item: any) => item.type === type);
  }
  // Category filter
  if (category && category.split(',').length) {
    filteredItems = filteredItems.filter((item: any) => {
      const isAvailable = item.categories.find((cat: any) =>
        category.split(',').includes(`${cat.slug}`),
      );
      if (isAvailable) {
        return true;
      }
      return false;
    });
  }
  const hasMore = offset + limit < filteredItems.length;

  filteredItems = filteredItems.slice(offset, offset + limit);
  return { items: filteredItems, hasMore };
};

export const filterOrder = async (
  items?: any,
  user?: number,
  limit = 7,
  text?: string,
): Promise<any> => {
  let filteredItems = items;

  // Text filter
  const fuse = new Fuse(items, {
    keys: ['id', 'products.title'],
  });

  if (text && text !== '') {
    filteredItems = fuse.search(text);
  }
  // Type filter
  if (user) {
    filteredItems = filteredItems.filter((item: any) => item.userId === user);
  }

  filteredItems = take(filteredItems, limit);
  return await filteredItems;
};

export const getRelatedItems = async (
  type?: string,
  slug?: string,
  items?: any,
): Promise<any> => {
  const filteredItems = items;
  const findRelated = take(
    await filteredItems.filter(
      (item: any) => item.type === type && item.slug !== slug,
    ),
    10,
  );
  return findRelated;
};
