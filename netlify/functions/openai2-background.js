const axios = require('axios');
const { OpenAIApi, Configuration } = require('openai');
const client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
const SerpApi = require('google-search-results-nodejs');
const faunadb = require('faunadb'), q = faunadb.query;

const dbClient = new faunadb.Client({ secret: process.env.FAUNADB_SERVER_SECRET });
const websiteBaseUrl = 'https://main--glittery-monstera-cafd18.netlify.app'

const MAX_RETRIES = 5; // Set maximum retries
const INITIAL_RETRY_DELAY_MS = 5000; // Set initial retry delay in milliseconds

async function callOpenAI(openai, options) {
    let retries = 0;
    let retryDelay = INITIAL_RETRY_DELAY_MS;
    while (retries < MAX_RETRIES) {
        try {
            let response = await openai.createChatCompletion(options);
            return response;
        } catch (error) {
            if (error.response && error.response.status === 429) {
                retries++;
                console.log(`OpenAI API call failed due to rate limit. Retry attempt ${retries} after delay.`);
                await new Promise(resolve => setTimeout(resolve, retryDelay));
                retryDelay *= 2; // Double the delay for the next retry
            } else {
                throw error;
            }
        }
    }
    throw new Error(`OpenAI API call failed after ${MAX_RETRIES} attempts due to rate limit.`);
}

