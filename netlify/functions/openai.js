// ./netlify/functions/openai.js
const axios = require('axios');
const { OpenAIApi, Configuration } = require('openai');

exports.handler = async function (event, context) {
    console.log("OPENAI")
    const { text } = JSON.parse(event.body);
    console.log("Text: " + text)

    const configuration = new Configuration({
        // organization: "org-ItF60SuIhucrDF6YXu947eK6",
        apiKey: process.env.OPENAI_API_KEY,
    });

    const openai = new OpenAIApi(configuration);

    try {
        const completion = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: text,
        });
        console.log(completion.data.choices)
        console.log(completion.data.choices[0].text);
        return {
            statusCode: 200,
            body: JSON.stringify({
                text: completion.data.choices[0].text
            })
        }
    } catch (error) {
        if (error.response) {
            console.log(error.response.status);
            console.log(error.response.data);
        } else {
            console.log(error.message);
        }
        return {
            statusCode: 500,
            body: JSON.stringify({
                error: error.message || 'An error occurred while calling the OpenAI API'
            })
        }
    }
}
