
const getTextContentById = (id: string) => {
  let el = document.getElementById(id);
  if (el) {
    const nodeValue = el.textContent;
    if (nodeValue) {
      return nodeValue.trim();
    }
  }  
}

const getClassesById = (id: string) => {
  let el = document.getElementById(id);
  if (el) {
    return el.classList;
  }  
}

const getStylesById = (id: string) => {
  let el = document.getElementById(id);
  if (el) {
    return el.style;
  }  
}

export {
  getTextContentById,
  getClassesById,
  getStylesById,
}
