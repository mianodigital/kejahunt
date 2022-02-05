export const userQuery = (userId) => {
  const query = `*[_type == 'user' && _id == '${userId}']`;

  return query;
};

export const searchQuery = (searchTerm) => {
  const query = `*[_type == 'listing' && name match '${searchTerm}*' || category match '${searchTerm}*' || description match '${searchTerm}*']{
    image {
      asset -> {
        url
      }
    },
    _id,
    title,
    category,
    bathrooms,
    bedrooms,
    county,
    town,
    estate,
    street,
    rent,
    save[] {
      _key,
      postedBy -> {
        _id,
        userName,
        image
      },
    },
  }`;

  return query;
};

export const feedQuery = `*[_type == 'listing'] | order(_createdAt desc) {
  image {
  asset -> {
  url
  },
  },
title,
about,
bathrooms,
bedrooms,
category,
size,
rent,
town,
county,
street,
estate,
userId,
postedBy -> {
  _id,
  userName,
  image,
},
save [] {
  _key,
  postedBy -> {
  _id,
  userName,
  image,
},
},
}`;

export const categories = [
  {
    id: 0,
    link: 'studio',
    name: 'Studio | Bedsitter',
  },
  {
    id: 1,
    link: 'one-bedroom',
    name: 'One Bedroom',
  },
  {
    link: 'two-bedroom',
    name: 'Two Bedroom',
  },
  {
    id: 2,
    link: 'three-bedroom',
    name: 'Three Bedroom',
  },
  {
    id: 3,
    link: 'four-bedroom',
    name: 'Four Bedroom',
  },
  {
    id: 4,
    link: 'family-homes',
    name: 'Family Homes',
  },
  {
    id: 5,
    link: 'furnished',
    name: 'Fully Furnished',
  },
  {
    id: 6,
    link: 'other',
    name: 'Other',
  },
];
