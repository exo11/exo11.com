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
  const concertsNode = e('div',{'class': 'dynamic_container', 'data-id': 'concerts_nav'},
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

function randName() {
  return 'callback' + Math.random().toString().slice(2, 6);
}

function loadData(url) {
  const functionName = randName();
  return new Promise((done, fail) => {
    window[functionName] = done;
    const script = document.createElement('script');
    script.src = `${url}?jsonp=${functionName}`;
    document.body.appendChild(script);
  });
}


loadData('https://github.com/exo11/exo11.com/tree/master/concert_JSON')
 .then(res => console.log(res))
 

fetch('https://github.com/exo11/exo11.com/tree/master/concert_JSON')
  .then(res => console.log(res))


fetch('https://github.com/exo11/exo11.com/blob/master/concert_JSON/concert.json')
  .then(res => console.log(res))  


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