const faunadb = require('faunadb');
const q = faunadb.query;

exports.handler = async (event, context) => {
  const client = new faunadb.Client({ secret: process.env.FAUNADB_SERVER_SECRET });

  try {
    const body = JSON.parse(event.body);
    if (!body.listId) {
      console.log("Invalid body:", event.body);
      throw new Error("Missing listId");
    }
    const listId = body.listId;

    console.log('Fetching list:', listId);
    const listResponse = await client.query(q.Get(q.Ref(q.Collection('Lists'), listId)));
    console.log('List Response:', listResponse);

    if (!listResponse.data.profileId) {
      throw new Error("Missing profileId");
    }

    const profileId = listResponse.data.profileId.id;
    console.log('Fetching profile:', listResponse.data.profileId);

    const profileResponse = await client.query(q.Get(q.Ref(q.Collection('Profiles'), profileId)));

    console.log('Profile Response:', profileResponse);

    return {
      statusCode: 200,
      body: JSON.stringify({ 
        list: {
          ...listResponse.data,
          id: listResponse.ref.id
        }, 
        profile: {
          ...profileResponse.data,
          id: profileResponse.ref.id
        } 
      }),
    };
  } catch (error) {
    console.log('Error:', error);
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Could not fetch data' }),
    };
  }
};
