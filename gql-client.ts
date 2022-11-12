import {
  ApolloClient,
  ApolloLink,
  DocumentNode,
  InMemoryCache,
} from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';
import { setContext } from '@apollo/client/link/context';

type Query = <QV, RT>(
  name: string,
  query: DocumentNode,
  variables?: QV,
) => Promise<RT>;
type Mutate = <MV, RT>(
  name: string,
  mutation: DocumentNode,
  variables?: MV,
) => Promise<RT>;

export type GraphQLClient = {
  query: Query;
  mutate: Mutate;
};

const token =
  'eyJhbGciOiJSUzI1NiIsImtpZCI6Imk4bnMtdFVSTEZYdXhmd2t1Q01DNnNwQ3NyMF9Ca1h0WEY3NFhFOFkwcjgiLCJ0eXBlIjoiSldUIn0.eyJhdWQiOiJTS1k6Q0xPVUQ6QVVUSCIsImVtYWlsIjoiZWR1YXJkby5kb21pbmd1ZXpAc2t5ZHJvcHguY29tIiwiZXhwIjoxNjY3MDAxNjc5LCJpYXQiOjE2NjY5OTA4NzksImlzcyI6ImF1dGguZGVsZm9zLmFwcCIsIm93bmVyIjoic2t5ZHJvcHguY29tIiwic3ViIjoiMTE1MDA2NTE4NjYyMDA3NTI0ODA3In0.HPYCXtTiSB_B-W5yjW_gyprtmZu1D4FZYkme4SiuAvXnuXwEXHJ2T8mXrYmIPPdG_7qwlfDWJjRN_wyjydW1k7hz7njukMWyUzGO0GCSHEid9olTQFFwlQB7csazjmM43m1TGgUJbK0SF7xaNxe2P-F2sUe7Qu_HzGZZEiBpobRa_ctnlRXoYdoSQAKdN5UdPVlrPIhPp_rmtllW8-46dlxa1ZM01RkenwLcV3rh1dQxcyMtW3bCA4vgmyJQH2eHR_elhFBjxfGmQNMrykvWDCCB4a6f9JN6hiwNUCxe4IEDItOQi9naMVhz58zfCevdBuSITp41X9LbA4V-b3wNzQ';

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
      project: 18,
      'x-tenant-id': 'dev',
      'x-user-email': 'eduardo.dominguez@skydropx.com',
    },
  };
});

// const httpLink = createUploadLink({
//   uri: 'http://localhost:3030/graphql',
//   headers: {
//     authorization: token ? `Bearer ${token}` : '',
//     project: 18,
//     'x-tenant-id': 'dev',
//     'x-user-email': 'eduardo.dominguez@skydropx.com',
//   },
//   // includeUnusedVariables: false,
//   //credentials: 'include',
//   fetchOptions: {
//     mode: 'no-cors',
//   },
// });

const uploadLink = createUploadLink({ uri: 'http://localhost:3030/graphql' });

export const createGQLClient = (): GraphQLClient => {
  const cache = new InMemoryCache({
    addTypename: false,
    resultCaching: false,
  });

  const client = new ApolloClient({
    // Provide required constructor fields
    cache: cache,
    link: ApolloLink.from([authLink, uploadLink]),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'no-cache',
      },
      mutate: {
        fetchPolicy: 'no-cache',
      },
    },
  });

  const query: Query = (name, query, variables) => {
    console.log({ variables });
    return client
      .query({
        query,
        variables,
        fetchPolicy: 'no-cache',
      })
      .then(({ data }) => data[name]);
  };

  const mutate: Mutate = (name, mutation, variables) => {
    return client
      .mutate({
        mutation,
        variables,
      })
      .then(({ data }) => data[name]);
  };

  return { query, mutate };
};
