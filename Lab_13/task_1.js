let username = "my name";
let bonusBalance = 1000;

let bonuspurchase = 50;
let days = 7;
let bonustoburn = 3;
let purchaseCount = 4;

console.log("Пользователь " + username);
console.log("Баланс " + bonusBalance);

let finalBalance =
  bonusBalance + bonuspurchase * purchaseCount - days * bonustoburn;
console.log("Баланс пользователя через 7 дней: " + finalBalance);

let messages = [
  "Пойдем гулять в парк?",
  "Кажется, дождь собирается. Лучше пойдем в кино!",
  "Давай, сегодня как раз вышел новый фильм.",
  "Встречаемся через час у кинотеатра.",
];

for (let i = 0; i < messages.length; i++) {
  let sender;

  if (i % 2 === 0) {
    sender = "Друг: ";
  } else {
    sender = "Вы: ";
  }
  console.log(sender + messages[i]);
}

let messagetofind = "кино";

console.log("Сообщения, в которых есть искомое слово: ");
for (let i = 0; i < messages.length; i++) {
  if (messages[i].includes(messagetofind)) {
    console.log("" + messages[i]);
  }
}