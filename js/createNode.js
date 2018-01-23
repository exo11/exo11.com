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
  fetch('concert_JSON/concert.json')
  .then(res => res.json()) 
  .then(concertArr => { 
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
  })
  .then(() => {
    setTimeout(() => {
      root.querySelector('.dynamic_container').classList.add('dynamic_visible')
    }, 10);
  });
}

