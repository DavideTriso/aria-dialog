(function ($) {
  'use strict';
  var dialogsArray = (typeof dialogsArray === 'undefined') ? [] : dialogsArray, //check if dialogArray exists or not
    methods = {},
    count = 0,
    focusEl = '',
    a = {
      r: 'role',
      aHi: 'aria-hidden',
      aLab: 'aria-labelledby',
      tbI: 'tabindex',
      aLi: 'aria-live',
      t: 'true',
      f: 'false'
    };

  //PRIVATE FUNCTIONS
  //-----------------------------------------------

  function setId(element, id, i) {
    if (!element.is('[id]')) {
      element.attr('id', id + (i + 1));
    }
  }

  function getDialogIndex(dialog) {
    var i = 0,
      l = dialogsArray.length,
      index = 0;

    //find out index of dialog settings and elements in array
    for (i; i < l; i = i + 1) {
      if (dialogsArray[i][0] === dialog.attr('id')) {
        index = i;
      }
    }
    return index;
  }


  function verticallyAlignDialog(dialogWrapper, settings) {
    var marginTop = $(window).outerHeight() / 2 - dialogWrapper.outerHeight() / 2;
    dialogWrapper.css({
      'margin-top': marginTop,
      '-webkit-transform': 'translate(' + settings.translateX + '% ,' + settings.translateY + '% )',
      '-moz-transform': 'translate(' + settings.translateX + '% ,' + settings.translateY + '% )',
      '-ms-transform': 'translate(' + settings.translateX + '% ,' + settings.translateY + '% )',
      'transform': 'translate(' + settings.translateX + '% ,' + settings.translateY + '% )',
    });
  }
  //PLUGIN METHODS
  //INIT DIALOG
  //-----------------------------------------------
  methods.init = function (userSettings, dialog) {
    var settings = $.extend({
        dialogClass: 'dialog',
        dialogWrapperClass: 'dialog__wrapper',
        dialogHeadingClass: 'dialog__heading',
        dialogType: 'modal', //non-modal (implemented as a simple live region due to missing documentation), modal, alert (alertdialog)
        closeWithEsc: false,
        draggable: false,
        translateX: 0,
        translateY: 0,
        zIndex: 100,
        fadeSpeed: 300
      }, userSettings),
      elements = {
        dialog: dialog,
        wrapper: dialog.find('.' + settings.dialogWrapperClass),
        heading: dialog.find('.' + settings.dialogHeadingClass)
      },
      dialogId = '',
      dialogArray = [];

    //Set id on dialog if not set and save id into variable dialogId
    setId(elements.dialog, 'dialog-', count);
    dialogId = elements.dialog.attr('id');

    //save all dialog data into array
    dialogArray = [dialogId, elements, settings];

    //push array to 1st. level array - dialogsArray
    dialogsArray.push(dialogArray);
    //DIALGOS ARRAY ARCHITECTURE:
    /*
    dialogsArray ---> [i] ---> [0] Id of the dialog
                          ---> [1] Object wih elements
                          ---> [2]  Object with settings 
    */

    //Hide the dialog on init
    elements.dialog.hide().css({
      'z-index': settings.zIndex
    });
    elements.wrapper.css({
      opacity: 0
    });

    //Set needed attributes to dialog elements
    //set role (or aria-live as a fallback) on wrapper based on settings
    switch (settings.dialogType) {
      //case 'non-modal':
      //  elements.wrapper.attr(a.aLi, 'polite');
      //  break;
      case 'modal':
        elements.wrapper.attr(a.r, 'dialog');
        break;
      case 'alert':
        elements.wrapper.attr(a.r, 'alertdialog');
        break;
    }

    //set id on heading if not set and expose relation between heading and dialog wrapper by setting aria-labelledby
    setId(elements.heading, 'dialog-heading-', count);
    elements.wrapper.attr(a.aLab, elements.heading.attr('id'));

    //set tabindex to -1 to permit to set focus to the wrapper with JS when dialog is open
    //set aria-hidden to true
    elements.wrapper.attr(a.tbI, '0').attr(a.aHi, a.t);

    //increment count after every initalisation
    count = count + 1;
  };



  //OPEN DIALOG
  //-----------------------------------------------
  methods.open = function (dialog) {
    var index = getDialogIndex(dialog),
      focussableElements = dialog.find('a[href], area[href], button:enabled, input:enabled, textarea:enabled, select:enabled, optgroup:enabled, option:enabled, menuitem:enabled, fieldset:enabled');
    focussableElements = {
      first: focussableElements.first(),
      last: focussableElements.last()
    };

    //get element with focus and store in variable focusEl
    focusEl = $(':focus');


    //show dialog    
    dialogsArray[index][1].dialog.show();
    //vertically align dialog
    verticallyAlignDialog(dialogsArray[index][1].wrapper, dialogsArray[index][2]);
    $(window).on('resize', function () {
      verticallyAlignDialog(dialogsArray[index][1].wrapper, dialogsArray[index][2]);
    });
    //show wrapper
    dialogsArray[index][1].wrapper.fadeTo(dialogsArray[index][2].fadeSpeed, 1);
    dialogsArray[index][1].wrapper.attr(a.aHi, a.f);

    //if(dialogsArray[index][2].dialogType !== 'non-modal') {
    //focus dialog if it is a modal or alert dialog
    dialogsArray[index][1].wrapper.focus();

    //manage focus inside dialog
    //trap focus inside modal 
    focussableElements.last.unbind('keydown').on('keydown', function (event) {
      if (event.keyCode === 9 && !event.shiftKey) {
        event.preventDefault();
        focussableElements.first.focus();
      }
    });

    focussableElements.first.unbind('keydown').on('keydown', function (event) {
      if (event.keyCode === 9 && event.shiftKey) {
        event.preventDefault();
        focussableElements.last.focus();
      }
    });

    //close dialog when escape is pressed
    //if closeWithEsc is set to true
    if (dialogsArray[index][2].closeWithEsc) {
      $(window).unbind('keydown').one('keydown', function (event) {
        if (event.keyCode === 27) {
          methods.close(dialog);
        }
      });
    }
  };



  //CLOSE DIALOG
  //-----------------------------------------------
  methods.close = function (dialog) {
    var index = getDialogIndex(dialog);

    //fade out dialog    
    dialogsArray[index][1].wrapper.fadeOut(dialogsArray[index][2].fadeSpeed, function () {
      dialogsArray[index][1].dialog.hide();
      //move focus back to element that had focus before dialog was opened
      if (focusEl !== '') {
        focusEl.focus();
      }
    });
    dialogsArray[index][1].wrapper.attr(a.aHi, a.t);
  };



  //REMOVE DIALOG
  //-----------------------------------------------
  methods.remove = function (dialog) {
    var index = getDialogIndex(dialog);

    //remove entry from array
    dialogsArray.splice(index, 1);

    //remove elements from DOM
    dialog.remove();
  };

  //DESTROY DIALOG - remove attributes and remove objects from array
  //This method does not remove the ID set on dialog element
  //-----------------------------------------------
  methods.destroy = function (dialog) {
    var index = getDialogIndex(dialog);

    //remove entry from array
    dialogsArray.splice(index, 1);

    //remove all attributes from dialog wrapper
    dialogsArray[index][1].wrapper.removeAttr(a.r).removeAttr(a.aLi).removeAttr(a.tbI).removeAttr(a.aHi);
  };



  //PLUGIN
  //-----------------------------------------------
  $.fn.ariaDialog = function (userSettings) {
    if (typeof userSettings === 'object' || typeof userSettings === 'undefined') {
      this.each(function () {
        methods.init(userSettings, $(this));
      });
    }
    if (userSettings === 'open') {
      methods.open($(this));
    }
    if (userSettings === 'close') {
      methods.close($(this));
    }
    if (userSettings === 'remove') {
      methods.remove($(this));
    }
    if (userSettings === 'destroy') {
      methods.destroy($(this));
    }
  };
}(jQuery));
