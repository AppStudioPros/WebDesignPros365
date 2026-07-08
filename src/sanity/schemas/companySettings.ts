import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'companySettings',
  title: 'Company Settings',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Company Name', type: 'string' }),
    defineField({ name: 'legalName', title: 'Legal Name', type: 'string' }),
    defineField({ name: 'url', title: 'Website URL', type: 'url' }),
    defineField({ name: 'email', title: 'Email', type: 'string' }),
    defineField({ name: 'phone', title: 'Phone', type: 'string' }),
    defineField({ name: 'phoneDisplay', title: 'Phone Display', type: 'string' }),
    defineField({ name: 'founder', title: 'Founder', type: 'string' }),
    defineField({ name: 'foundingDate', title: 'Founding Date', type: 'string' }),
    defineField({ name: 'priceRange', title: 'Price Range', type: 'string' }),
    defineField({ name: 'logo', title: 'Logo Path', type: 'string' }),
    defineField({ name: 'bbbUrl', title: 'BBB Profile URL', type: 'url' }),
    defineField({ name: 'tagline', title: 'Tagline', type: 'string' }),
    defineField({ name: 'shortDescription', title: 'Short Description', type: 'text', rows: 3 }),
    defineField({ name: 'fullDescription', title: 'Full Description', type: 'text', rows: 6 }),
    defineField({
      name: 'address',
      title: 'Address',
      type: 'object',
      fields: [
        defineField({ name: 'city', title: 'City', type: 'string' }),
        defineField({ name: 'state', title: 'State', type: 'string' }),
        defineField({ name: 'country', title: 'Country', type: 'string' }),
      ],
    }),
    defineField({
      name: 'geo',
      title: 'Geo Coordinates',
      type: 'object',
      fields: [
        defineField({ name: 'lat', title: 'Latitude', type: 'number' }),
        defineField({ name: 'lng', title: 'Longitude', type: 'number' }),
      ],
    }),
    defineField({
      name: 'industryStats',
      title: 'Industry Statistics',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'stat', title: 'Statistic', type: 'string' }),
          defineField({ name: 'source', title: 'Source', type: 'string' }),
          defineField({ name: 'date', title: 'Date', type: 'string' }),
        ],
      }],
    }),
    defineField({
      name: 'techStack',
      title: 'Technology Stack',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'name', title: 'Name', type: 'string' }),
          defineField({ name: 'category', title: 'Category', type: 'string' }),
        ],
      }],
    }),
    defineField({
      name: 'targetIndustries',
      title: 'Target Industries',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'differentiators',
      title: 'Differentiators',
      type: 'array',
      of: [{ type: 'string' }],
    }),
  ],
});
