# \*⃣ shortkey

[![Build Status](https://travis-ci.org/stevenbenisek/shortkey.svg?branch=master)](https://travis-ci.org/stevenbenisek/shortkey)

> A small library to handle [keyboard events](https://www.w3.org/TR/uievents/#events-keyboardevents) in a more declarative way

- [Install](#install)
- [Examples](#examples)
- [API](#api)
- [Browser support](#browser-support)

## Install

```shell
npm install shortkey
```

## Examples

Both examples use the HTML [dialog element](https://html.spec.whatwg.org/multipage/interactive-elements.html#the-dialog-element).
To learn more, [check out this demo about the dialog element](https://demo.agektmr.com/dialog/).

### DOM `addEventListener()`

```js
import shortkey from 'shortkey';

const dialog = document.createElement('dialog');

dialog.innerText = 'Dialog message';

dialog.addEventListener(
  'keydown',
  shortkey({
    onEscape: () => {
      dialog.close();
    },
  })
);

const button = document.createElement('button');

button.innerText = 'Open dialog';

button.addEventListener('click', () => dialog.showModal());

const fragment = document.createDocumentFragment();

fragment.appendChild(button);

fragment.appendChild(dialog);

document.body.appendChild(fragment);
```

### React and ReactDOM

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import shortkey from 'shortkey';

class App extends React.Component {
  constructor() {
    super();
    this.dialogRef = React.createRef();
  }

  get dialog() {
    return this.dialogRef.current;
  }

  handleButtonClick = () => this.dialog.showModal();

  handleDialogKeyDown = shortkey({
    onEscape: () => this.dialog.close(),
  });

  render() {
    return (
      <React.Fragment>
        <button onClick={this.handleButtonClick}>Open dialog</button>
        <dialog onKeyDown={this.handleDialogKeyDown} ref={this.dialogRef}>
          Dialog message
        </dialog>
      </React.Fragment>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
```

## API

**Shortkey** accepts a plain object. The keys are the event names. The values are the corresponding event handlers. The return value is a function.

The event names are matched against the [KeyboardEvent](https://www.w3.org/TR/uievents/#interface-keyboardevent)'s `ctrlKey`, `altKey`, `shiftKey`, `metaKey` and `key` attributes (in that order) and prefixed with `'on'`.

```js
shortkey({
  onDelete: e => console.log(e.key) /* Delete */,
  onArrowDown: e => console.log(e.key) /* ArrowDown */,
  onArrowUp: e => console.log(e.key) /* ArrowUp */,
  onShiftArrowLeft: e => console.log(e.key) /* ArrowLeft */,
  onCtrlAltDelete: e => console.log(e.key) /* Delete */,
  onShiftMetaEnter: e => console.log(e.key) /* Enter */,
});
```

Check the [UI Events KeyboardEvent key Values](https://www.w3.org/TR/uievents-key/) spec for a list of the `key` attribute's possible values.

## Browser support

**Shortkey** supports every browser that supports the [KeyboardEvent](https://www.w3.org/TR/uievents/#keyboardevent-keyboardevent)'s `key`, `ctrlKey`, `altKey`, `shiftKey` and `metaKey` attributes. MDN has a detailed overview of the [KeyboardEvent's browser compatibility](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent#Browser_compatibility).

### Shim

IE and Edge use non-standard `KeyboardEvent.key` identifiers. Depending on the `key` you're targetting, you might need a shim.

**Note**: this isn't necessary if you're using React with ReactDOM

```js
import 'shim-keyboard-event-key';
import shortkey from 'shortkey';

const handler = shortkey({
  onEscape: e => console.log(e.key) /* Escape */,
});
```
