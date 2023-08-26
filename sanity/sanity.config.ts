// import {defineConfig} from 'sanity/lib/exports' // ONLY USE WHILE BUILDING THE APP

import {defineConfig} from 'sanity' // <==== USE THIS FOR LOCAL
import {deskTool} from 'sanity/desk'
import {schemaTypes} from './schemas'
import {visionTool} from '@sanity/vision'

export default defineConfig({
  name: 'default',
  title: 'j471n-blog',

  projectId: '5ec749u0',
  dataset: 'production',

  plugins: [deskTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
