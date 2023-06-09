// ./netlify/functions/openai.js
const axios = require('axios');
const { OpenAIApi, Configuration } = require('openai');
const initial_prompt = "Turn the below input into a structured json list of objects. Each item in the list should have the following properties: - id - name - description - tags - a relevant website link (if you can find it) Here is an example item: { 'id': '2', 'name': 'Panadería Rosetta', 'tags': ['Café', 'Pastries'], 'link': 'https://www.panaderiarosetta.com/', 'description': 'Famous bakery for pastries & coffee' } Here is the input:"


exports.handler = async function (event, context) {
    console.log("OPENAI")
    const { text } = JSON.parse(event.body);
    const prompt = initial_prompt + text

    const configuration = new Configuration({
        // organization: "org-ItF60SuIhucrDF6YXu947eK6",
        apiKey: process.env.OPENAI_API_KEY,
    });

    const openai = new OpenAIApi(configuration);

    try {
        const completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{"role": "user", "content": prompt}],
            max_tokens: 300
        });
        console.log(completion.data.choices)
        console.log(completion.data.choices[0].message.content);
        return {
            statusCode: 200,
            body: JSON.stringify({
                text: completion.data.choices[0].message.content
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
