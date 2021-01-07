var nav = document.querySelector('nav');
var navList = document.getElementById('nav-list');
var visualLanguageButton = document.getElementById('visual-language');
var componentsArray = [
    {
        componentName: 'Component',
        children: ['Action', 'Another action', 'something else here']
    },
    {
        componentName: 'Component 1',
        children: []
    },
    {
        componentName: 'Component 2',
        children: []
    },
    {
        componentName: 'Component 3',
        children: ['Action', 'Another action', 'something else here']
    },
];
function addComponentToList(component) {
    var listItem = document.createElement("li");
    listItem.classList.add("list-item");
    listItem.classList.add("navbar-component");
    listItem.innerText = component.componentName;
    navList.appendChild(listItem);
}
for (var i = 0; i < componentsArray.length; i++) {
    addComponentToList(componentsArray[i]);
}
var showMoreButton = document.createElement("li");
showMoreButton.innerText = "Show More";
showMoreButton.classList.add("list-item");
showMoreButton.classList.add("show-more");
navList.appendChild(showMoreButton);
var components = document.querySelectorAll('.navbar-component');
var singleComponentWidth = 200;
window.addEventListener('resize', function () { return handleWindowResize(); });
function handleWindowResize() {
    if (isAllComponentsFitInNavbar()) {
        showMoreButton.style.display = "none";
    }
    else {
        showMoreButton.style.display = "inline-flex";
    }
    displayAvailableComponents();
}
function getAllComponentsWidth() {
    var allComponentsWidth = 0;
    for (var i = 0; i < components.length; i++) {
        allComponentsWidth += components[i].clientWidth;
    }
    return allComponentsWidth;
}
function isAllComponentsFitInNavbar() {
    return visualLanguageButton.clientWidth + componentsArray.length * singleComponentWidth < nav.clientWidth;
}
function getComponentsFitInNavbarCount() {
    var availableWidth = nav.clientWidth - visualLanguageButton.clientWidth - showMoreButton.clientWidth;
    var availableComponents = Math.floor(availableWidth / components[0].clientWidth);
    if (availableComponents <= 0) {
        availableComponents = 0;
    }
    return availableComponents;
}
function displayAvailableComponents() {
    for (var i = 0; i < components.length; i++) {
        if (nav.clientWidth < visualLanguageButton.clientWidth + showMoreButton.clientWidth + singleComponentWidth) {
            components[i].style.display = "none";
        }
        else {
            if (i < getComponentsFitInNavbarCount()) {
                components[i].style.display = "inline-flex";
            }
            else {
                components[i].style.display = "none";
            }
        }
    }
}
handleWindowResize();
