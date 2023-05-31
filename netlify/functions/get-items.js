const faunadb = require('faunadb');

exports.handler = async (event, context) => {
  const q = faunadb.query;
  const client = new faunadb.Client({ secret: process.env.FAUNADB_SERVER_SECRET });

  // Parse the list ID from the request body
  const requestBody = JSON.parse(event.body);
  const listId = requestBody.listId;
  console.log('List ID:', listId); // Log the list ID

  try {
    const itemsData = await client.query(
      q.Map(
        q.Paginate(q.Match(q.Index('items_by_list_and_order'), q.Ref(q.Collection('Lists'), listId))),
        q.Lambda(['order', 'ref'], q.Get(q.Var('ref')))
      )
    );

    console.log('Items Data:', itemsData); // Log the items data before sorting and mapping

    // The returned data now includes an 'order' value. The actual Items are nested within the 'data' field of each result.
    // Sort the items by the 'order' value and then strip out the 'order' value from the results.
    const sortedItems = itemsData.data.sort((a, b) => a.order - b.order);

    console.log('Sorted Items:', sortedItems); // Log the sorted items before returning them

    return {
      statusCode: 200,
      body: JSON.stringify({ data: sortedItems }),
    };
  } catch (error) {
    console.error('Serverless function error:', error); // Log any error that occurs during the process
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch items' }),
    };
  }
};
