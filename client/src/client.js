const sock = io("https://git.heroku.com/sleepy-fortress-48260.git");

const write = (text) => {
  const parent = document.querySelector('#events');

  const el = document.createElement('li');
  el.innerHTML = text;

  parent.appendChild(el);
};


const onFormSumbit = (e) => {
  e.preventDefault();
  console.log("done");
  const input = document.querySelector("#chat");
  const text = input.value;
  input.value = "";

  sock.emit('message', text);

};


write("Welcome to RPS");

sock.on('message', write)

document.querySelector("#chat-form").addEventListener('submit', onFormSumbit);
