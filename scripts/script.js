import { projects } from './projects.js';

function shuffle(arr) {
  for (let i = 0; i < arr.length; i++) {
    const pos = Math.round(Math.random() * (arr.length - 1));
    [arr[i], arr[pos]] = [arr[pos], arr[i]];
  }
  return arr;
}

document.body.onload = () => {
  particlesJS.load('particles-js', 'scripts/particles.json');
  const shuffled = shuffle(projects);
  const templateProjectElem = document.getElementById('template__project');
  const projectList = document.getElementById('projects');
  shuffled.forEach(i => {
    const projectElem = templateProjectElem.content.cloneNode(true).querySelector('a');
    projectElem.classList.add(i.type);
    projectElem.setAttribute('href', i.link);
    projectElem.innerText = i.name;
    projectList.appendChild(projectElem);
  })
  shuffled.forEach(i => {
    const projectElem = templateProjectElem.content.cloneNode(true).querySelector('a');
    projectElem.classList.add(i.type);
    projectElem.setAttribute('href', i.link);
    projectElem.innerText = i.name;
    projectList.appendChild(projectElem);
  })
  shuffled.forEach(i => {
    const projectElem = templateProjectElem.content.cloneNode(true).querySelector('a');
    projectElem.classList.add(i.type);
    projectElem.setAttribute('href', i.link);
    projectElem.innerText = i.name;
    projectList.appendChild(projectElem);
  })
}