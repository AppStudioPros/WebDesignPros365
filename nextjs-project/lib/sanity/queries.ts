import { groq } from 'next-sanity'

// Services queries
export const servicesQuery = groq`
  *[_type == "service"] | order(order asc) {
    _id,
    title,
    slug,
    description,
    shortDescription,
    category,
    icon,
    features[] {
      name,
      description
    },
    isFlagship
  }
`

export const serviceBySlugQuery = groq`
  *[_type == "service" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    description,
    shortDescription,
    category,
    icon,
    features[] {
      name,
      description
    },
    isFlagship
  }
`

// Testimonials queries
export const testimonialsQuery = groq`
  *[_type == "testimonial"] | order(_createdAt desc) {
    _id,
    content,
    author,
    authorTitle,
    authorImage {
      asset->{
        _id,
        url
      }
    },
    rating,
    company
  }
`

// Case Studies queries
export const caseStudiesQuery = groq`
  *[_type == "caseStudy"] | order(_createdAt desc) {
    _id,
    title,
    slug,
    clientName,
    clientLogo {
      asset->{
        _id,
        url
      }
    },
    challenge,
    solution,
    results[] {
      metric,
      value
    },
    featuredImage {
      asset->{
        _id,
        url
      },
      alt
    },
    technologies
  }
`

export const caseStudyBySlugQuery = groq`
  *[_type == "caseStudy" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    clientName,
    clientLogo {
      asset->{
        _id,
        url
      }
    },
    challenge,
    solution,
    results[] {
      metric,
      value
    },
    featuredImage {
      asset->{
        _id,
        url
      },
      alt
    },
    content,
    technologies
  }
`

// Blog queries
export const postsQuery = groq`
  *[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    mainImage {
      asset->{
        _id,
        url
      },
      alt
    },
    author->{
      name,
      image {
        asset->{
          _id,
          url
        }
      }
    },
    categories[]->{
      _id,
      title,
      slug
    }
  }
`

export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    body,
    mainImage {
      asset->{
        _id,
        url
      },
      alt
    },
    author->{
      name,
      bio,
      image {
        asset->{
          _id,
          url
        }
      }
    },
    categories[]->{
      _id,
      title,
      slug
    }
  }
`

// Team queries
export const teamMembersQuery = groq`
  *[_type == "teamMember"] | order(order asc) {
    _id,
    name,
    role,
    bio,
    image {
      asset->{
        _id,
        url
      }
    },
    socialLinks[] {
      platform,
      url
    }
  }
`

// FAQ queries
export const faqQuery = groq`
  *[_type == "faq"] | order(order asc) {
    _id,
    question,
    answer,
    category
  }
`

// Pricing queries
export const pricingQuery = groq`
  *[_type == "pricingTier"] | order(price asc) {
    _id,
    name,
    slug,
    priceRange,
    description,
    features[] {
      feature,
      included
    },
    isPopular,
    ctaText,
    bestFor
  }
`

// Client logos
export const clientLogosQuery = groq`
  *[_type == "clientLogo"] | order(order asc) {
    _id,
    name,
    logo {
      asset->{
        _id,
        url
      }
    },
    url
  }
`

// Site settings
export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    _id,
    title,
    description,
    logo {
      asset->{
        _id,
        url
      }
    },
    socialLinks[] {
      platform,
      url
    },
    contactEmail,
    contactPhone,
    address
  }
`
