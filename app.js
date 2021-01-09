var nav = document.querySelector('nav');
var navWrapper = document.querySelector('.nav-wrapper');
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
    {
        componentName: 'Component 4',
        children: [],
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
            notFitObject.style.marginBottom = notFitComponentWithChildren.clientHeight + "px";
        }
        else {
            notFitComponentWithChildren.style.transform = "translateY(0%) scale(0)";
            notFitObject.style.marginBottom = "0px";
        }
    });
}
for (var i = 0; i < componentsArray.length; i++) {
    addComponentToList(componentsArray[i]);
}
navList.appendChild(showMoreListItem);
var components = document.querySelectorAll('.navbar-component');
var notFitComponenst = document.querySelectorAll('.not-fit-component');
var singleComponentWidth = 200;
window.addEventListener('resize', function () { return handleWindowResize(); });
function handleOpenPanel() {
    if (isShowMorePanelOpen) {
        if (nav.clientWidth < 600) {
            notFitObjectsContainer.style.transform = "translateX(100%)";
            navWrapper.style.width = "100vw";
            navWrapper.style.height = "100vh";
            navWrapper.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
        }
        if (nav.clientWidth >= 600) {
            notFitObjectsContainer.style.transform = "translateY(100%)";
            navWrapper.style.width = null;
            navWrapper.style.height = null;
        }
    }
    else {
        if (nav.clientWidth < 600) {
            notFitObjectsContainer.style.transform = "translateX(0%)";
            navWrapper.style.width = null;
            navWrapper.style.height = null;
            navWrapper.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
        }
        if (nav.clientWidth >= 600) {
            notFitObjectsContainer.style.transform = "translateY(0%)";
        }
    }
}
showMoreButton.addEventListener('click', function () {
    isShowMorePanelOpen = !isShowMorePanelOpen;
    console.log(isShowMorePanelOpen);
    handleOpenPanel();
});
function handleWindowResize() {
    handleOpenPanel();
    if (nav.clientWidth < 600) {
        notFitObjectsContainer.style.position = "fixed";
        notFitObjectsContainer.style.left = "-200px";
        notFitObjectsContainer.style.top = "70px";
    }
    if (nav.clientWidth >= 600) {
        notFitObjectsContainer.style.position = "absolute";
        notFitObjectsContainer.style.left = "0px";
        notFitObjectsContainer.style.bottom = "0px";
        notFitObjectsContainer.style.top = null;
    }
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
