# ARIA DIALOG

## About

jQuery plugin for **accessible** dialogs: **WAI ARIA 1.1** compliant.

* Support for **modal dialogs** and **alert dialogs**.
* Easy to customize.
* SASS/SCSS files for simple and quick UI customisations.
* Only 4KB (minified).
* Compatible with [**t** css-framework](https://github.com/DavideTriso/t-css-framework)
* Runs in strict mode.
* Deep linking / URL hash navigation

## Dependencies

**jQuery**

Developed and tested with jQuery 3.2.1

## Cross-browser tests

* Tested on **Google Chrome 57** / macOS Sierra 10.


## Settings / Options

Name | Default | Type | Description | Required or optional
-----|---------|------|-------------|----------
dialogIdPrefix | dialog-- | string | Prefix used to generate the id of a dialog, if not set in markup | optional
dialogClass | dialog | string | Class of a dialog element. | optional
wrapperClass | dialog__wrapper | string | Class of a dialog wrapper. | optional
containerClass | dialog__container | string | Class of a dialog container. | optional
headingClass | dialog__heading | string | Class of a dialog heading. | optional
openClass | dialog_open | string | Class added to an open dialog | optional
wrapperOpenClass | dialog__wrapper_open | string | Class added to a dialog wrapper, when the dialog is open | optional
dialogType | modal |  token | Set type of dialog: modal or alert. For more informations see [https://www.w3.org/TR/wai-aria-practices-1.1/#alertdialog](https://www.w3.org/TR/wai-aria-practices-1.1/#alertdialog) and [https://www.w3.org/TR/wai-aria-practices-1.1/#dialog_modal](https://www.w3.org/TR/wai-aria-practices-1.1/#dialog_modal). (Support for non-modal dialog is planned for future verions of the plugin). | optional
closeWithEsc | true | bool | Close dialog when esc key is pressed. | optional (recommended value: true)
closeOnBgClick | true | bool | Close dialog if user clicks on dialog's background | optional
fadeSpeed | 100 | int (>= 0) | Duration of fade-in and fade-out animations. | optional
cssTransitions | false | bool | Use css transitions to show/hide dialog instead of jQuery fade animation. Read section 'Using CSS transitions' for more infos | optional
setFocusOn | 'button:first-child' | string  (selector) | The element of the dialog to set focus on, when the dialog is open | **Required**
deepLinking | false | bool | Enable deep linking / URL hash navigation | optional


## Usage

1. Include the JS script **aria-dialog.js** - or the minified production script **aria-dialog.min.js**-  in the head or the body of your HTML file.
2. Include the CSS file  **aria-dialog.css** in the head of your HTML file or use the SCSS files. Adapt the CSS rules to match your website's design. 
3. Initialise the widget within an inline script tag, or in an external JS file.

### HTML

Use following HTML markup to create a dialog:

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

**IMPORTANT**: if no ID is set on the **dialog** element, the plugin automatically generates and sets an ID when the widget is initialised. Nevertheless, setting an ID to each dialog directly in HTML is **recommended** when using the widget in deep linking mode, because the ID of the dialog appeare in the URL. A meaningful ID will improve usability and SEO.

### JS: Initialise

Initialise the plugin as follows:

```javascript
$('.dialog').ariaDialog({
  option1: value1,
  option2: value2
});
```

## Methods

The plugin supports following methods: show, hide.

### Open:

To open a dialog call ariaDialog and pass **'show'** as parameter:

```javascript
$('#my-dialog').ariaDialog('show');
```

### Hide:

To close a dialog call ariaDialog and pass **'hide'** as parameter:

```javascript
$('#my-dialog').ariaDialog('hide');
```

## Using CSS transitions

By default the plugin is configured to use JS to show/hide dialogs. Setting the option **cssTransitions** to 'true' will disable the JS animations and it is possible to implement show/hide animations directly in the css. In fact, the plugin toggles the classes passed along with the options **dialogOpenClass** and **wrapperOpenClass** when the dialog is toggled.

## Inject dialogs dinamically

A compatible **extension to dynamically generate and inject dialogs in the DOM** is provided at [https://github.com/DavideTriso/aria-dialog-generator](https://github.com/DavideTriso/aria-dialog-generator).


## Planned features

* Support for non-modal dialogs.
* Better SCSS: Mixins to quickly build awesome dialogs will be provided.

## LICENSE

This project is licensed under the terms of the **MIT license**.

See [LICENSE.md](LICENSE.md) for detailed informations.
