import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'snippet',
  title: 'Snippet',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
    }),

    defineField({
      name: 'language',
      title: 'Language',
      type: 'reference',
      to: {type: 'language'},
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'text',
    }),
  ],

  preview: {
    select: {
      title: 'title',
      language: 'language.name',
      media: 'language.image',
    },
    prepare(selection) {
      const {language} = selection
      return {...selection, subtitle: language}
    },
  },
})
