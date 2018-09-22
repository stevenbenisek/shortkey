const shortkey = handlers => event => {
  const name = [
    'on',
    event.ctrlKey ? 'Ctrl' : null,
    event.altKey ? 'Alt' : null,
    event.shiftKey ? 'Shift' : null,
    event.metaKey ? 'Meta' : null,
    event.key,
  ]
    .filter(Boolean)
    .join('');

  const handler = handlers[name];

  if (handler) {
    handler(event);
  }
};

export default shortkey;
