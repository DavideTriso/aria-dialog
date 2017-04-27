# ARIA DIALOG

## About

jQuery plugin for **accessible** dialogs: **WAI ARIA 1.1** compliant.

* Support for **modal dialogs** and **alert dialogs**.
* Easy to customize tanks to a small but usefull set of options.
* SASS/SCSS files for simple and quick UI customisations.
* Only 3KB (minified).
* Fully compatible with **t-css-framework**
* Runs in strict mode.

## Dependencies

**jQuery**

Developed and tested with jQuery 3.2.1

## Cross-browser tests

* Tested on **Google Chrome 57** / macOS Sierra 10.
* Tested on **Mozilla Firefox 50** / macOS Sierra 10.
* Tested on **Safari 10** / macOS Sierra 10.


## Settings / Options

Name | Default | Type | Description
-----|---------|------|-------------
dialogClass | dialog | string | Class of a dialog element.
dialogWrapperClass | dialog__wrapper | string | Class of a dialog wrapper.
dialogContainerClass | dialog__container | string | Class of a dialog container.
dialogHeadingClass | dialog__heading | string | Class of a dialog heading .
dialogType | modal |  token | Set type of dialog: modal or alert. For more informations see [https://www.w3.org/TR/wai-aria-practices-1.1/#alertdialog](https://www.w3.org/TR/wai-aria-practices-1.1/#alertdialog) and [https://www.w3.org/TR/wai-aria-practices-1.1/#dialog_modal](https://www.w3.org/TR/wai-aria-practices-1.1/#dialog_modal). (Support for non-modal dialog is planned for future verions of the plugin).
closeWithEsc | false | bool | Close dialog when esc key is pressed.
dialogContainerRole | document | token | Role of dialog content. Accepted values: document, application. For more information see [https://www.w3.org/TR/wai-aria-1.1/](https://www.w3.org/TR/wai-aria-1.1/).
zIndex | 100 | int | Z-index assigned to dialog.
fadeSpeed | 100 | int (>= 0) | Duration of fade-in and fade-out animations.
*deepLinking | false | bool | Enable deep linking feature. **IMPORTANT:** This feature is planned for future versions of the plugin

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


# LICENSE

**FLOSS** - Free/Libre and Open Source Software.