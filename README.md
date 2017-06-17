# ARIA DIALOG

## About

jQuery plugin for **accessible** dialogs: **WAI ARIA 1.1** compliant.

* Support for **modal dialogs** and **alert dialogs**.
* Easy to customize tanks to a small but usefull set of options.
* SASS/SCSS files for simple and quick UI customisations.
* Only 3KB (minified).
* Fully compatible with [**t** css-framework](https://github.com/DavideTriso/t-css-framework)
* Runs in strict mode.

## Dependencies

**jQuery**

Developed and tested with jQuery 3.2.1

## Cross-browser tests

* Tested on **Google Chrome 57** / macOS Sierra 10.
* Tested on **Mozilla Firefox 50** / macOS Sierra 10.
* Tested on **Safari 10** / macOS Sierra 10.
* Tested on **Safari for iOS 10.3.x** / iPhone 5s


## Settings / Options

Name | Default | Type | Description | Required or optional
-----|---------|------|-------------|----------
dialogClass | dialog | string | Class of a dialog element. | optional
dialogWrapperClass | dialog__wrapper | string | Class of a dialog wrapper. | optional
dialogContainerClass | dialog__container | string | Class of a dialog container. | optional
dialogHeadingClass | dialog__heading | string | Class of a dialog heading. | optional
dialogOpenClass | dialog_open | string | Class added to an open dialog | optional
dialogWrapperOpenClass | dialog__wrapper_open | string | Class added to a dialog wrapper, when the dialog is open | optional
dialogType | modal |  token | Set type of dialog: modal or alert. For more informations see [https://www.w3.org/TR/wai-aria-practices-1.1/#alertdialog](https://www.w3.org/TR/wai-aria-practices-1.1/#alertdialog) and [https://www.w3.org/TR/wai-aria-practices-1.1/#dialog_modal](https://www.w3.org/TR/wai-aria-practices-1.1/#dialog_modal). (Support for non-modal dialog is planned for future verions of the plugin). | optional
closeWithEsc | false | bool | Close dialog when esc key is pressed. | optional (recommended value: true)
closeOnBgClick | false | bool | Close dialog if user clicks on dialog background | optional
dialogContainerRole | document | token | Role of dialog content. Accepted values: document, application. For more information see [https://www.w3.org/TR/wai-aria-1.1/](https://www.w3.org/TR/wai-aria-1.1/). | optional
fadeSpeed | 100 | int (>= 0) | Duration of fade-in and fade-out animations. | optional
cssTransitions | false | bool | Use css transitions to show/hide dialog instead of jQuery fade animation. Read section 'Using CSS transitions' for more infos | optional
preventScroll | true | bool | When a dialog is open, prevent body from scrolling in the background. | optional
*deepLinking | false | bool | Enable deep linking feature. **IMPORTANT:** This feature is planned for future versions of the plugin | optional

## Usage

1. Include the JS script **aria-dialog.js** - or the minified production script **aria-dialog.min.js**-  in the head or the body of your HTML file.
2. Include the CSS file  **aria-dialog.css** in the head of your HTML file or use the SCSS files. Adapt the CSS rules to match your website's design. 
3. Initialise the widget within an inline script tag, or in an external JS file.

### HTML

Use following HTML markup to generate a dialog:

```html
<div class="dialog" id="dialog-1">
  <section class="dialog__wrapper">
    <section class="dialog__container">
      <header class="dialog__header">
        <h2 class="dialog__heading">Dialog heading</h2>
        <button class="dialog__dismiss-btn" id="dismiss-btn-2">X (Close)</button>
      </header>
      <div class="dialog__body">
        <p>This is a really useful dialog. Close dialog?</p>
        <div class="dialog__options">
          <button class="dialog__option-btn" type="button" id="btn-yes-1">Yes</button>
          <button class="dialog__option-btn" type="button" id="btn-no-1">No</button>
        </div>
      </div>
    </div>
  </section>
</div>
```

**IMPORTANT**: if no ID is set on the **.dialog** element, the plugin automatically generates and sets an ID when a dialog is initialised. Nevertheless, setting an ID to each dialog directly in HTML is **recommended**, in order to simplify jQuery selectors when calling methods on a dialog.

### JS: Initialise

Initialise the plugin as follows:

```javascript
$('.dialog').ariaDialog({
  option1: value1,
  option2: value2
});
```

## Methods

The plugin supports following methods: open, close, destroy and remove.

### Open:

To open a dialog call ariaDialog and pass **'open'** as parameter:

```javascript
$('#my-dialog').ariaDialog('open');
```

### Close:

To close a dialog call ariaDialog and pass **'close'** as parameter:

```javascript
$('#my-dialog').ariaDialog('close');
```

### Destroy and remove:

If you want, you can destroy a dialog by passing **'destroy'** as a parameter to the function:

```javascript
$('#my-dialog').ariaDialog('destroy');
```

Calling 'destroy' will remove all attributes and settings from a dialog, but the dialog will remain in the DOM.
If you want to completly remove the dialog from the DOM, use instead  the **'remove'** method:

```javascript
$('#my-dialog').ariaDialog('remove');
```

**NOTE:** It is possible to initalise, destroy and remove multiple dialogs with a single function call. The **open** and **close** methods instead can be called only on a single element at a time.


## Using CSS transitions

By default the plugin is configured to use JS to show/hide dialogs. Setting the option **cssTransitions** to 'true' will disable the JS animations and it is possible to implement show/hide animations directly in the css. In fact, the plugin toggles the classes passed along with the options **dialogOpenClass** and **dialogWrapperOpenClass** when the dialog is toggled.

## Inject dialogs dinamically

A compatible **extension to dynamically generate and inject dialogs in the DOM** is provided at [https://github.com/DavideTriso/aria-dialog-generator](https://github.com/DavideTriso/aria-dialog-generator).

## LICENSE

This project is licensed under the terms of the **MIT license**.

See [LICENSE.md](LICENSE.md) for detailed informations.
