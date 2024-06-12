import { CodegenConfig } from '@graphql-codegen/cli'
 
const config: CodegenConfig = {
  schema: 'https://api.studio.thegraph.com/query/78683/nft-indexer/version/latest',
  documents: ['src/**/*.tsx'],
  ignoreNoDocuments: true, // for better experience with the watcher
  generates: {
    './src/lib/gql/': {
      preset: 'client'
    }
  }
}
 
export default config