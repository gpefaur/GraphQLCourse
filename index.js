const { ApolloServer, ApolloError } = require('apollo-server');
const SessionAPI = require('./datasources/sessions');
const SpeakerAPI = require('./datasources/speakers');

const typeDefs = require('./schema.js');

const resolvers = require('./resolvers.js');

const dataSources = () => ({
	sessionAPI: new SessionAPI(),
	speakerAPI: new SpeakerAPI(),
});
const server = new ApolloServer({
	typeDefs,
	resolvers,
	dataSources,
	formatError: (err) => {
		if (err.extensions.code == 'INTERNAL_SERVER_ERROR') {
			return new ApolloError("We are having some troubles", "ERROR", { token: "uniquetokentofinderror" })
		}
		return err;
	},
	debug: false

});

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
	console.log(`graphQL running at ${url}`);
});
