import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemas'

export default defineConfig({
  name: 'default',
  title: 'Web Design Pros 365',

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'your-project-id',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Site Settings')
              .child(
                S.document()
                  .schemaType('siteSettings')
                  .documentId('siteSettings')
              ),
            S.divider(),
            S.listItem()
              .title('Services')
              .child(
                S.documentList()
                  .title('Services')
                  .filter('_type == "service"')
              ),
            S.listItem()
              .title('Case Studies')
              .child(
                S.documentList()
                  .title('Case Studies')
                  .filter('_type == "caseStudy"')
              ),
            S.listItem()
              .title('Blog Posts')
              .child(
                S.documentList()
                  .title('Blog Posts')
                  .filter('_type == "post"')
              ),
            S.listItem()
              .title('Categories')
              .child(
                S.documentList()
                  .title('Categories')
                  .filter('_type == "category"')
              ),
            S.divider(),
            S.listItem()
              .title('Team Members')
              .child(
                S.documentList()
                  .title('Team Members')
                  .filter('_type == "teamMember"')
              ),
            S.listItem()
              .title('Testimonials')
              .child(
                S.documentList()
                  .title('Testimonials')
                  .filter('_type == "testimonial"')
              ),
            S.listItem()
              .title('Client Logos')
              .child(
                S.documentList()
                  .title('Client Logos')
                  .filter('_type == "clientLogo"')
              ),
            S.divider(),
            S.listItem()
              .title('Pricing Tiers')
              .child(
                S.documentList()
                  .title('Pricing Tiers')
                  .filter('_type == "pricingTier"')
              ),
            S.listItem()
              .title('FAQ')
              .child(
                S.documentList()
                  .title('FAQ')
                  .filter('_type == "faq"')
              ),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})
