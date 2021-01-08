const nav = document.querySelector('nav');
const navList = document.getElementById('nav-list');
const visualLanguageButton = document.getElementById('visual-language');

const showMoreListItem = document.createElement("li");

showMoreListItem.classList.add("list-item");
showMoreListItem.classList.add("show-more");
const showMoreButton = document.createElement("button");
showMoreButton.innerText = "Show More";
showMoreButton.classList.add('show-more-button');
const notFitObjectsContainer = document.createElement("ul");
notFitObjectsContainer.classList.add("not-fit-objects-container");

showMoreListItem.appendChild(notFitObjectsContainer);
showMoreListItem.appendChild(showMoreButton);
let isShowMorePanelOpen = false;


interface NavbarComponent{
    componentName: string,
    children: string[],
    isFocused: boolean
}

const componentsArray = [
    {
        componentName: 'Component',
        children: ['Action', 'Another action', 'something else here'],
        isFocused: false,
    },
    {
        componentName: 'Component 1',
        children: [],
        isFocused: false,
    },
    {
        componentName: 'Component 2',
        children: [],
        isFocused: false,
    },
    {
        componentName: 'Component 3',
        children: ['Action', 'Another action', 'something else here'],
        isFocused: false,
    },
]

function addComponentToList(component: NavbarComponent){
    const listItem = document.createElement("li");
    const notFitObject = document.createElement("li");
    notFitObject.style.zIndex = "24";
    const listItemContent = document.createElement("div");
    const notFitListItemContent = document.createElement("div");
    notFitListItemContent.style.zIndex = "20";
    const componentWithChildren = document.createElement("div");
    const notFitComponentWithChildren = document.createElement("div");
    const componentName = document.createElement("p");
    const notFitComponentName = document.createElement("p");

    componentName.classList.add("paragraph-item");
    notFitComponentName.classList.add("paragraph-item");



    notFitObject.classList.add("list-item");
    notFitObject.classList.add("not-fit-component");
    notFitObject.style.height = "70px";

    listItem.classList.add("list-item"); 
    listItem.classList.add("navbar-component");
    listItem.classList.add("fit-component");

    if(component.children.length>0){
        componentWithChildren.classList.add("children-container");
        notFitComponentWithChildren.classList.add("children-container");
        listItem.style.borderBottom = "3px solid blue";
        notFitObject.style.borderBottom = "3px solid blue";
        for(let i=0; i<component.children.length; i++){
            const childParagraph = document.createElement("p");
            const notFitChildParagraph = document.createElement("p");
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

    componentName.addEventListener('click', ()=>{
        component.isFocused = !component.isFocused;
        if(component.isFocused){
            componentWithChildren.style.transform = "translateY(104%)";
        }else{
            componentWithChildren.style.transform = "translateY(0%)";
        }
    })
    notFitListItemContent.addEventListener('click', ()=>{
        component.isFocused = !component.isFocused;
        if(component.isFocused){
            notFitComponentWithChildren.style.transform = "translateY(104%) scale(1)";
            // notFitComponentWithChildren.style.transform = "scale(1)";
            notFitObject.style.marginBottom = notFitComponentWithChildren.clientHeight+"px";
        }else{
            notFitComponentWithChildren.style.transform = "translateY(0%) scale(0)";
            // notFitComponentWithChildren.style.transform = "scale(0)";
            // notFitComponentWithChildren.style.scale = ""
            // notFitListItemContent.style.marginBottom = "50px";
            notFitObject.style.marginBottom = "0px";
        }
    })
}

for(let i=0; i<componentsArray.length; i++){
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
const components = document.querySelectorAll<HTMLElement>('.navbar-component');
const notFitComponenst = document.querySelectorAll<HTMLElement>('.not-fit-component');
const singleComponentWidth = 200;

window.addEventListener('resize', ()=>handleWindowResize());
showMoreButton.addEventListener('click', ()=>{
    isShowMorePanelOpen = !isShowMorePanelOpen;
    console.log(isShowMorePanelOpen);
    if(isShowMorePanelOpen){
        notFitObjectsContainer.style.transform = "translateY(100%)";
    }else{
        notFitObjectsContainer.style.transform = "translateY(0%)";
    }
})

function handleWindowResize(){
    if(isAllComponentsFitInNavbar()){
        showMoreListItem.style.display = "none";
    }else{
        showMoreListItem.style.display = "inline-flex";
    }
    displayAvailableComponents();
}

function getAllComponentsWidth(): number{
    let allComponentsWidth: number = 0;
    for(let i=0; i<components.length; i++){
        allComponentsWidth += components[i].clientWidth;
    }
    return allComponentsWidth;
}

function isAllComponentsFitInNavbar(): boolean{
    return visualLanguageButton.clientWidth + componentsArray.length * singleComponentWidth < nav.clientWidth;
}

function getComponentsFitInNavbarCount(): number{
    let availableWidth: number = nav.clientWidth - visualLanguageButton.clientWidth - showMoreButton.clientWidth;
    let availableComponents: number = Math.floor(availableWidth/components[0].clientWidth);
    if(availableComponents<=0){availableComponents = 0}
    return availableComponents;
}

function displayAvailableComponents(){
    for(let i=0; i<components.length; i++){
        if(nav.clientWidth < visualLanguageButton.clientWidth + showMoreButton.clientWidth + singleComponentWidth){
            components[i].style.display = "none";
            notFitComponenst[i].style.display = "block";
        }else{
            if(i<getComponentsFitInNavbarCount()){
                components[i].style.display = "inline-flex";
                notFitComponenst[i].style.display = "none";
            }else{
                components[i].style.display = "none";
                notFitComponenst[i].style.display = "block";
            }
        }

    }
}

handleWindowResize();
