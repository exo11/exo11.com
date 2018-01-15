'use strict';

function chats(container) {
  
  const connection = new WebSocket('wss://neto-api.herokuapp.com/chat'),
    chatStatus = container.getElementsByClassName('chat-status')[0],
    messageSubmit = container.getElementsByClassName('message-submit')[0],
    messageStatus = container.getElementsByClassName('message-status')[0],
    messageStatusText = messageStatus.getElementsByClassName('message-text')[0],
    messagesContent = container.getElementsByClassName('messages-content')[0],
    message = container.getElementsByClassName('message')[1],
    messageText = message.getElementsByClassName('message-text')[0],
    messageTime = message.getElementsByClassName('timestamp')[0],
    messagePersonal = container.getElementsByClassName('message-personal')[0],
    messagePersonalText = messagePersonal.getElementsByClassName('message-text')[0],
    messagePersonalTime = messagePersonal.getElementsByClassName('timestamp')[0],
    nameInput = container.getElementsByClassName('name-input')[0],
    username = container.getElementsByClassName('username')[0],
    nameSubmit = container.getElementsByClassName('name-submit')[0],
    nameBox = container.getElementsByClassName('name-box')[0],
    messageInput = container.getElementsByClassName('message-input')[0];

  connection.addEventListener('open', () => {
    chatStatus.textContent = chatStatus.dataset.online;
    messageSubmit.removeAttribute('disabled');
    messageStatusText.textContent = messageStatusText.dataset.online;
    messagesContent.appendChild(messageStatus.cloneNode(true));
  });

  connection.addEventListener('message', evt => {
    messageText.textContent = evt.data;
    messageTime.textContent = new Date().toTimeString().slice(0, 5);
    messagesContent.appendChild(message.cloneNode(true));
  });

  connection.addEventListener('close', evt => {
    chatStatus.textContent = chatStatus.dataset.offline;
    messageSubmit.setAttribute('disabled', 'disabled');
    messageStatusText.textContent = messageStatusText.dataset.offline;
    messagesContent.appendChild(messageStatus.cloneNode(true));
  });

  nameSubmit.addEventListener('click', addUsername);

  nameInput.addEventListener('keydown', evt => {
    if (evt.code === 'Enter') {
      addUsername();
    }
  });

  function addUsername(evt) {
    if (nameInput.value !== '') {
      username.textContent = nameInput.value;
      username.classList.add('opacity_visible');
      nameBox.style.display ='none';
    }
  }

  messageSubmit.addEventListener('click', addMessage);

  messageInput.addEventListener('keydown', evt => {
    if (evt.code === 'Enter') {
      addMessage();
    }
  });

  function addMessage(evt) {
    if (messageInput.value !== '' && nameBox.style.display === 'none') {
      connection.send(messageInput.value);
      messagePersonalText.textContent = messageInput.value;
      messagePersonalTime.textContent = new Date().toTimeString().slice(0, 5);
      messagesContent.appendChild(messagePersonal.cloneNode(true));
      messageInput.value = '';
    } else {
      nameInput.classList.add('name-input_red');
      nameSubmit.classList.add('name-submit_red');
    }
  }

  window.addEventListener('beforeunload', () => {
    connection.close();
  });

}

