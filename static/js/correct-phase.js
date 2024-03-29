let lArrow = document.querySelector(".l-arrow");
let rArrow = document.querySelector(".r-arrow");
let catalogImgs = document.getElementsByClassName("catalog-img");
let openDialog = document.getElementsByClassName("phase-correct-btn")[0];
var exIndex = 0;
var rimgPos = 1;
var limgPos = 1;
var a_coef = [];
var a_preview = [];
var a_layers = [];

const correctPhase = document.getElementsByClassName("correct-phase")[0];
openDialog.addEventListener("click", (e) => {
  e.preventDefault();
  cpPage.style.display = "flex";
  console.log(correctPhase.classList);
  correctPhase.classList.remove("preview-mode");
  change_filter();
});

var selected_a;
updateList();
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("arrow")) {
    for (i = 0; i < catalogImgs.length; i++) {
      if (catalogImgs[i].classList.contains("selected-catalog-img")) {
        exIndex = catalogImgs[i].classList[1][2];
      }
      catalogImgs[i].classList.remove("selected-catalog-img");
    }
    if (e.target == lArrow) {
      catalogImgs[exIndex - 1].classList.add("selected-catalog-img");
      console.log(`a = ${catalogImgs[exIndex - 1].classList[2]}`);

      document.getElementById("a_input").value =
        catalogImgs[exIndex - 1].classList[2];
      preview_a(catalogImgs[exIndex - 1].classList[2]);

      scrollImgs(105);
    } else if (e.target == rArrow) {
      limgPos = 1;
      catalogImgs[parseInt(exIndex) + 1].classList.add("selected-catalog-img");
      console.log(`a = ${catalogImgs[parseInt(exIndex) + 1].classList[2]}`);

      document.getElementById("a_input").value =
        catalogImgs[parseInt(exIndex) + 1].classList[2];
      preview_a(catalogImgs[parseInt(exIndex) + 1].classList[2]);

      scrollImgs(-105);
    }
  }
});

function scrollImgs(e) {
  var style = window.getComputedStyle(document.querySelector(".catalog-img"));
  var matrix = new WebKitCSSMatrix(style.transform);
  console.log("translateX: ", matrix.m41);
  for (i = 0; i < catalogImgs.length; i++) {
    catalogImgs[
      i
    ].style.transform = `translateX(calc(${e}% + ${matrix.m41}px))`;
  }
}

function updateList() {
  var container = document.getElementById("filters");
  container.innerHTML = "";
  for (var i = 0; i < a_layers.length; i++) {
    if (a_coef.indexOf(a_layers[i]) > -1)
      container.innerHTML += `<div class="filter-dialog" id="${i}" ><div class="f-icon" id="f${i}"><i class="fa-solid fa-eye"></i></div><div class="vr"></div><div class="f-title" id=text${i}> a= ${a_layers[i]}</div></div>`;
    else
      container.innerHTML += `<div class="filter-dialog" id="${i}" ><div class="f-icon" id="f${i}"><i class="fa-solid fa-eye hide-svg"></i></div><div class="vr"></div><div class="f-title" id=text${i}> a= ${a_layers[i]}</div></div>`;
  }
}

let filterDialogs = document.getElementsByClassName("filter-dialog");
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("filter-dialog")) {
    for (i = 0; i < filterDialogs.length; i++) {
      filterDialogs[i].classList.remove("selected-filter");
    }
    e.target.classList.add("selected-filter");
  }
  if (e.target.classList.contains("f-icon")) {
    selected_a = e.target.id[1];

    if (
      e.target.querySelector("svg").classList.value === "svg-inline--fa fa-eye"
    ) {
      disable_filter();
    } else {
      enable_filter();
    }
    e.target.querySelector("svg").classList.toggle("hide-svg");
  }
});

var form_config = { button: null };
$("#add_a").click(function () {
  form_config.button = "add_a";
});
$("#preview_a").click(function () {
  form_config.button = "preview_a";
});
$("#a_form").submit(function (e) {
  e.preventDefault();
  if (form_config.button === "add_a") add_a();
});

let aValueField = document.getElementById("a_input");
aValueField.addEventListener("input", () => {
  let a_input = document.getElementById("a_input").value;

  const validation = new RegExp(
    "[+-]?((d+.d*|d*.d+|d+)[+-])?((d+.d*|d*.d+|d+)j|j(d+.d*|d*.d+|d+)|j)|(d+.d*|d*.d+|d+)?e^(([+-]?|[+-]?()((d+.d*|d*.d+|d+)j|j(d+.d*|d*.d+|d+)|j)))|[+-]?([0-9]*[.])?[0-9]+",
    "gm"
  );

  if (
    validation.test(a_input) &&
    a_input[a_input.length - 1] != "-" &&
    a_input[a_input.length - 1] != "+"
  ) {
    preview_a(a_input);
  }
});

function preview_a(a_input) {
  a_preview = [a_input];
  document.getElementById(
    "all-pass-title"
  ).innerHTML = `All Pass Filter for a=${a_input}`;
  preview_filter();
}
function add_a() {
  let a_input = document.getElementById("a_input").value;
  let index = a_layers.indexOf(a_input);
  if (index > -1) {
    document.getElementById("a_input").value = "";

    return;
  }
  a_coef.push(a_input);
  a_layers.push(a_input);
  updateList();
  change_filter();
  document.getElementById("a_input").value = "";
}

const a_group = document.getElementById("filters");
const filtersGroup = (e) => {
  console.log(e.target.id);
  if (e.target.id !== "filters" && e.target.id.substring(0, 1) !== "f") {
    if (e.target.id.substring(0, 4) === "text") {
      selected_a = e.target.id.substring(4, e.target.id.length);
      selected_a = parseInt(selected_a);
    } else selected_a = e.target.id;
    preview_a(a_layers[selected_a]);
  }
};

a_group.addEventListener("click", filtersGroup);

function delete_filter() {
  let index = a_coef.indexOf(a_layers[selected_a]);
  if (index > -1) a_coef.splice(index, 1);
  a_layers.splice(selected_a, 1);
  updateList();
  change_filter();
}

const delete_btn = document.getElementById("delete-filter");
delete_btn.addEventListener("click", delete_filter);

function disable_filter() {
  let index = a_coef.indexOf(a_layers[selected_a]);
  if (index > -1) a_coef.splice(index, 1);
  change_filter();
}

function enable_filter() {
  let new_a = a_layers[selected_a];
  a_coef.push(new_a);
  change_filter();
}

////////////////// close tab //////////////////
let cpPage = document.querySelector(".correct-phase");
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("close-tab")) {
    cpPage.style.display = "none";
  }
});
