import test from 'ava';
import React from 'react';
import ReactDOM from 'react-dom';
import shortkey from './index';

let node;

test.beforeEach(() => {
  node = document.createElement('div');
  document.body.appendChild(node);
});

test.afterEach(() => {
  document.body.removeChild(node);
  node = null;
});

test.serial('DOM addEventListener()', t => {
  let key;

  const handler = shortkey({
    onEscape: e => (key = e.key),
  });

  const event = new KeyboardEvent('keydown', {
    key: 'Escape',
  });

  node.addEventListener('keydown', handler);

  node.dispatchEvent(event);

  t.true(key === 'Escape');
});

test.serial('DOM removeEventListener()', t => {
  let key = 0;

  const handler = shortkey({
    onEscape: e => ++key,
  });

  const event = new KeyboardEvent('keydown', {
    key: 'Escape',
  });

  node.addEventListener('keydown', handler);

  node.dispatchEvent(event);

  t.true(key === 1);

  node.removeEventListener('keydown', handler);

  node.dispatchEvent(event);

  t.true(key === 1);
});

test.serial('React and ReactDOM', t => {
  let key;

  const handler = shortkey({
    onEscape: e => (key = e.key),
  });

  const Component = () => <input onKeyDown={handler} />;

  ReactDOM.render(<Component />, node);

  const event = new KeyboardEvent('keydown', {
    key: 'Escape',
    bubbles: true /* get react's event delegation to work */,
  });

  node.firstChild.dispatchEvent(event);

  t.true(key === 'Escape');
});
