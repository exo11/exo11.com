'use strict';

const e = (name, props, ...childs) => ({name, props, childs});

function createElement(node) {
  if (typeof node === 'string') {
    return document.createTextNode(node);
  } else {
    const element = document.createElement(node.name);
    if (typeof node.props === 'object' && node.props !== null) {
      Object.keys(node.props).forEach(i => {
        element.setAttribute(i, node.props[i]);
      });
    }
    if (node.childs instanceof Array) {
      node.childs.forEach(child => {
        element.appendChild(createElement(child))
      });
    }
    return element;
  }
}

function createConcertsNode() {
  const concertsNode = e('div',{'class': 'dynamic_container'},
    e(
      'div',{'class': 'concert_card_wrapper'},
      e('h2', {'class': 'concert_card_main-title'}, 'Upcoming shows'),
      e('div', {'class': 'concert_card_container'},''),
    )
  );  
  
  const concertsCards = concertArr.reduce((fragment,concert) => {
    let concertCard = e('div', {'class': 'concert_card'},
      e('div',{'class': 'concert_card_title'}, concert.data),
      e('div', {'class': 'concert_card_content_wrapper'},
        e('div', {'class': 'concert_card_content'},
          e('p', {'class': 'concert_card_content_club'}, concert.club),
          e('p', {'class': 'concert_card_content_address'}, concert.address),
          e('p', {'class': 'concert_card_content_time'}, concert.time)
        )
      ),
      e('a', {'class': 'concert_card_buy-ticket', 'href': concert.clubLink}, 'Buy ticket')
    );
    fragment.appendChild(createElement(concertCard));
    return fragment;
  },document.createDocumentFragment());
  
  document.getElementById('root').appendChild(createElement(concertsNode));
  document.querySelector('.concert_card_container').appendChild(concertsCards);
}

/*function createFeedbackNode() {
  const feedbackNode = e('div',{'class': 'dynamic_container'},
  e('div',{'class': 'feedback_wrapper'},
    e('h2',{'class':'feedback_main_title'},'Get in touch'),
    e(
      'form',{'class': 'feedback_form'},
      e(
        'div', {'class': 'feedback_input_wrapper'},
        e(
          'div', {'class': 'feedback_input_container'},
          e('h3',{'class': 'feedback_input_title'},'Name:'),
          e('input', {'class': 'feedback_input'},''),
          e('h3',{'class': 'feedback_input_title'},'Email:'),
          e('input', {'class': 'feedback_input'},''),
        ),
        e(
          'div', {'class': 'feedback_img_wrapper'},
          e('i', {'class': 'fa fa-connectdevelop fa-5x', 'aria-hidden': 'true'},'')
        )
      ),
      e('h3', {'class': 'feedback_textarea_title'}, 'Message'),
      e('textarea',{'class': 'feedback_textarea'},''),
      e('button',{'class': 'feedback_button'},'Send')
      )
    )
  );
  document.getElementById('root').appendChild(createElement(feedbackNode));
}


function createContactsNode() {
  const contactsNode = e('div',{'class': 'dynamic_container'},
  e('div',{'class': 'contact_link_wrapper'},
    e('a',{'href': 'https://exo11@icloud.com', 'class': 'contact_link'},
      'exo11@icloud.com'),
    e('a',{'href': 'https://vk.com/prosvet_music', 'class': 'contact_link'},
      'vk.com/prosvet_music'),
    e('a',{'href': 'https://t.me/exo11', 'class': 'contact_link'},
      't.me/exo11'),
    e('a',{'href': 'https://github.com/exo11', 'class': 'contact_link'},
      'github.com/exo11'),
    )
  );
  document.getElementById('root').appendChild(createElement(contactsNode));
}




function createChatNode() {
  const chatNode = e('div', {'class': 'dynamic_container'},
    e('div', {'class': 'chat'},
      e('div', {'class': 'chat-title'},
        e('figure', {'class': 'avatar'},
          e('img', {'src': 'exo11_7_blue.png'}, '')
        ),
        e('h2', {'class': 'chat-status', 'data-online': 'в сети', 'data-offline': 'не в сети'}, 'не в сети'),
        e('form', {'class': 'name-box'},
          e('input', {'class': 'name-input', 'type': 'text', 'placeholder': 'Enter Your Name'},''),
          e('button', {'class': 'name-submit', 'type': 'submit'}, 'Ok')
        ),
        e('h1', {'class': 'admin_name chat-title_name'}, 'Exo11.com'),
        e('h1', {'class': 'username chat-title_name'}, 'Username')
      ),
      e('div', {'class': 'messages'},
        e('div', {'class': 'messages-templates'},
          e('div', {'class': 'message loading'}, ''),
          e('div', {'class': 'message'},
            e('figure', {'class': 'avatar'},
              e('img', {'src': 'exo11_7_blue.png'}, '')
            ),
            e('span', {'class': 'message-text'}, ''),
            e('div', {'class': 'timestamp'}, '')
          ),
          e('div', {'class': 'message message-personal'},
            e('span', {'class': 'message-text'}, ''),
            e('div', {'class': 'timestamp'}, '')
          ),
          e('div', {'class': 'message message-status'},
            e('span', {'class': 'message-text', 'data-offline': 'Администратор не в сети', 'data-online': 'Администратор появился в сети'}, '')
          )
        ),
        e('div', {'class': 'messages-content'})
      ),
      e('form', {'class': 'message-box', 'action': '/404/', 'method': 'POST'},
        e('input', {'class': 'message-input', 'type': 'text', 'placeholder': 'Enter your message …'},''),
        e('button', {'class': 'message-submit', 'disabled': 'true', 'type': 'submit'}, 'Send')
      )
    )
  );
  document.getElementById('root').appendChild(createElement(chatNode));
}
*/
/*--------------------------- concert objects -----------------------------*/

const concertArr = [
  {
    data: '21/09/2125',
    club: 'Cupboard Under the Stairs', 
    address: 'Number 4 Privet Drive, Little Whinging, Surrey, England',
    time: '19:00',
    clubLink:'https://olimpik.com.ru' 
  },
  {
    data: '22/09/2125',
    club: 'Cupboard Under the Stairs', 
    address: 'Number 4 Privet Drive, Little Whinging, Surrey, England',
    time: '15:00',
    clubLink:'http://www.wembleystadium.com' 
  },
  {
    data: '11/11/2125',
    club: 'Cupboard Under the Stairs', 
    address: 'Number 4 Privet Drive, Little Whinging, Surrey, England',
    time: '17:00',
    clubLink:'http://www.luzhniki.ru' 
  },
  {
    data: '17/07/2127',
    club: 'Cupboard Under the Stairs', 
    address: 'Number 4 Privet Drive, Little Whinging, Surrey, England',
    time: '21:00',
    clubLink:'http://www.wembleystadium.com' 
  }
];