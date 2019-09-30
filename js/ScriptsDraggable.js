// JavaScript source code

function doDrag(containerId, itemId) {
  var dragItem = document.querySelector(itemId);
  var container = document.querySelector(containerId);

  var active = false;
  var currentX;
  var currentY;
  var initialX;
  var initialY;
  var xOffset = 0;
  var yOffset = 0;

  container.addEventListener("touchstart", dragStart, false);
  container.addEventListener("touchend", dragEnd, false);
  container.addEventListener("touchmove", drag, false);

  container.addEventListener("mousedown", dragStart, false);
  container.addEventListener("mouseup", dragEnd, false);
  container.addEventListener("mousemove", drag, false);

  function unify(e) {
    return e.changedTouches ? e.changedTouches[0] : e;
  }

  function dragStart(e) {
    initialX = unify(e).clientX - xOffset;
    initialY = unify(e).clientY - yOffset;

    if (e.target === dragItem) {
      active = true;
    }
  }

  function dragEnd(e) {
    initialX = currentX;
    initialY = currentY;

    active = false;
  }

  function drag(e) {
    if (active) {

      e.preventDefault();

      currentX = unify(e).clientX - initialX;
      currentY = unify(e).clientY - initialY;
      xOffset = currentX;
      yOffset = currentY;

      setTranslate(currentX, currentY, dragItem);
    }
  }

  function setTranslate(xPos, yPos, el) {
    el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
  }
}
