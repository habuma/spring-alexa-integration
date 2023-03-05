const Alexa = require('ask-sdk-core');
const axios = require('axios').default;

const AddBookIntentHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
      && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AddBookIntent';
  },
  async handle(handlerInput) {
    const bookSlot = Alexa.getSlotValueV2(handlerInput.requestEnvelope, 'book');
    const resolutionMatch = bookSlot.resolutions.resolutionsPerAuthority[0].status.code;
    if (resolutionMatch !== 'ER_SUCCESS_MATCH') {
        const speakOutput = "I'm sorry, I don't know that book. Please try again.";
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
    const bookData = await getBookData(handlerInput, bookSlot);
    const response = await addBookToReadingList(handlerInput, bookData);

    const speakOutput = (response.status == 200 || response.status == 201) ?
        `Adding ${bookData.title} by ${bookData.author}` :
        `I'm sorry, I had trouble adding ${bookData.title} by ${bookData.author} to the reading list.`;

    return handlerInput.responseBuilder
        .speak(speakOutput)
        .getResponse();
  }
};

const addBookToReadingList = async (handlerInput, bookData) => {
    const booksApiAccessToken = Alexa.getAccountLinkingAccessToken(handlerInput.requestEnvelope);
    const config = {
        headers: { Authorization: `Bearer ${booksApiAccessToken}` }
    };
    const bookListUrl = 'http://localhost:8081/books';
    return await axios.post(bookListUrl, bookData, config);
};

const getBookData = async (handlerInput, bookSlot) => {
        const bookEntity = bookSlot.resolutions.resolutionsPerAuthority[0].values[0].value;
        const apiAccessToken = Alexa.getApiAccessToken(handlerInput.requestEnvelope);
        const resolvedEntity = bookEntity.id;
        const headers = {
            'Authorization': `Bearer ${apiAccessToken}`,
            'Accept-Language': Alexa.getLocale(handlerInput.requestEnvelope)
        };
        const response = await axios.get(resolvedEntity, { headers: headers });
        const bookEntityData = response.data;
        const title = bookEntityData.name[0]['@value'];
        const authors = bookEntityData['entertainment:author'];
        // add each author to the author string with "and" before the last entry
        var author = '';
        for (var i = 0; i < authors.length; i++) {
            if (authors.length > 1 && i === authors.length - 1) {
                author += 'and ';
            }
            author += authors[i].name[0]['@value'] + ' ';
        }   
        
        return {
            title: title,
            author: author
        };
};


module.exports = AddBookIntentHandler;