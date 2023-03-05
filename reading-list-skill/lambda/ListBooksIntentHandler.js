const Alexa = require('ask-sdk-core');
const axios = require('axios').default;

const ListBooksIntentHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
      && Alexa.getIntentName(handlerInput.requestEnvelope) === 'ListBooksIntent';
  },
  async handle(handlerInput) {
    const bookListUrl = 'http://localhost:8081/books';
    const response = await axios.get(bookListUrl);
    const books = response.data;

    var spokenBooks = '';
    for (var i = 0; i < books.length; i++) {
        spokenBooks += books[i].title + ' by ' + books[i].author + ', ';
    }

    const speakOutput = `Here are the books in your library: ${spokenBooks}`;
    return handlerInput.responseBuilder
      .speak(speakOutput)
      .getResponse();
  }
};
module.exports = ListBooksIntentHandler;