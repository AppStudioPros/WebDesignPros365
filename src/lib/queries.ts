// GROQ queries for Sanity CMS

// ─── Blog ─────────────────────────────────────────────────────

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

// ─── Services ─────────────────────────────────────────────────

export const servicesQuery = `
  *[_type == "service"] | order(order asc) {
    _id,
    title,
    "slug": slug.current,
    shortDescription,
    fullDescription,
    features,
    deliverables,
    timeline,
    price,
    icon,
    isFlagship,
    color,
    order
  }
`;

export const serviceBySlugQuery = `
  *[_type == "service" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    shortDescription,
    fullDescription,
    features,
    deliverables,
    timeline,
    price,
    icon,
    isFlagship,
    color
  }
`;

// ─── Company Settings ─────────────────────────────────────────

export const companySettingsQuery = `
  *[_type == "companySettings"][0] {
    name,
    legalName,
    url,
    email,
    phone,
    phoneDisplay,
    founder,
    foundingDate,
    priceRange,
    logo,
    bbbUrl,
    tagline,
    shortDescription,
    fullDescription,
    "address": address{city, state, country},
    "geo": geo{lat, lng},
    industryStats,
    techStack,
    targetIndustries,
    differentiators
  }
`;

// ─── Page SEO ─────────────────────────────────────────────────

export const allPageSEOQuery = `
  *[_type == "pageSEO"] {
    path,
    title,
    description
  }
`;

export const pageSEOByPathQuery = `
  *[_type == "pageSEO" && path == $path][0] {
    path,
    title,
    description
  }
`;
