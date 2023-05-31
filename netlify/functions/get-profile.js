const faunadb = require('faunadb');
const q = faunadb.query;

require('dotenv').config();

const handler = async (event) => {
  const client = new faunadb.Client({ secret: process.env.FAUNADB_SERVER_SECRET });
  const profileId = event.queryStringParameters.profileId;

  if (!profileId) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Missing profileId parameter" }),
    };
  }

  try {
    const response = await client.query(
      q.Get(q.Ref(q.Collection("Profiles"), profileId))
    );
    // console.log(response)
    return {
      statusCode: 200,
      body: JSON.stringify(response),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};

module.exports = { handler };
