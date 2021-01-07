const nav = document.querySelector('nav');
const navList = document.getElementById('nav-list');
const visualLanguageButton = document.getElementById('visual-language');

interface NavbarComponent{
    componentName: string,
    children: string[]
}

const componentsArray = [
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
]

function addComponentToList(component: NavbarComponent){
    const listItem = document.createElement("li");
    listItem.classList.add("list-item"); 
    listItem.classList.add("navbar-component");
    listItem.innerText = component.componentName;
    navList.appendChild(listItem)
}

for(let i=0; i<componentsArray.length; i++){
    addComponentToList(componentsArray[i]);
}

const showMoreButton = document.createElement("li");
showMoreButton.innerText = "Show More";
showMoreButton.classList.add("list-item")
showMoreButton.classList.add("show-more")
navList.appendChild(showMoreButton);
const components = document.querySelectorAll<HTMLElement>('.navbar-component');
const singleComponentWidth = 200;

window.addEventListener('resize', ()=>handleWindowResize())

function handleWindowResize(){
    if(isAllComponentsFitInNavbar()){
        showMoreButton.style.display = "none";
    }else{
        showMoreButton.style.display = "inline-flex";
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
        }else{
            if(i<getComponentsFitInNavbarCount()){
                components[i].style.display = "inline-flex";
            }else{
                components[i].style.display = "none";
            }
        }

    }
}

handleWindowResize();
