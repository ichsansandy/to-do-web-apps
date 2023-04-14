const draggables = document.querySelectorAll(".draggable");
const containers = document.querySelectorAll(".container");

const to_do_section = document.querySelector(".to-do-section");
const inprogress_section = document.querySelector(".inprogress-section");
const done_section = document.querySelector(".done-section");

draggables.forEach((draggable) => {
  draggable.addEventListener("dragstart", () => {
    draggable.classList.add("dragging");
  });

  draggable.addEventListener("dragend", () => {
    draggable.classList.remove("dragging");
  });
});

containers.forEach((container) => {
  container.addEventListener("dragover", (e) => {
    e.preventDefault();
    const afterElement = getDragElement(container, e.clientY);
    console.log(afterElement);
    const draggable = document.querySelector(".dragging");
    if (afterElement == null) {
      container.appendChild(draggable);
    } else {
      container.insertBefore(draggable, afterElement);
    }
  });
});

to_do_section.addEventListener("DOMNodeInserted", (event) => {
  if (event.target.classList.contains("task")) {
    event.target.style.backgroundColor = "#002B5B";
  }
});

inprogress_section.addEventListener("DOMNodeInserted", (event) => {
  if (event.target.classList.contains("task")) {
    event.target.style.backgroundColor = "#FFBD33";
  }
});

done_section.addEventListener("DOMNodeInserted", (event) => {
  if (event.target.classList.contains("task")) {
    event.target.style.backgroundColor = "green";
  }
});

function getDragElement(container, y) {
  const draggableElement = [...container.querySelectorAll(".draggable:not(.dragging)")];

  return draggableElement.reduce(
    (closest, child) => {
      const task = child.getBoundingClientRect();
      const offset = y - task.top - task.height / 2;
      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      } else {
        return closest;
      }
    },
    { offset: Number.NEGATIVE_INFINITY }
  ).element;
}
