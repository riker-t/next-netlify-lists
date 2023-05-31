const faunadb = require('faunadb');

const client = new faunadb.Client({ secret: process.env.FAUNADB_SERVER_SECRET });
const q = faunadb.query;

exports.handler = async (event, context) => {
  const searchValue = event.queryStringParameters.q;

  try {
    const result = await client.query(
        q.Map(
            q.Paginate(q.Documents(q.Collection('Profiles'))),
            q.Lambda(x => q.Get(x))
          )
    );
    
    return {
      statusCode: 200,
      body: JSON.stringify(result.data)
    };

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch data' })
    };
  }
};
