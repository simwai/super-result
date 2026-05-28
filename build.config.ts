import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [
    'src/index',
    'src/class',
    'src/functions',
    'src/fn',
    'src/like-neverthrow',
  ],
  declaration: true,
  clean: true,
  rollup: {
    emitCJS: true,
  },
})
