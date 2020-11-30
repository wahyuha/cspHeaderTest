const loaded = new Map();
export const lazy = (node, data) => {
  if (data.type !== "backdrop") {
    node.setAttribute("style", "filter: blur(5px); -webkit-filter: blur(5px); ");
  }
  if (loaded.has(data.src)) {
    node.setAttribute("src", data.src);
    if (data.type === "backdrop") {
      node.nextSibling.nextSibling.classList.remove("area");
    } else {
      node.setAttribute("style", "filter: none; -webkit-filter: none; transform: none; ");
    }
  } else {
    setTimeout(() => {
      const img = new Image();
      img.src = data.src;
      node.setAttribute("src", data.src);
      if (data.type === "backdrop") {
        node.nextSibling.nextSibling.classList.remove("area");
      } else {
        node.setAttribute("style", "filter: none; -webkit-filter: none; transform: none; ");
      }
    }, 1000);
  }

  return {
    destroy() { },
  };
};
