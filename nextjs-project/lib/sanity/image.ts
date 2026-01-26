import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'
import { client } from './client'

const builder = imageUrlBuilder(client)

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

export function getImageUrl(
  source: SanityImageSource,
  width?: number,
  height?: number
): string {
  let img = builder.image(source).auto('format').quality(80)
  
  if (width) img = img.width(width)
  if (height) img = img.height(height)
  
  return img.url()
}
