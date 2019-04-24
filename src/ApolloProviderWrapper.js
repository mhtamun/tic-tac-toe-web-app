import React from 'react';
import ApolloClient from 'apollo-boost'
import {ApolloProvider} from "react-apollo";

const client = new ApolloClient({
    uri: 'http://10.0.0.227:4567/graphql'
});

// Preconfigured HOC
const ApolloProviderWrapper = BaseComponent => props => (
    <ApolloProvider client={client}>
        <BaseComponent {...props} />
    </ApolloProvider>
);

export default ApolloProviderWrapper;
