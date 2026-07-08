import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' }, validation: (r) => r.required() }),
    defineField({ name: 'shortDescription', title: 'Short Description', type: 'text', rows: 3 }),
    defineField({ name: 'fullDescription', title: 'Full Description', type: 'text', rows: 6 }),
    defineField({ name: 'price', title: 'Starting Price', type: 'string', description: 'e.g. "3500"' }),
    defineField({ name: 'order', title: 'Sort Order', type: 'number' }),
    defineField({ name: 'isFlagship', title: 'Flagship Service?', type: 'boolean' }),
    defineField({
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'deliverables',
      title: 'Deliverables',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({ name: 'timeline', title: 'Timeline', type: 'string' }),
    defineField({ name: 'icon', title: 'Icon Name', type: 'string' }),
    defineField({ name: 'color', title: 'Brand Color', type: 'string' }),
  ],
  orderings: [
    { title: 'Sort Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] },
  ],
  preview: {
    select: { title: 'title', subtitle: 'shortDescription' },
  },
});
