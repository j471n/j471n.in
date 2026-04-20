import {defineField, defineType, defineArrayMember} from 'sanity'

const SOURCE_TYPES = [
  {title: 'Book', value: 'book'},
  {title: 'Movie', value: 'movie'},
  {title: 'TV Show', value: 'tvShow'},
  {title: 'Person', value: 'person'},
  {title: 'Song / Lyrics', value: 'song'},
  {title: 'Podcast', value: 'podcast'},
  {title: 'Other', value: 'other'},
]

export default defineType({
  name: 'epigraph',
  title: 'Epigraph',
  type: 'document',
  fields: [
    defineField({
      name: 'quote',
      title: 'Quote / Passage',
      type: 'text',
      description: 'The quote, stanza, or passage you want to preserve.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'sourceType',
      title: 'Source Type',
      type: 'string',
      options: {
        list: SOURCE_TYPES,
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'sourceTitle',
      title: 'Source Title',
      type: 'string',
      description: 'Book name, movie title, show name, song name, podcast name, or person name.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'sourceMeta',
      title: 'Source Meta',
      type: 'string',
      description:
        'Author (book), artist (song), director (movie), host (podcast), context (person), etc.',
    }),
    defineField({
      name: 'speaker',
      title: 'Speaker / Character',
      type: 'string',
      description:
        'Character or person who said it (e.g. character in a book/movie, the person themselves).',
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'number',
      description: 'Release or publication year (optional).',
    }),
    {
      name: 'tags',
      title: 'Tags',
      type: 'array' as const,
      of: [{type: 'string' as const}],
      options: {
        layout: 'tags',
      },
      description: 'e.g. "life", "motivation", "love", "philosophy"',
    },
    defineField({
      name: 'addedAt',
      title: 'Added At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
  ],

  preview: {
    select: {
      title: 'quote',
      subtitle: 'sourceTitle',
      sourceType: 'sourceType',
    },
    prepare({title, subtitle, sourceType}) {
      const label = SOURCE_TYPES.find((s) => s.value === sourceType)?.title ?? sourceType
      return {
        title: title ? (title.length > 80 ? title.slice(0, 80) + '…' : title) : 'Untitled',
        subtitle: subtitle ? `${label} — ${subtitle}` : label,
      }
    },
  },
})
