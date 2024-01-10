exports = async function(changeEvent) {

    // The following code is for the "Completion" API endpoint. This is a "Legacy" endpoint and is not the same as the "Chat" endpoint, which is what most people will want to use. Ensure you are using the correct endpoint for your use case.

    // Ensure the following is set to the value for your OpenAI API key
    const apiKey = context.values.get("openaiApiKey");

    // Ensure the following values are set to match your service and database names
    const collection = context.services.get('mongodb-atlas').db('your-database').collection(changeEvent.ns.coll);
    
    // Extract the relevant data from the change event
    const documentId = changeEvent.documentKey._id;
    const newData = changeEvent.fullDocument;
    const chatEndpoint = 'https://api.openai.com/v1/completions'


    // Configure the OpenAI API Comppletions request. The below configuration uses a reference to the "prompt" field from the document for the prompt.
    const apiConfig = {
        "model":"davinci-2",
        "temperature": 1,
        "max_tokens": 450,
        "top_p": 1,
        "prompt": newData.prompt
    }

    
    try {
        // Make a request to the OpenAI API
        const openaiResponse = await context.http.post({
            url: chatEndpoint,
            headers: {
                'Content-Type': ['application/json'],
                'Authorization': [`Bearer ${apiKey}`]
            },
            body: JSON.stringify(apiConfig)
        });

        // Extract the response from the OpenAI API
        let response = JSON.parse(openaiResponse.body.text());

        // Check if the response was successful
        if (openaiResponse.statusCode === 200) {
            console.log("Success from OpenAI API: " + JSON.stringify(response));

            // Extract the assistant response from the OpenAI API response.
            const promptResponse = response.choices[0].text;

            // Update the document with the extracted response. Ensure the $set operator is updating the desired field in your document.
            const updateResult = await collection.updateOne(
                { _id: documentId },
                { $set: { summary: promptResponse } }
            );

            // Log the result of the update operation
            console.log("Successfully updated document with id: " + documentId);
        }
        else {
            // Log the error from the OpenAI API
            console.log("Error from OpenAI API: " + JSON.stringify(response));
        }

    }
    catch (error) {
        // Log the error from the OpenAI API
        console.log("Error from OpenAI API: " + error);
    }
};