
// to get access to the form and others in the web page, we use the document object and its method 'getElementById' as 
// we have all the ids inside the index.html
const form = document.getElementById("chat-form");
const input = document.getElementById("chat-input");
const messages = document.getElementById("chat-messages");
// the secret key(api key) gives us right to access resources from the openai API. In other words,
// it is used for authorization
const apiKey = "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";

// adding an event listner, whenever a user clicks the submit button, this function will be triggered
// assigning
// and clears out(re-set to null) the input field.
// the async or callback function inside the addEventListener delivers an asynchronouse result. 
form.addEventListener("submit", async (e) => {
  // prevents the default behaviour of a web page when a user clicks on the submit button, it blocks the
  // user from sending a request to the server (in this case to the openai API), and as a result the page 
  // doesn't get refreshed 
  e.preventDefault();
  const message = input.value;
  input.value = "";
  
  // dynamically displays the user-input inside the message HTML element  
  messages.innerHTML += `<div class= "message user-message">
    <img src = "./icons/user.png" alt="user icon"> <span>${message}</span>
    </div>`;

  // axios library to make a POST request to the OpenAI API
  const response = await axios.post(
    "https://api.openai.com/v1/completions",
    {
      prompt: message,
      model: "text-davinci-002",
      temperature: 0.2,
      max_token: 10000,
      top_p: 1,
      frequency_penality: 0.0,
      presence_penality: 0.0,
    },
    {
      // request header 
      headers: {
        "Content-Type": "application/json", // the form of data being sent is in json form 
        Authorization: `Bearer ${apiKey}`, // Gives access right to the openai resources (response)
      },
    }
  );

  // the response from openai API
  //the finall response resides inside the choices array and we take the first 
  const chatbotResponse = response.data.choices[0].text;

  // finally displaying dynamically the response from the openai inside the messages HTML element that we got hold of above 
  // by using id (document.getElementById("chat-messages"))
  messages.innerHTML += `<div class="message bot-message">
    <img src="./icons/chatbot.png" alt= "bot icon"> <span>${chatbotResponse}</span>
    </div>`;
});
