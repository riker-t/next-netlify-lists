// ./netlify/functions/openai-background.js
const axios = require('axios');
const { OpenAIApi, Configuration } = require('openai');
const client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
const initial_prompt = "Turn the below input into a structured json list of objects. Each item in the list should have the following properties: - id - name - description - tags - a relevant website link (if you can find it) Here is an example item: { 'id': '2', 'name': 'Panadería Rosetta', 'tags': ['Café', 'Pastries'], 'link': 'https://www.panaderiarosetta.com/', 'description': 'Famous bakery for pastries & coffee' } Here is the input:"

exports.handler = async function (event, context, callback) {
    console.log("OPENAI")
    const { text, phoneNumber } = JSON.parse(event.body);
    console.log(phoneNumber)
    console.log(text)
    const prompt = initial_prompt + text

    const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
    });

    const openai = new OpenAIApi(configuration);

    try {
        const completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{"role": "user", "content": prompt}],
            max_tokens: 3500
        });
        console.log(completion.data.choices)
        console.log(completion.data.choices[0].message.content);

        // client.messages
        // .create({
        //    body: 'Your list is ready!',
        //    from: '+18339912619', // replace with your Twilio number
        //    to: phoneNumber
        //  });

        console.log("send text message")

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
