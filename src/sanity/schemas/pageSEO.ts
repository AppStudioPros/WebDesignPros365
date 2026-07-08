import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'pageSEO',
  title: 'Page SEO',
  type: 'document',
  fields: [
    defineField({
      name: 'path',
      title: 'Page Path',
      type: 'string',
      description: 'e.g. /about, /services/ai-visibility, /verticals/real-estate',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'title',
      title: 'SEO Title',
      type: 'string',
      description: 'Shows in browser tab and search results. Include business name.',
      validation: (r) => r.required().max(70),
    }),
    defineField({
      name: 'description',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      description: 'Shows in search results. 150-160 characters ideal.',
      validation: (r) => r.required().max(200),
    }),
  ],
  orderings: [
    { title: 'Path', name: 'pathAsc', by: [{ field: 'path', direction: 'asc' }] },
  ],
  preview: {
    select: { title: 'path', subtitle: 'title' },
  },
});
