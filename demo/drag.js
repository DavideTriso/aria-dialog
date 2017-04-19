 //Get pointer offset from top left corner of dialog for mouse 
 function getDragOffsetMouse(event, element) {
   var offset = element.offset();
   return {
     left: event.pageX - offset.left,
     top: event.pageY - offset.top
   };
 }

 //Get touch offset from top left corner of dialog for touch devices
 function getDragOffsetTouch(event, element) {
   var offset = element.offset();
   return {
     left: event.originalEvent.touches[0].pageX - offset.left,
     top: event.originalEvent.touches[0].pageY - offset.top
   };
 }

 //Return object with  element's width and height
 function getElementSize(element) {
   return {
     height: element.outerHeight(),
     width: element.outerWidth()
   };
 }

 //Drag element - change element top and left property
 //MOUSE
 function dragMouse() {

 }

 function dragTouch() {

 }


 //Drag dialog
 if (dialogsArray[index][2].draggable) {
   //MOUSE / POINTER / TRACKPAD
   dialogsArray[index][1].wrapper.on('mousedown', function (event) {
     dragInitialOffset = getDragOffsetMouse(event, dialogsArray[index][1].wrapper);
     screenSize = getElementSize($(window));
     dialogSize = getElementSize(dialogsArray[index][1].wrapper);
     dragNow = true;

     $(window).on('mousemove', function (event) {
       if (dragNow === true) {


       }
     });
   });

   //Stop propagation on focussable elements
   //Do not drag when user clicks on focussable elements
   focussable.on('mousedown', function (event) {
     event.stopPropagation();
   });

   //Stop dragging action
   dialogsArray[index][1].wrapper.on('mouseup', function () {
     dragNow = false;
   });


   //TOUCH
   dialogsArray[index][1].wrapper.on('touchstart', function (event) {
     dragNow = true;

     $(window).on('touchmove', function (event) {
       if (dragNow === true) {
         //drag(event, dialogsArray[index][1].wrapper);
       }
     });
   });

   //Stop propagation on focussable elements
   //Do not drag when user taps on a focussable elements
   focussable.on('touchstart', function (event) {
     event.stopPropagation();
   });

   //Stop dragging action
   dialogsArray[index][1].wrapper.on('touchend', function () {
     dragNow = false;
   });
 }
