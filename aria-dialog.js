(function ($) {
  'use strict';
  var dialogsArray = [],
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
      index = 0,
      dialogId = dialog.attr('id');

    //find out index of dialog settings and elements in array
    for (i; i < l; i = i + 1) {
      if (dialogsArray[i][0] === dialogId) {
        index = i;
      }
    }
    return index;
  }

  //Chek if any modifier key is pressed
  function checkForSpecialKeys(event) {
    if (!event.shiftKey && !event.ctrlKey && !event.altKey && !event.metaKey) {
      //none is pressed
      return true;
    }
    return false;
  }

  //PLUGIN METHODS
  //INIT DIALOG
  //-----------------------------------------------
  methods.init = function (userSettings, dialog) {
    var settings = $.extend({},  $.fn.ariaDialog.defaultSettings, userSettings),
      elements = {
        dialog: dialog,
        wrapper: dialog.find('.' + settings.dialogWrapperClass),
        container: dialog.find('.' + settings.dialogContainerClass),
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
                          ---> [2] Object with settings 
    */

    //Hide the dialog on init
    elements.dialog.hide().css({
      'z-index': settings.zIndex
    });
    elements.wrapper.css({
      opacity: 0
    });

    //Set needed attributes to dialog elements
    switch (settings.dialogType) {
      case 'modal':
        //case 'non-modal':
        elements.wrapper.attr(a.r, 'dialog');
        break;
      case 'alert':
        elements.wrapper.attr(a.r, 'alertdialog');
        break;
    }
    elements.container.attr(a.r, settings.dialogContainerRole);

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
      dialog = dialogsArray[index][1].dialog,
      wrapper = dialogsArray[index][1].wrapper,
      focussableElements = dialog.find('a[href], area[href], button:enabled, input:enabled, textarea:enabled, select:enabled, optgroup:enabled, option:enabled, menuitem:enabled, fieldset:enabled');
    focussableElements = {
      first: focussableElements.first(),
      last: focussableElements.last()
    };

    //get element with focus and store in variable focusEl
    focusEl = $(':focus');

    //prevent body scroll
    if (dialogsArray[index][2].preventScroll) {
      $('body').css('overflow-y', 'hidden');
    }

    //show dialog    
    dialog.show();
    //show wrapper
    wrapper.fadeTo(dialogsArray[index][2].fadeSpeed, 1).attr(a.aHi, a.f).focus();

    //manage focus inside dialog
    //trap focus inside modal
    focussableElements.last.unbind('keydown').on('keydown', function (event) {
      if (event.keyCode === 9 && checkForSpecialKeys(event) === true) {
        event.preventDefault();
        focussableElements.first.focus();
      }
    });

    focussableElements.first.unbind('keydown').on('keydown', function (event) {
      if (event.keyCode === 9 && event.shiftKey && !event.ctrlKey && !event.altKey && !event.metaKey) {
        event.preventDefault();
        focussableElements.last.focus();
      }
    });


    //close dialog when escape is pressed
    //if closeWithEsc is set to true
    if (dialogsArray[index][2].closeWithEsc) {
      $(window).unbind('keydown').one('keydown', function (event) {
        if (event.keyCode === 27 && checkForSpecialKeys(event) === true) {
          methods.close(dialog);
        }
      });
    }
    //close dialog if user clicks on bg
    if (dialogsArray[index][2].closeOnBgClick) {
      dialog.on('click', function (event) {
        methods.close(dialog);
      });
      wrapper.on('click', function (event) {
        event.stopPropagation();
      });
    }
  };



  //CLOSE DIALOG
  //-----------------------------------------------
  methods.close = function (dialog) {
    var index = getDialogIndex(dialog),
      dialog = dialogsArray[index][1].dialog,
      wrapper = dialogsArray[index][1].wrapper;


    //enable body scroll
    if (dialogsArray[index][2].preventScroll) {
      $('body').css('overflow-y', '');
    }

    //fade out dialog    
    wrapper.attr(a.aHi, a.t).fadeOut(dialogsArray[index][2].fadeSpeed, function () {
      dialog.hide();
      //move focus back to element that had focus before dialog was opened
      if (focusEl !== '') {
        focusEl.focus();
      }
    });
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
    var index = getDialogIndex(dialog),
      wrapper = dialogsArray[index][1].wrapper;

    //remove entry from array
    dialogsArray.splice(index, 1);

    //remove all attributes from dialog wrapper
    wrapper.removeAttr(a.r).removeAttr(a.aLi).removeAttr(a.tbI).removeAttr(a.aHi);
  };



  //PLUGIN
  //-----------------------------------------------
  $.fn.ariaDialog = function (userSettings) {
    if (typeof userSettings === 'object' || typeof userSettings === 'undefined') {
      this.each(function () {
        methods.init(userSettings, $(this));
      });
      return;
    } else {
      switch (userSettings) {
        case 'open':
          methods.open($(this));
          break;
        case 'close':
          methods.close($(this));
          break;
        case 'remove':
          this.each(function () {
            methods.remove($(this));
          });
          break;
        case 'destroy':
          this.each(function () {
            methods.destroy($(this));
          });
          break;
      }
    }
  };

  $.fn.ariaDialog.defaultSettings = {
    dialogClass: 'dialog',
    dialogWrapperClass: 'dialog__wrapper',
    dialogContainerClass: 'dialog__container',
    dialogHeadingClass: 'dialog__heading',
    dialogType: 'modal', // modal, alert (alertdialog)
    dialogContainerRole: 'document',
    closeWithEsc: false,
    closeOnBgClick: false,
    zIndex: 100,
    fadeSpeed: 100,
    preventScroll: true
  }
}(jQuery));