export default {
  name: 'property',
  title: 'Property',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'about',
      title: 'About',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'string',
    },
    {
      name: 'summary',
      title: 'Summary',
      type: 'string',
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
    },
    {
      name: 'bathrooms',
      title: 'Bathrooms',
      type: 'string',
    },
    {
      name: 'bedrooms',
      title: 'Bedrooms',
      type: 'string',
    },
    {
      name: 'size',
      title: 'Size - Sqft',
      type: 'string',
    },
    {
      name: 'features',
      title: 'Features',
      type: 'string',
    },
    {
      name: 'location',
      title: 'Location',
      type: 'string',
    },
    {
      name: 'county',
      title: 'County',
      type: 'string',
    },
    {
      name: 'town',
      title: 'Town',
      type: 'Town',
    },
    {
      name: 'estate',
      title: 'Estate',
      type: 'string',
    },
    {
      name: 'price',
      title: 'Price',
      type: 'string',
    },
    {
      name: 'deposit',
      title: 'Deposit',
      type: 'string',
    },
    {
      name: 'extra',
      title: 'Extra Costs',
      type: 'string',
    },
    {
      name: 'userId',
      title: 'UserID',
      type: 'string',
    },
    {
      name: 'postedBy',
      title: 'Posted By',
      type: 'postedBy',
    },
    {
      name: 'save',
      title: 'Save',
      type: 'array',
      of: [{ type: 'save' }],
    },
    {
      name: 'comments',
      title: 'Comments',
      type: 'array',
      of: [{ type: 'comment' }],
    },
  ],
};
