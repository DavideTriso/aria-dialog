# ARIA DIALOG

## About

**Aria Dialog** is a jQuery plugin. It is useful to implement dialogs in websites. It has basic configuration options and is accessible for screen-reader users and keyboard-only users. The plugin is WAI-ARIA 1.1 compliant.

## Dependencies

**jQuery**
Developed and tested with jQuery 3.2.1

## Settings / Options

Name | Default | Type | Description
-----|---------|------|-------------
dialogClass | dialog | string | Class of a dialog element.
dialogWrapperClass | dialog__wrapper | string | Class of a dialog wrapper.
dialogHeadingClass | dialog__heading | string | Class of a dialog heading .
dialogType | modal |  token | Set type of dialog: modal or alert. For more informations see (https://www.w3.org/TR/wai-aria-practices-1.1/#alertdialog)[https://www.w3.org/TR/wai-aria-practices-1.1/#alertdialog] and (https://www.w3.org/TR/wai-aria-practices-1.1/#dialog_modal)[https://www.w3.org/TR/wai-aria-practices-1.1/#dialog_modal]. (Support for non-modal dialog is planned for futire verions of the plugin).
closeWithEsc | false | bool | Close dialog when esc key is pressed.
*draggable | false | bool | **IMPORTANT**: this feature is not yet implemented. Support for draggable dialogs is planned for future versions of the plugin.
translateX | 0 | number | Translate dailog on the X axis by a given percentage to reposition it in viewport.
translateY | 0 | number | Translate dailog on the Y axis by a given percentage to reposition it in viewport.
zIndex | 100 | int | Z-index assigned to dialog.
fadeSpeed | 300 | int (>= 0) | Duration of fade-in and fade-out animations.

## Usage

Include the JS script aria-dialog.js_ in the head or the body of your HTML file.

Include the CSS file  aria-dialog.css_ in the head of your HTML file. Adapt the CSS rules to match your website's design.  

Use following HTML markup in your HTML file to insert a dialog:

```
<div class="dialog" id="dialog-1">
  <section class="dialog__wrapper">
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
  </section>
</div>
```

**IMPORTANT**: if no ID is set on the _.dialog_ element, the plugin automatically generates and sets an ID when a dialog is initialised. Nevertheless, setting an ID to each dialog in HTML is recommended in order to simplify jQuery selectors when calling methods on a dialog.

## Initialise

Initialise the plugin as follows:

```
$('.dialog').ariaDialog({
  option1: value1,
  option2: value2
});
```

## Methods

### Open:

To open a dialog call ariaDialog and pass 'open' as parameter:

```
$('#my-dialog').ariaDialog('open');
```

### Close:

To close a dialog call ariaDialog and pass 'close' as parameter:

```
$('#my-dialog').ariaDialog('close');
```

### Destroy and remove:

If you want, you can destroy a dialog by passing 'destroy' as a parameter to the function:

```
$('#my-dialog').ariaDialog('destroy');
```

Calling 'destroy' will remove all attributes and settings from a dialog, but the dialog will remain in the HTML file.

If you want to completly remove the dialog, then call instead the function ariaDialog and pass 'remove' as a parameter:

```
$('#my-dialog').ariaDialog('remove');
```