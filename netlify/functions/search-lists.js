const faunadb = require('faunadb');

const client = new faunadb.Client({ secret: process.env.FAUNADB_SERVER_SECRET });
const q = faunadb.query;

exports.handler = async (event, context) => {
  const searchValue = event.queryStringParameters.q;

  try {
    const result = await client.query(
      q.Paginate(
        q.Match(
          q.Index('lists_by_title'), // replace with your index name
          searchValue
        )
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
