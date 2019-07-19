import data from './data.json';

export function handleEvents(client, events) {
  return Promise.all(events.map(event => replyMessage(client, event)));
}

const quickReply = {
  items: [
    {
      type: 'action',
      action: {
        type: 'message',
        label: 'Hi!',
        message: 'Hi Peach Cookie!',
      },
    },
    {
      type: 'action',
      action: {
        type: 'message',
        label: 'Cheer Up!',
        message: 'Cheer Up Peach Cookie!',
      },
    },
    {
      type: 'action',
      action: {
        type: 'message',
        label: 'Chat...',
        message: '*Talks to Peach Cookie*',
      },
    },
    { 
      type: 'action',
      action: {
        type: 'message',
        label: 'Favorite Item?',
        message: 'What kind of things do you like, Peach Cookie?',
      },
    },
    { 
      type: 'action',
      action: {
        type: 'message', 
        label: 'Disliked Item?',
        message: 'What kind of things do you dislike, Peach Cookie?',
      },
    },
    {
      type: 'action',
      action: {
        type: 'message',
        label: 'Author?',
        message: 'Who created you, Peach Cookie?',
      },
    },
  ],
};

function replyMessage(client, event) {
  switch (event.type) {
    case 'follow': {
      handleFollowEvent(client);
      break;
    }

    case 'message': {
      if (event.message.type !== 'text') {
        handleNotUnderstand(client);
        break;
      }

      handleMessageEvent(client, event.message.text);
      break;
    }

    default: {
      return Promise.resolve(null);
    }
  }
}

function handleFollowEvent(client) {
  const message = {
    type: 'text',
    message: 'Hello! My name is Peach Cookie! The cutest cookie in Cookie Run: Ovenbreak!',
    quickReply,
  };

  return client.replyMessage(message);
}

function handleMessageEvent(client, text) {
  const message = {
    type: 'text',
    text: 'I\'m sowwy, but I don\'t understand what are you talking about...',
    quickReply,
  };

  switch (text) {
    case 'Hi Peach Cookie!': {
      const greetMessage = data.greet;
      const idx = Math.floor(Math.random() * greetMessage.length); 
      message.text = greetMessage[idx];
      break;
    }

    case 'Cheer Up Peach Cookie!': {
      const cheerMessage = data.cheer;
      const idx = Math.floor(Math.random() * cheerMessage.length);
      message.text = cheerMessage[idx];
      break;
    }

    case '*Talks to Peach Cookie*': {
      const chatMessage = data.chat;
      const idx = Math.floor(Math.random() * chatMessage.length);
      message.text = chatMessage[idx];
      break;
    }

    case 'What kind of things do you like, Peach Cookie?': {
      let msg = 'I like:\n\n';
      for (let i = 0, len = data.like.length; i < len; i++) {
        msg += `${i}. ${data.like[i]}`;
        if (i < len - 1) {
          msg += '\n';
        }
      }

      message.text = msg;

      break; 
    }

    case 'What kind of things do you dislike, Peach Cookie?': {
      const msg = `I don't like ${data.dislike}`;
      message.text = msg;

      break;
    }

    case 'Who created you, Peach Cookie?': {
      const msg = `I'm created by Devsisters back then, but Namchee ported me to LINE so I can meet you!`;
      message.text = msg;

      break;
    }
  }

  return client.replyMessage(message);
}

function handleNotUnderstand(client) {
  const message = {
    type: 'text',
    text: 'I\'m sowwy, but I don\'t understand what are you talking about...',
    quickReply,
  };

  return client.replyMessage(message);
}
