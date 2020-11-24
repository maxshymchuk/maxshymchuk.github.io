import CONSTS from './consts.js';
import {shuffle, getRepos, getRepoProperty, Preloader} from "./utils.js";
import { Slider } from "./Slider.js";

document.body.onload = async () => {
  Preloader.show();

  const initialList = await getRepos();

  if (!initialList) return;

  const repos = initialList.filter(repo => repo.name !== CONSTS.SELF);

  const slides = await Promise.all(
    repos.map(async (repo) => {
      const languages = await getRepoProperty(repo.languages_url);
      const contributors = await getRepoProperty(repo.contributors_url);
      const contributorsArray = contributors && contributors.map(contributor => {
        return {
          login: contributor.login,
          avatar: contributor.avatar_url,
          url: contributor.html_url,
          contributions: contributor.contributions
        }
      });
      return {
        name: repo.name,
        description: repo.description,
        languages: languages && Object.keys(languages),
        contributors: contributors ? contributorsArray : [],
        site: repo.homepage,
        page: repo.html_url
      }
    })
  )

  const shuffled = shuffle(slides);

  const slider = document.getElementById('slider');
  const sliderEngine = new Slider(shuffled, 'template__project', slider);

  const arrowLeft = document.getElementById('arrow__left');
  const arrowRight = document.getElementById('arrow__right');
  arrowLeft.addEventListener('click', sliderEngine.prev.bind(sliderEngine));
  arrowRight.addEventListener('click', sliderEngine.next.bind(sliderEngine));

  Preloader.hide();
}