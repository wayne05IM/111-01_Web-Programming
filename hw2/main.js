// keep origin
let originMainColor = window.getComputedStyle(
  document.getElementsByClassName("meet_mainCircle")[0]
).background;
let originMainName =
  document.getElementsByClassName("mainCenterName")[0].textContent;
let originBottomName =
  document.getElementsByClassName("main_name")[0].textContent;

let ori = document.getElementById("five");
let newElement = ori.cloneNode(true);

// remove block
let k = 0;
let deleteImageArray = document.getElementsByClassName("delete");
for (i = 0; i < deleteImageArray.length; i++) {
  let toDelete = deleteImageArray[i];
  let parentNode = toDelete.parentNode;
  toDelete.addEventListener("click", function () {
    parentNode.remove();

    // main full
    if (document.getElementsByClassName("delete").length - k == 0) {
      let changeNode = document.getElementsByClassName("meet_main")[0];
      changeNode.style.display = "flex";
      changeNode.style.width = "100%";
      changeNode.style.removeProperty("float");
      changeNode.childNodes[3].style.left = "0%";
      changeNode.childNodes[5].style.left = "3%";
      changeNode.childNodes[3].style.background = originMainColor;
      changeNode.childNodes[3].childNodes[1].innerHTML = originMainName;
      changeNode.childNodes[5].innerHTML = originBottomName;

      let meet_right = document.getElementsByClassName("meet_right")[0];
      meet_right.remove();
    }
  });
}

// swap stable block
let rightBar = document.getElementsByClassName("centerBar_right");

let leftCircle = document.getElementsByClassName("meet_mainCircle")[0];
let leftCenterName = document.getElementsByClassName("mainCenterName")[0];
let leftBottomName = document.getElementsByClassName("main_name")[0];
for (i = 0; i < rightBar.length; i++) {
  let toSwap = rightBar[i];
  toSwap.addEventListener("click", function () {
    // Swap circle color
    let temp = window.getComputedStyle(leftCircle).background;
    leftCircle.style.background = window.getComputedStyle(
      toSwap.parentNode
    ).background;
    toSwap.parentNode.style.background = temp;
    // Swap circle name
    temp = leftCenterName.textContent;
    leftCenterName.innerHTML =
      toSwap.previousSibling.previousSibling.textContent;
    toSwap.previousSibling.previousSibling.innerHTML = temp;
    // Swap bottom name
    temp = leftBottomName.textContent;
    leftBottomName.innerHTML =
      toSwap.parentNode.parentNode.lastChild.previousSibling.textContent;
    toSwap.parentNode.parentNode.lastChild.previousSibling.innerHTML = temp;
    // Unable x if name is self
    if (
      toSwap.parentNode.parentNode.lastChild.previousSibling.textContent ==
      " 你 "
    )
      toSwap.parentNode.nextSibling.nextSibling.style.display = "none";
    else toSwap.parentNode.nextSibling.nextSibling.style.display = "flex";
  });
}

// unstable main block
let mainBar = document.getElementsByClassName("centerBar")[0];
mainBar.addEventListener("click", function () {
  k = 1;
  // hide left
  let main = document.getElementsByClassName("meet_main")[0];
  main.style.display = "none";
  // ensure main is you
  if (main.childNodes[5].textContent != " 你 ") {
    rightBar = document.getElementsByClassName("centerBar_right");
    leftCircle = document.getElementsByClassName("meet_mainCircle")[0];
    leftCenterName = document.getElementsByClassName("mainCenterName")[0];
    leftBottomName = document.getElementsByClassName("main_name")[0];
    for (i = 0; i < rightBar.length; i++) {
      let toSwap = rightBar[i];
      if (
        toSwap.parentNode.parentNode.lastChild.previousSibling.textContent ==
        " 你 "
      ) {
        // Swap circle color
        let temp = window.getComputedStyle(leftCircle).background;
        leftCircle.style.background = window.getComputedStyle(
          toSwap.parentNode
        ).background;
        toSwap.parentNode.style.background = temp;
        // Swap circle name
        temp = leftCenterName.textContent;
        leftCenterName.innerHTML =
          toSwap.previousSibling.previousSibling.textContent;
        toSwap.previousSibling.previousSibling.innerHTML = temp;
        // Swap bottom name
        temp = leftBottomName.textContent;
        leftBottomName.innerHTML =
          toSwap.parentNode.parentNode.lastChild.previousSibling.textContent;
        toSwap.parentNode.parentNode.lastChild.previousSibling.innerHTML = temp;
        // Unable x if name is self
        if (
          toSwap.parentNode.parentNode.lastChild.previousSibling.textContent ==
          " 你 "
        )
          toSwap.parentNode.nextSibling.nextSibling.style.display = "none";
        else toSwap.parentNode.nextSibling.nextSibling.style.display = "flex";
      }
    }
  }
  // add right
  let appendedNode = document
    .getElementsByClassName("container")[0]
    .appendChild(newElement);
  let newChild = appendedNode.childNodes;
  newChild[3].style.background = window.getComputedStyle(leftCircle).background;
  newChild[3].firstChild.nextSibling.innerHTML = leftCenterName.textContent;
  newChild[newChild.length - 2].innerHTML = leftBottomName.textContent;
  newChild[newChild.length - 4].style.display = "none";
  // fix right
  let right = document.getElementsByClassName("meet_right")[0];
  right.style.width = "100%";
  let smallBox = document.querySelectorAll(".meet_rightBox");
  smallBox.forEach((box) => {
    box.style.width = "32%";
    box.style.height = "48%";
    box.style.margin = "0.5%";
  });
  let rightCircle = document.querySelectorAll(".meet_rightCircle");
  rightCircle.forEach((circle) => {
    circle.style.width = "6vw";
    circle.style.height = "6vw";
    circle.style.right = "5%";
  });
  let del = document.querySelectorAll(".delete");
  del.forEach((x) => {
    x.style.right = "29vw";
    x.style.top = "1vw";
  });
  // return previous
  rightBar = document.getElementsByClassName("centerBar_right");
  leftCircle = document.getElementsByClassName("meet_mainCircle")[0];
  leftCenterName = document.getElementsByClassName("mainCenterName")[0];
  leftBottomName = document.getElementsByClassName("main_name")[0];
  for (i = 0; i < rightBar.length; i++) {
    let toSwap = rightBar[i];
    toSwap.addEventListener("click", function () {
      // fix right
      let right = document.getElementsByClassName("meet_right")[0];
      right.style.width = "35%";
      let smallBox = document.querySelectorAll(".meet_rightBox");
      smallBox.forEach((box) => {
        box.style.width = "40%";
        box.style.height = "25%";
        box.style.margin = "1%";
      });
      let rightCircle = document.querySelectorAll(".meet_rightCircle");
      rightCircle.forEach((circle) => {
        circle.style.width = "5vw";
        circle.style.height = "5vw";
        circle.style.right = "10%";
      });
      let del = document.querySelectorAll(".delete");
      del.forEach((x) => {
        x.style.right = "11.5vw";
        x.style.top = "0.5vw";
      });

      appendedNode.remove();
      main.style.display = "flex";
      k = 0;
    });
  }
});
