export default {
  name: 'listing',
  title: 'Listing',
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
      name: 'category',
      title: 'Category',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Description',
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
      name: 'bedrooms',
      title: 'Bedrooms',
      type: 'string',
    },
    {
      name: 'bathrooms',
      title: 'Bathrooms',
      type: 'string',
    },

    {
      name: 'size',
      title: 'Size - SqFt',
      type: 'string',
    },
    {
      name: 'features',
      title: 'Features',
      type: 'string',
    },
    {
      name: 'amenities',
      title: 'Amenities',
      type: 'string',
    },
    {
      name: 'geolocation',
      title: 'Geolocation',
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
      type: 'string',
    },
    {
      name: 'estate',
      title: 'Estate',
      type: 'string',
    },
    {
      name: 'street',
      title: 'Street',
      type: 'string',
    },
    {
      name: 'rent',
      title: 'Rent',
      type: 'string',
    },
    {
      name: 'deposit',
      title: 'Deposit',
      type: 'string',
    },
    {
      name: 'extraCosts',
      title: 'Extra Costs',
      type: 'string',
    },
    {
      name: 'phoneNo',
      title: 'Phone Number',
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
