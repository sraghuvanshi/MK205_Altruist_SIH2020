const lensSize = 300; //px

function magnify(id, zoom, flag) {
  if (flag == 0) {
    const el = document.getElementById(id);
    const copy = el.cloneNode(true);
    const lens = document.createElement("div");

    lens.setAttribute("id", "lens");
    lens.style.width = lensSize + "px";
    lens.style.height = lensSize + "px";

    el.appendChild(lens);
    el.getBoundingClientRect();
    copy.style.zoom = zoom;
    lens.appendChild(copy);

    copy.style.width = el.offsetWidth * zoom + "px";
    copy.style.heigth = el.offsetHeight * zoom + "px";
    copy.style.position = "absolute";

    el.addEventListener("mousemove", ev => {
      ev.preventDefault();
      ev.stopPropagation();
      const pos = getCursorPos(ev);
      lens.style.left = -(lensSize / 2) + pos.x + "px";
      lens.style.top = -(lensSize / 2) + pos.y + "px";
      copy.style.left =
        -(pos.x - el.offsetLeft) + (lensSize / zoom) * 0.5 + "px";
      copy.style.top = -(pos.y - el.offsetTop) + (lensSize / zoom) * 0.5 + "px";
    });
  }
}

function getCursorPos(e) {
  var x = window.Event
    ? e.pageX
    : event.clientX +
      (document.documentElement.scrollLeft
        ? document.documentElement.scrollLeft
        : document.body.scrollLeft);
  var y = window.Event
    ? e.pageY
    : event.clientY +
      (document.documentElement.scrollTop
        ? document.documentElement.scrollTop
        : document.body.scrollTop);
  return { x: x, y: y };
}

document
  .getElementById("zoom")
  .addEventListener("mouseover", magnify("zoom", 2, 0));
