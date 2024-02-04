// ------------------------------------------------
// DRAGGABLE ELEMENTS
// ------------------------------------------------

export function enableDrag(elmnt: HTMLElement) {
  let pos1 = 0;
  let pos2 = 0;
  let pos3 = 0;
  let pos4 = 0;
  elmnt.onmousedown = dragMouseDown;

  function dragMouseDown(e: MouseEvent) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e: MouseEvent) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    const newTop = elmnt.offsetTop - pos2;
    const newLeft = elmnt.offsetLeft - pos1;
    if (newTop < 0) {
      elmnt.style.top = "0px";
    } else {
      elmnt.style.top = newTop + "px";
    }
    if (newLeft < 0) {
      elmnt.style.left = "0px";
    } else {
      elmnt.style.left = newLeft + "px";
    }
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

export function disableDrag(elmnt: HTMLElement) {
  elmnt.onmousedown = null;
}
