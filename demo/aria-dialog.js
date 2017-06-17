(function ($) {
  'use strict';
  var methods = {},
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
    var settings = $.extend({}, $.fn.ariaDialog.defaultSettings, userSettings),
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

    //append all data to jquery object
    dialog.data('dialogArray', dialogArray);


    //Hide the dialog on init
    //if the plugin is not configured to use css transitions
    if (!settings.cssTransitions) {
      elements.dialog.hide();
      elements.wrapper.css({
        opacity: 0
      });
    }

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
    var dialog = dialog.data('dialogArray')[1].dialog,
      wrapper = dialog.data('dialogArray')[1].wrapper,
      settings = dialog.data('dialogArray')[2],
      focussableElements = dialog.find('a[href], area[href], button:enabled, input:enabled, textarea:enabled, select:enabled, optgroup:enabled, option:enabled, menuitem:enabled, fieldset:enabled');
    focussableElements = {
      first: focussableElements.first(),
      last: focussableElements.last()
    };

    //get element with focus and store in variable focusEl
    focusEl = $(':focus');

    //prevent body scroll
    if (settings.preventScroll) {
      $('body').css('overflow-y', 'hidden');
    }

    //add open classes to dialog and wrapper
    //and set aria-hidden to false to expose dialog to AI
    dialog.addClass(settings.dialogOpenClass);
    wrapper.addClass(settings.dialogWrapperOpenClass).attr(a.aHi, a.f).focus();


    //if the plugin is configured to use css transitions,
    //then do not perform any js animation.
    if (!settings.cssTransitions) {
      //show dialog    
      dialog.show();
      //show wrapper
      wrapper.fadeTo(settings.fadeSpeed, 1);
    }

    //manage focus inside dialog
    //trap focus inside modal
    focussableElements.last.off('keydown').on('keydown', function (event) {
      if (event.keyCode === 9 && checkForSpecialKeys(event) === true) {
        event.preventDefault();
        focussableElements.first.focus();
      }
    });

    focussableElements.first.off('keydown').on('keydown', function (event) {
      if (event.keyCode === 9 && event.shiftKey && !event.ctrlKey && !event.altKey && !event.metaKey) {
        event.preventDefault();
        focussableElements.last.focus();
      }
    });


    //close dialog when escape is pressed
    //if closeWithEsc is set to true
    if (settings.closeWithEsc) {
      $(window).off('keydown').one('keydown', function (event) {
        if (event.keyCode === 27 && checkForSpecialKeys(event) === true) {
          methods.close(dialog);
        }
      });
    }
    //close dialog if user clicks on bg
    if (settings.closeOnBgClick) {
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
    var dialog = dialog.data('dialogArray')[1].dialog,
      wrapper = dialog.data('dialogArray')[1].wrapper,
      settings = dialog.data('dialogArray')[2];

    //enable body scroll
    if (settings.preventScroll) {
      $('body').css('overflow-y', '');
    }


    //add open classes to dialog and wrapper
    //and set aria-hidden to false to expose dialog to AI
    dialog.removeClass(settings.dialogOpenClass);
    wrapper.removeClass(settings.dialogWrapperOpenClass).attr(a.aHi, a.t).focus();

    //move focus back to element that had focus before dialog was opened
    if (focusEl !== '') {
      focusEl.focus();
    }

    //if the plugin is configured to use css transitions,
    //then do not perform any js animation.
    if (!settings.cssTransitions) {
      //fade out dialog    
      wrapper.fadeOut(settings.fadeSpeed, function () {
        dialog.hide();
      });
    }
  };



  //REMOVE DIALOG
  //-----------------------------------------------
  methods.remove = function (dialog) {
    //remove elements from DOM
    dialog.remove();
  };



  //DESTROY DIALOG - remove attributes and remove objects from array
  //This method does not remove the ID set on dialog element
  //-----------------------------------------------
  methods.destroy = function (dialog) {
    var wrapper = dialog.data('dialogArray')[1].wrapper;

    //remove data from jquery object
    dialog.removeData('dialogArray');

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
          methods.open($(this[0]));
          break;
        case 'close':
          methods.close($(this[0]));
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
    dialogOpenClass: 'dialog_open',
    dialogWrapperOpenClass: 'dialog__wrapper_open',
    dialogType: 'modal', // modal, alert (alertdialog)
    dialogContainerRole: 'document',
    closeWithEsc: false,
    closeOnBgClick: false,
    fadeSpeed: 100,
    cssTransitions: false,
    preventScroll: true
  }
}(jQuery));



$(document).ready(function () {
  'use strict';

  $('#dialog-1').ariaDialog({
    fadeSpeed: 200,
    closeWithEsc: true,
    closeOnBgClick: true
  });

  $('#dialog-2').ariaDialog({
    fadeSpeed: 200,
    dialogType: 'alert'
  });

  $('#open-1').click(function () {
    $('#dialog-1').ariaDialog('open');
  });

  $('#btn-yes-1').click(function () {
    $('#dialog-1').ariaDialog('close');
  });


  $('#open-2').click(function () {
    $('#dialog-2').ariaDialog('open');
  });

  $('#btn-yes-2, #dismiss-btn-2').click(function () {
    $('#dialog-2').ariaDialog('close');
  });

});
