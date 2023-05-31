const faunadb = require('faunadb');
const q = faunadb.query;

require('dotenv').config();

const handler = async (event) => {
  const client = new faunadb.Client({ secret: process.env.FAUNADB_SERVER_SECRET });
  const profileId = event.queryStringParameters.profileId;
  console.log(profileId)

  if (!profileId) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Missing profileId parameter" }),
    };
  }

  try {
    const response = await client.query(
      q.Map(
        q.Paginate(q.Match(q.Index("lists_by_profile"), q.Ref(q.Collection('Profiles'), profileId))),
        q.Lambda("X", q.Get(q.Var("X")))
      )
    );

    // Refactor response
    const lists = response.data.map(list => {
      return {
        refId: list.ref.id,
        data: list.data,
      };
    });

    return {
      statusCode: 200,
      body: JSON.stringify(lists),
    };
  } catch (error) {
    console.error('FaunaDB query failed:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }

};

module.exports = { handler };
