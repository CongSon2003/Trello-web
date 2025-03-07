import {
  MouseSensor as LibMouseSensor,
  TouchSensor as LibTouchSensor,
} from "@dnd-kit/core";

// Block DnD event propagation if element has "data-no-dnd" attribute
const handler = (event) => {
  let cur = event.target;
  clearInterval(window.timer);
  while (cur) {
    if (cur.dataset && cur.dataset.noDnd) {
      return false;
    }
    cur = cur.parentElement;
  }

  return true;
};

export class MouseSensor extends LibMouseSensor {
  static activators = [{ eventName: "onMouseDown", handler }];
}

export class TouchSensor extends LibTouchSensor {
  static activators = [{ eventName: "onTouchStart", handler }];
}
