
/* SizerScriptComp.js */

function toggleView(id) {
  let image = document.getElementById(id);
  if (image === null) {
    return;
  }
  if (image.style.display === "none") {
    image.style.display = "block";
  }
  else {
    image.style.display = "none";
  }
}

function getTop(elem) {
  let yPos = 0;
  while (elem) {
    yPos += (elem.offsetTop - elem.scrollTop + elem.clientTop);
    elem = elem.offsetParent;
  }
  return yPos;
}

function getSizer(elem) {
  let children = elem.getElementsByTagName("sizer-container");
  if (children.length === 1) {
    return children[0];
  }
  return null;
}

function getSizerHeight(elem) {
  let elems = elem.childNodes;
  let ht = 0;
  for (let i = 0; i < elems.length; ++i) {
    let htStr = window.getComputedStyle(elems[i], null).getPropertyValue("height");
    let htStrTrunc = htStr.substr(0, htStr.length - 2);
    ht += parseFloat(htStrTrunc);
  }
  return ht;
}

function sizerPositions() {
  let images = document.getElementsByTagName("image-wrapper");
  let bottom = 0;
  for (let i = 0; i < images.length; ++i)
  {
    let item = images[i];
    let sizer = getSizer(item);
    let ht = getSizerHeight(sizer);
    alert(ht);
    let top = getTop(item);
    alert(top);
    let bottom = top + ht;
    alert(bottom);
  }
}

function bigger(id) {
  let pict = document.getElementById(id);
  let width = pict.style.width;                         // "100px"
  let truncWidth = width.substr(0, width.length - 2);   // "100"
  let value = Number(truncWidth);                       // 100
  value = 1.2 * value;                                  // 120
  let newWidth = value.toString();                      // "120"
  newWidth = newWidth + "px";                           // "120px"
  pict.style.width = newWidth;
}

function smaller(id) {
  let pict = document.getElementById(id);
  let width = pict.style.width;
  let truncWidth = width.substr(0, width.length - 2);
  let value = Number(truncWidth);
  value = value / 1.2;
  let newWidth = value.toString();
  newWidth = newWidth + "px";
  pict.style.width = newWidth;

  //sizerPositions();
}

var idCount = 0;

function createSizer(imageUrl, hiderText, hiderTop, size, placeholder) {

  let imageContainerId = "imageContainerId" + (++idCount).toString();
  let top = "top:" + hiderTop;

  // create plus button
  let buttonPlus = document.createElement("bigger-button");
  buttonPlus.appendChild(document.createTextNode("+"));
  buttonPlus.addEventListener("click", function () { bigger(imageContainerId); });

  // create minus button
  let buttonMinus = document.createElement("smaller-button");
  buttonMinus.appendChild(document.createTextNode("-"));
  buttonMinus.addEventListener("click", function () { smaller(imageContainerId); });

  // create hider container
  let hiderContainer = document.createElement("hider-container");
  hiderContainer.addEventListener("click", function () { toggleView(imageContainerId); });

  // create hider text
  let hiderTextElem = document.createElement("hider-text");
  let text = "<br />";
  for (i = 0; i < hiderText.length; ++i) {
    text += hiderText[i] + "<br />";
  }
  text += "<br />";
  hiderTextElem.appendChild(document.createTextNode(hiderText));
  hiderTextElem.innerHTML = text;
  hiderContainer.appendChild(hiderTextElem);

  // create sizer
  let sizer = document.createElement("sizer-container");
  if (hiderTop !== "") {
    let value = "top:" + hiderTop;
    sizer.setAttribute("style", value);
  }
 // add children to sizer
  sizer.appendChild(buttonPlus);
  sizer.appendChild(hiderContainer);
  sizer.appendChild(buttonMinus);

  // add sizer to document
  let loc = document.getElementById(placeholder);

  // create image wrapper
  let imageWrapper = document.createElement("image-wrapper");
  let imageWrapperId = "imageWrapperId" + idCount.toString();
  imageWrapper.setAttribute("id", imageWrapperId);
  let imageContainer = document.createElement("image-container");
  imageContainer.setAttribute("id", imageContainerId);
  let imgSize = "width:" + size.toString() + "px";
  imageContainer.setAttribute("style", imgSize);
  let image = document.createElement("img");
  image.setAttribute("src", imageUrl);
  image.setAttribute("width", "100%");
  imageContainer.appendChild(image);
  imageWrapper.appendChild(imageContainer);
  imageWrapper.appendChild(sizer);

  loc.appendChild(imageWrapper);
}
