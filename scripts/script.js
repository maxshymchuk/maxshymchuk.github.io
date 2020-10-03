import { CONSTS, REPO_TYPE } from './models.js';
import { shuffle, getRepos } from "./utils.js";

document.body.onload = async () => {
  const initialList = await getRepos();
  const repos = initialList
    .filter(repo => repo.name !== CONSTS.SELF)
    .map(repo => {
      return {
        name: repo.name,
        site: repo.homepage,
        page: repo.html_url,
        type: repo.homepage ? REPO_TYPE.WEBSITE : REPO_TYPE.REPO
      }
    });
  const shuffled = shuffle(repos);
  const templateProjectElem = document.getElementById('template__project');
  const projectList = document.getElementById('projects');
  shuffled.forEach(i => {
    const projectElem = templateProjectElem.content.cloneNode(true).querySelector('a');
    projectElem.classList.add(i.type);
    projectElem.setAttribute('href', i.type === REPO_TYPE.REPO ? i.page : i.site);
    projectElem.innerText = i.name;
    projectList.appendChild(projectElem);
  })
}