const msgerForm = get(".msger-inputarea");
const msgerInput = get(".msger-input");
const msgerChat = get(".msger-chat");
const BOT_IMG = "bot.png";
const PERSON_IMG = "user.png";
const BOT_NAME = "BOT";
const PERSON_NAME = "You";
const prompts = [
  ["hi", "hey", "hello", "good morning", "good afternoon"],
  ["what is hotel name","name"],
  ["cash or card","how to pay"],
  ["available food items","menu"],
  ["who are you", "are you human", "are you bot", "are you human or bot"],
  ["who created you", "who made you","who is auther"],
  [
    "your name please",
    "your name",
    "may i know your name",
    "what is your name",
    "what call yourself"
  ],
  ["what about service","about feedback","hotel status","service rating"],
  ["location of hotel","address","location","where is it","contact details"],
  ["book table for me","book table","i want table"],
  ["i want coffee","i want tea","i want water","i want colddrink","i want pizaa","i want rice","i want soup"],
  ["i need help","i am in trouble","guid me"],
  ["bye", "good bye", "goodbye", "see you later"],
  ["what should i eat today","what is special today"],
  ["book room for me","today","tomorrow"],
  ["what", "why", "how", "where", "when"],
  ["for one day","for two days","for three days","for four days","for five days"],
  [""],
  ["haha", "ha", "lol", "hehe", "funny", "joke"],
  ["looking for room"],
  ["how much charge for day","charges"],
  ["what about cleanliness","clean","hygine","what about hygine"],
  ["nearby bus station","how to travell","travelling facilities","travell"],
 
  
]
const replies = [
  ["Hello Sir!", "Hi Sir!", "Hey!", "Good Morning sir!", "Good afternoon sir!"],
  ["HOTEL MAHARAJA" ],
  ["Only card sir!"],
  ["Sea food, Indian, Chinese, Salads and Beavereges"],
  ["I am just a Hotel manager bot"],
  ["HOTEL MAHARAJA AND TEAM"],
  ["I am MAHARAJA"],
  ["Sir our service is five star rated"],
  ["HOTEL MAHARAJA Pencil chawk baramati CONTACT DETAILS: maharaja@mail 02163 72007"],
  ["Done! Its table no.2 Enjoy!"],
  ["Order placed it will be in your room within five minutes.."],
  ["Please tell me how can i help you?"],
  ["Bye", "Goodbye", "See you later"],
  ["Sushi", "Pizza"],
  ["ok how many days you want to book room"],
  ["Great question"],
  ["Booked sir 235 is your room number for which 235 is password key.Thank you!"],
  ["Please say something :("],
  ["Haha!", "Good one!"],
  ["To help you further.Let me know when you need room?"],
  ["Sir its about which sesrvice you want, we have some affordable offers too..!"],
  ["Our rooms and retaurant are so clean and we care about your hygine"],
  ["Nearby bus station: Pencil chawk, Our cab will pickup from station"]
  
];
const alternative = [
  "I didnt understand!",
  "Go on...",
  "It is difficult to understand..",
  "Try again",
  "I'm listening...",
  "Please can you repeat!!"
]
const robot = ["How do you do, fellow human", "I am not a bot"];
msgerForm.addEventListener("submit", event => {
  event.preventDefault();
  const msgText = msgerInput.value;
  if (!msgText) return;
  msgerInput.value = "";
  addChat(PERSON_NAME, PERSON_IMG, "right", msgText);
  output(msgText);
});
function output(input) {
  let product;
  let text = input.toLowerCase().replace(/[^\w\s]/gi, "").replace(/[\d]/gi, "").trim();
  text = text
    .replace(/ a /g, "")  
    .replace(/i feel /g, "")
    .replace(/whats/g, "what is")
    .replace(/please /g, "")
    .replace(/ please/g, "")
    .replace(/r u/g, "are you");
  if (compare(prompts, replies, text)) {
    product = compare(prompts, replies, text);
  } else if (text.match(/thank/gi)) {
    product = "You're welcome!"
  } else if (text.match(/(robot|bot|robo)/gi)) {
    product = robot[Math.floor(Math.random() * robot.length)];
  } else {
    product = alternative[Math.floor(Math.random() * alternative.length)];
  }
  const delay = input.split(" ").length * 100;
  setTimeout(() => {
    addChat(BOT_NAME, BOT_IMG, "left", product);
  }, delay);
}
function compare(promptsArray, repliesArray, string) {
  let reply;
  let replyFound = false;
  for (let x = 0; x < promptsArray.length; x++) {
    for (let y = 0; y < promptsArray[x].length; y++) {
      if (promptsArray[x][y] === string) {
        let replies = repliesArray[x];
        reply = replies[Math.floor(Math.random() * replies.length)];
        replyFound = true;
        break;
      }
    }
    if (replyFound) {
      break;
    }
  }
  return reply;
}
function addChat(name, img, side, text) {
  const msgHTML = `
    <div class="msg ${side}-msg">
      <div class="msg-img" style="background-image: url(${img})"></div>
      <div class="msg-bubble">
        <div class="msg-info">
          <div class="msg-info-name">${name}</div>
          <div class="msg-info-time">${formatDate(new Date())}</div>
        </div>
        <div class="msg-text">${text}</div>
      </div>
    </div>
  `;
  msgerChat.insertAdjacentHTML("beforeend", msgHTML);
  msgerChat.scrollTop += 500;
}
function get(selector, root = document) {
  return root.querySelector(selector);
}
function formatDate(date) {
  const h = "0" + date.getHours();
  const m = "0" + date.getMinutes();
  return `${h.slice(-2)}:${m.slice(-2)}`;
}
function random(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}