exports.handler = async function (event, context, callback) {
    console.log("OPENAI")
    const { profileId, title, text, phoneNumber, settings } = JSON.parse(event.body);
    console.log(title)
    console.log(phoneNumber)
    console.log(text)

    let initial_prompt = "Turn this input into a structured json list of objects. Here is the json schema:\n\n{\n  \"$schema\": \"http://json-schema.org/draft-04/schema#\",\n  \"type\": \"object\",\n\n\"id\": {\n      \"type\": \"integer\"\n    }\n  \"properties\": {\n    \"name\": {\n      \"type\": \"string\"\n    },\n    \"description\": {\n      \"type\": \"string\"\n    },\n    \"photoUrl\": {\n      \"type\": \"string\"\n    },\n    \"linkUrl\": {\n      \"type\": \"string\"\n    },\n    \"order\": {\n      \"type\": \"integer\"\n    }\n  },\n  \"required\": [\n\n“id”,\n    \"name\",\n    \"order\"\n  ]\n}";

    if (settings.findWebsites) {
        initial_prompt = "Turn this input into a structured json list of objects. Within the searchQuery field, provide a query that you would use if you were searching google for relevant linkUrls to the items. Here is the json schema:\n\n{\n  \"$schema\": \"http://json-schema.org/draft-04/schema#\",\n  \"type\": \"object\",\n\n\"id\": {\n      \"type\": \"integer\"\n    }\n  \"properties\": {\n    \"name\": {\n      \"type\": \"string\"\n    },\n    \"description\": {\n      \"type\": \"string\"\n    },\n    \"photoUrl\": {\n      \"type\": \"string\"\n    },\n    \"linkUrl\": {\n      \"type\": \"string\"\n    },\n    \"order\": {\n      \"type\": \"integer\"\n    },\n\n“searchQuery”: {\n\n“type”: “string”\n\n}\n  },\n  \"required\": [\n\n“id”,\n    \"name\",\n    \"order\",\n\n“searchQuery”\n  ]\n}";
    }

    const prompt = initial_prompt + text

    const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
    });

    const openai = new OpenAIApi(configuration);

    try {
        let completion = await callOpenAI(openai, {
            model: "gpt-3.5-turbo",
            messages: [{ "role": "user", "content": prompt }],
            max_tokens: 3500
        });

        let completionItems = JSON.parse(completion.data.choices[0].message.content);

        // Find Websites using serpapi and update 'linkUrl' field for each item.
        if (settings.findWebsites) {
            console.log(process.env.SERPAPI_API_KEY)
            const search = new SerpApi.GoogleSearch(process.env.SERPAPI_API_KEY);

            console.log("Trying SerpAPI")
            let searchPromises = [];
            for (let item of completionItems) {
                console.log(`Starting search for item ${item.searchQuery} `)
                if (item.searchQuery) {
                    console.log(`Querying for ${item.searchQuery} `)
                    let params = {
                        engine: "google",
                        q: item.searchQuery
                    };
        
                    let promise = new Promise((resolve, reject) => {
                        let retries = 0;
                        let retryDelay = INITIAL_RETRY_DELAY_MS;
                        const searchAndHandleRetry = () => {
                            try {
                                search.json(params, function (data) {
                                    console.log("Organic results from SerpApi for ", item.searchQuery, ": ", data.organic_results);
                                    if (data.organic_results && data.organic_results.length > 0) {
                                        item.linkUrl = data.organic_results[0].link;
                                        resolve();
                                    } else {
                                        if (retries < MAX_RETRIES) {
                                            retries++;
                                            console.log(`No organic_results found for ${item.searchQuery}. Retry attempt ${retries}.`);
                                            setTimeout(searchAndHandleRetry, retryDelay);
                                            retryDelay *= 2; // Double the delay for the next retry
                                        } else {
                                            reject(new Error(`No organic_results found for ${item.searchQuery} after ${MAX_RETRIES} attempts.`));
                                        }
                                    }
                                });
                            } catch (error) {
                                if (retries < MAX_RETRIES) {
                                    retries++;
                                    console.log(`Error fetching data from SerpApi for ${item.searchQuery}. Retry attempt ${retries}.`);
                                    setTimeout(searchAndHandleRetry, retryDelay);
                                    retryDelay *= 2; // Double the delay for the next retry
                                } else {
                                    reject(error);
                                }
                            }
                        }
                        searchAndHandleRetry();
                    });
        
                    searchPromises.push(promise);
                }
            }
        
            try {
                await Promise.all(searchPromises);
            } catch (error) {
                console.error("Error in Promise.all for SerpApi calls: ", error);
            }
        }

        if (settings.writeToDb) {
            console.log("Writing to Fauna")
            let now = new Date().toISOString();
            let list = await dbClient.query(
                q.Create(
                    q.Collection('Lists'),
                    { data: { 
                        profileId: q.Ref(q.Collection("Profiles"), profileId),
                        title: title,
                        likesCount: 0,
                        savesCount: 0,
                        createdTimestamp: q.Time(now),
                        updatedTimestamp: q.Time(now)
                    } }
                )
            );

            for (let item of completionItems) {
                let itemData = {
                    listId: list.ref,
                    name: item.name,
                    description: item.description,
                    photoUrl: item.photoUrl,
                    linkUrl: item.linkUrl,
                    order: item.order
                };

                if (item.searchQuery) {
                    itemData.searchQuery = item.searchQuery;
                }

                await dbClient.query(
                    q.Create(
                        q.Collection('Items'),
                        { data: itemData }
                    )
                );
            }

            resultUrl = `${websiteBaseUrl}/lists/${list.ref.id}`;
            console.log(`Result URL: ${resultUrl}`);
        }

        if (phoneNumber) {
            client.messages
                .create({
                    body: `Your list is ready! Check it out here: ${resultUrl}`,
                    from: '+18339912619', // replace with your Twilio number
                    to: phoneNumber
                });

            console.log("send text message")
        } else {
            console.log("No phone number provided. Here's the output:")
            console.log(JSON.stringify(completionItems));
        }

        // Move the callback inside the try block to ensure it is called only after all promises are resolved.
        callback(null, {
            statusCode: 200,
            body: JSON.stringify({
                text: completion.data.choices[0].message.content
            })
        });
    } catch (error) {
        if (error.response) {
            console.log(error.response.status);
            console.log(error.response.data);
        } else {
            console.log(error.message);
        }
        callback(error, {
            statusCode: 500,
            body: JSON.stringify({
                error: error.message || 'An error occurred while calling the OpenAI API'
            })
        });
    }
}