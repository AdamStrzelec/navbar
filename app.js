var nav = document.querySelector('nav');
var navList = document.getElementById('nav-list');
var visualLanguageButton = document.getElementById('visual-language');
var showMoreListItem = document.createElement("li");
showMoreListItem.classList.add("list-item");
showMoreListItem.classList.add("show-more");
var showMoreButton = document.createElement("button");
showMoreButton.innerText = "Show More";
showMoreButton.classList.add('show-more-button');
var notFitObjectsContainer = document.createElement("ul");
notFitObjectsContainer.classList.add("not-fit-objects-container");
showMoreListItem.appendChild(notFitObjectsContainer);
showMoreListItem.appendChild(showMoreButton);
var isShowMorePanelOpen = false;
var componentsArray = [
    {
        componentName: 'Component',
        children: ['Action', 'Another action', 'something else here'],
        isFocused: false
    },
    {
        componentName: 'Component 1',
        children: [],
        isFocused: false
    },
    {
        componentName: 'Component 2',
        children: [],
        isFocused: false
    },
    {
        componentName: 'Component 3',
        children: ['Action', 'Another action', 'something else here'],
        isFocused: false
    },
];
function addComponentToList(component) {
    var listItem = document.createElement("li");
    var notFitObject = document.createElement("li");
    notFitObject.style.zIndex = "24";
    var listItemContent = document.createElement("div");
    var notFitListItemContent = document.createElement("div");
    notFitListItemContent.style.zIndex = "20";
    var componentWithChildren = document.createElement("div");
    var notFitComponentWithChildren = document.createElement("div");
    var componentName = document.createElement("p");
    var notFitComponentName = document.createElement("p");
    componentName.classList.add("paragraph-item");
    notFitComponentName.classList.add("paragraph-item");
    notFitObject.classList.add("list-item");
    notFitObject.classList.add("not-fit-component");
    notFitObject.style.height = "70px";
    listItem.classList.add("list-item");
    listItem.classList.add("navbar-component");
    listItem.classList.add("fit-component");
    if (component.children.length > 0) {
        componentWithChildren.classList.add("children-container");
        notFitComponentWithChildren.classList.add("children-container");
        listItem.style.borderBottom = "3px solid blue";
        notFitObject.style.borderBottom = "3px solid blue";
        for (var i = 0; i < component.children.length; i++) {
            var childParagraph = document.createElement("p");
            var notFitChildParagraph = document.createElement("p");
            childParagraph.innerText = component.children[i];
            notFitChildParagraph.innerText = component.children[i];
            componentWithChildren.appendChild(childParagraph);
            notFitComponentWithChildren.appendChild(notFitChildParagraph);
        }
    }
    listItemContent.classList.add('list-item-content');
    componentName.innerText = component.componentName;
    notFitListItemContent.classList.add('list-item-content');
    notFitListItemContent.innerText = component.componentName;
    notFitComponentName.innerText = component.componentName;
    listItem.appendChild(listItemContent);
    listItemContent.appendChild(componentWithChildren);
    listItemContent.appendChild(componentName);
    navList.appendChild(listItem);
    notFitObject.appendChild(notFitListItemContent);
    notFitObjectsContainer.appendChild(notFitObject);
    // notFitObjectsContainer.appendChild(notFitComponentName);
    notFitObject.appendChild(notFitComponentWithChildren);
    componentName.addEventListener('click', function () {
        component.isFocused = !component.isFocused;
        if (component.isFocused) {
            componentWithChildren.style.transform = "translateY(104%)";
        }
        else {
            componentWithChildren.style.transform = "translateY(0%)";
        }
    });
    notFitListItemContent.addEventListener('click', function () {
        component.isFocused = !component.isFocused;
        if (component.isFocused) {
            notFitComponentWithChildren.style.transform = "translateY(104%) scale(1)";
            // notFitComponentWithChildren.style.transform = "scale(1)";
            notFitObject.style.marginBottom = notFitComponentWithChildren.clientHeight + "px";
        }
        else {
            notFitComponentWithChildren.style.transform = "translateY(0%) scale(0)";
            // notFitComponentWithChildren.style.transform = "scale(0)";
            // notFitComponentWithChildren.style.scale = ""
            // notFitListItemContent.style.marginBottom = "50px";
            notFitObject.style.marginBottom = "0px";
        }
    });
}
for (var i = 0; i < componentsArray.length; i++) {
    addComponentToList(componentsArray[i]);
}
// const showMoreListItem = document.createElement("li");
// showMoreListItem.classList.add("list-item");
// showMoreListItem.classList.add("show-more");
// const showMoreButton = document.createElement("button");
// showMoreButton.innerText = "Show More";
// showMoreButton.classList.add('show-more-button');
// const notFitObjectsContainer = document.createElement("div");
// notFitObjectsContainer.classList.add("not-fit-objects-container");
// showMoreListItem.appendChild(notFitObjectsContainer);
// showMoreListItem.appendChild(showMoreButton);
// let isShowMorePanelOpen = false;
navList.appendChild(showMoreListItem);
var components = document.querySelectorAll('.navbar-component');
var notFitComponenst = document.querySelectorAll('.not-fit-component');
var singleComponentWidth = 200;
window.addEventListener('resize', function () { return handleWindowResize(); });
showMoreButton.addEventListener('click', function () {
    isShowMorePanelOpen = !isShowMorePanelOpen;
    console.log(isShowMorePanelOpen);
    if (isShowMorePanelOpen) {
        notFitObjectsContainer.style.transform = "translateY(100%)";
    }
    else {
        notFitObjectsContainer.style.transform = "translateY(0%)";
    }
});
function handleWindowResize() {
    if (isAllComponentsFitInNavbar()) {
        showMoreListItem.style.display = "none";
    }
    else {
        showMoreListItem.style.display = "inline-flex";
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
            notFitComponenst[i].style.display = "block";
        }
        else {
            if (i < getComponentsFitInNavbarCount()) {
                components[i].style.display = "inline-flex";
                notFitComponenst[i].style.display = "none";
            }
            else {
                components[i].style.display = "none";
                notFitComponenst[i].style.display = "block";
            }
        }
    }
}
handleWindowResize();
