'use strict';

function chats(container) {
  
  const connection = new WebSocket('wss://neto-api.herokuapp.com/chat'),
    chatStatus = container.querySelector('.chat-status'),
    messageSubmit = container.querySelector('.message-submit'),
    messageStatus = container.querySelector('.message-status'),
    messageStatusText = messageStatus.querySelector('.message-text'),
    messagesContent = container.querySelector('.messages-content'),
    message = container.getElementsByClassName('message')[1],
    messageText = message.querySelector('.message-text'),
    messageTime = message.querySelector('.timestamp'),
    messagePersonal = container.querySelector('.message-personal'),
    messagePersonalText = messagePersonal.querySelector('.message-text'),
    messagePersonalTime = messagePersonal.querySelector('.timestamp'),
    nameInput = container.querySelector('.name-input'),
    username = container.querySelector('.username'),
    nameSubmit = container.querySelector('.name-submit'),
    nameBox = container.querySelector('.name-box'),
    messageBox = container.querySelector('.message-box'),
    messageInput = container.querySelector('.message-input');

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

  function addUsername(evt) {
    if (nameInput.value !== '') {
      username.textContent = nameInput.value;
      username.classList.add('opacity_visible');
      nameBox.style.display ='none';
    }
  }

  nameBox.addEventListener('submit', addUsername);
  
  function addMessage(evt) {
    if (messageInput.value !== '' && nameBox.style.display === 'none') {
      connection.send(messageInput.value);
      messagePersonalText.textContent = messageInput.value;
      messagePersonalTime.textContent = new Date().toTimeString().slice(0, 5);
      messagesContent.appendChild(messagePersonal.cloneNode(true));
      messageInput.value = '';
    } else {
      nameInput.classList.add('name-input_change-color');
      nameSubmit.classList.add('name-submit_change-color');
    }
  }

  messageBox.addEventListener('submit', addMessage);

  window.addEventListener('beforeunload', () => {
    connection.close();
  });

}



