const form = document.getElementById("chat-form");
const input = document.getElementById("chat-input");
const messages = document.getElementById("chat-messages");
const apiKey = "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";

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const message = input.value;
  input.value = "";

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
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
    }
  );
  const chatbotResponse = response.data.choices[0].text;

  messages.innerHTML += `<div class="message bot-message">
    <img src="./icons/chatbot.png" alt= "bot icon"> <span>${chatbotResponse}</span>
    </div>`;
});
