const { OpenAI } = require('langchain/llms');

/**
 * 
 * Returns an instance of the specified language model.
 * @param {string} modelType - The type of language model to return. 
   * Currently Supported ['gpt-3.5-turbo', 'gpt-4', 'gpt-3.5-turbo-16k-0613', 'gpt-3.5-turbo-16k'].
 * @returns {Object} - An instance of the specified language model.
 * @throws {Error} if the input model type is not supported
 */
function getModel(modelType){
    let model
    if (['gpt-3.5-turbo', 'gpt-4', 'gpt-3.5-turbo-16k-0613', 'gpt-3.5-turbo-16k'].includes(modelType)) {
        model = new OpenAI({ 
            modelName: modelType,
            maxTokens: parseInt(process.env.OPENAI_MAX_TOKEN_REPLY),
            temperature: parseFloat(process.env.MODEL_TEMPERATURE),
            presencePenalty: parseFloat(process.env.MODEL_PRESENCE_PENALTY),
            frequencyPenalty: parseFloat(process.env.MODEL_FREQUENCY_PENALTY),
            user: process.env.MODEL_USER,
            openAIApiKey: process.env.OPENAI_API_KEY,
        })
    } else {
        throw new Error(`Model type: ${modelType} not supported.`)
    }
    return model
}

module.exports = { getModel }