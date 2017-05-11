(function ($) {
  'use strict';

  $.fn.ariaDialogGenerator = function (userSettings, dialogContent) {
    var settings = $.extend({
        dialogClass: 'dialog',
        dialogId: '',
        dialogWrapperClass: 'dialog__wrapper',
        dialogContainerClass: 'dialog__container',
        dialogHeaderClass: 'dialog__header',
        dialogBodyClass: 'dialog__body',
        dialogHeading: '<h2 class="dialog__heading"></h2>',
        dialogDismissBtn: ''
      }, userSettings),
      template = '<div class="' + settings.dialogClass + '" id="' + settings.dialogId + '">' +
      '<section class="' + settings.dialogWrapperClass + '">' +
      '<div class="' + settings.dialogContainerClass + '">' +
      '<header class="' + settings.dialogHeaderClass + '">' +
      settings.dialogHeading +
      settings.dialogDismissBtn +
      '</header>' +
      '<div class="' + settings.dialogBodyClass + '">' +
      dialogContent +
      '</div>' +
      '</div>' +
      '</section>' +
      '</div>';

    $(this).append(template);

  };
}(jQuery));

$(document).ready(function () {
  'use strict';

  var dialogContent = '<p>Hey there! I am a dynamically generated dialog.' +
    'Close me with a click on the following button:</p>' +
    '<button type="button" id="dynamic-modal-close-btn">Close dialog</button>';

  $('body').ariaDialogGenerator({
    dialogId: 'dynamic-modal',
    dialogDismissBtn: '<button type="button" class="dialog__dismiss-btn" id="dynamic-modal-dismiss-btn">X</button>'
  }, dialogContent);


  $('#dynamic-modal').ariaDialog({
    closeWithEsc: true,
  });

  $('#dynamic-modal').ariaDialog('open');
  $('#dynamic-modal-dismiss-btn, #dynamic-modal-close-btn').click(function () {
    $('#dynamic-modal').ariaDialog('close');
  });
});
