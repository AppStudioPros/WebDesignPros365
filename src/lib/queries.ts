// GROQ queries for Sanity CMS

export const postsQuery = `
  *[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    mainImage,
    publishedAt,
    readTime,
    category,
    featured
  }
`;

export const postBySlugQuery = `
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    content,
    mainImage,
    publishedAt,
    readTime,
    category
  }
`;

export const servicesQuery = `
  *[_type == "service"] | order(order asc) {
    _id,
    title,
    slug,
    shortDescription,
    fullDescription,
    features,
    deliverables,
    timeline,
    icon,
    isFlagship,
    color
  }
`;

export const serviceBySlugQuery = `
  *[_type == "service" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    shortDescription,
    fullDescription,
    features,
    deliverables,
    timeline,
    icon,
    isFlagship,
    color
  }
`;
