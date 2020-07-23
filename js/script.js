'use strict';

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post-author',
  optTagsListSelector = '.tags.list',
  optCloudClassCount = 5,
  optCloudClassPrefix = 'tag-size-';

function calculateTagsParams(tags) {

  let numberTagsList = [];

  for (let key in tags) {
    // console.log('Value at key "' + key + '" in tags: ' + tags[key]);

    numberTagsList.push(parseFloat(tags[key]));
  }
  // console.log(numberTagsList);
  // console.log(tagsMinMax);

  // tags.min = Math.min(...numberTagsList);
  // tags.max = Math.max(...numberTagsList);
  const tagMin = Math.min(...numberTagsList);
  const tagMax = Math.max(...numberTagsList);
  // console.log('tags.min= ',tags.min);
  // console.log('tags.max = ',tags.max);

  let tagsMinMax = {
    min: tagMin,//tags.min,
    max: tagMax,//tags.max,
  };
  // tagsMinMax.push(tags.min);
  // tagsMinMax.push(tags.max);
  // console.log(tagsMinMax);

  return tagsMinMax;

  // const tagsMinMax1= {min: tags.min, max: tags.max}
  // console.log(tagsMinMax1);
  // // tagsMinMax[min] = tags.min;
}


function calculateTagClass(count, params) {
  // count = allTags[tag] = liczba wyświetleń danego tagu
  // params = tagsParams = obiekt z max i min
  let optCloudClassCount = 5;
  const optCloudClassPrefix = 'tag-size-';
  let outputTagSize = '';
  let countPercentage = 0.2;

  const maxOccurrences = params['max'];

  while (countPercentage < 1.01) {

    if (count <= (maxOccurrences * countPercentage)) { //Math.ceil((maxOccurrences * countPercentage))
      optCloudClassCount -= Math.ceil(maxOccurrences * (1 - countPercentage));
      outputTagSize = optCloudClassPrefix + optCloudClassCount;
      break;
    }
    countPercentage += 0.2;
  }
  // return 'tag-size-5';
  return outputTagSize;
}


function generateTags() {
  /* [NEW] create a new variable allTags with an empty object */
  let allTags = {};
  // console.log('allTags',allTags);


  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);

  /* START LOOP: for every article: */
  for (let article of articles) {

    /* find tags wrapper */
    const tagsWrapper = article.querySelector(optArticleTagsSelector);
    tagsWrapper.innerHTML = '';

    /* make html variable with empty string */
    let tagsHtml = '';

    /* get tags from data-tags attribute */
    const tagsContent = article.getAttribute('data-tags');
    // console.log('tagsContent',tagsContent);

    /* split tags into array */
    const splitTags = tagsContent.split(' ');
    // console.log('splitTags',splitTags);
    /* START LOOP: for each tag */
    for (let tag of splitTags) {
      // console.log('tag w loop', tag);

      /* generate a tag html */
      const tagLinkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';

      /* add generated code to html variable */
      tagsHtml = tagsHtml + tagLinkHTML;
      // console.log('All tags 1', allTags);
      /* [NEW] check if this link is NOT already in allTags */
      if (!allTags[tag]) {
        /* [NEW] add tag to allTags object */
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
      // console.log('All tags 2', allTags);
      // console.log('occurence:', allTags[tag]);
      // console.log('Max occurence', Math.max(allTags[tag]));

      /* END LOOP: for each tag */
    }
    /* insert HTML of all the links into the tags wrapper */
    tagsWrapper.innerHTML = tagsHtml;
    // console.log('tagsHtml',tagsHtml);
    // console.log('allTags',allTags);
    /* END LOOP: for every article: */
  }
  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector('.tags');

  /* [NEW] create variable for all links HTML code */
  const tagsParams = calculateTagsParams(allTags);
  // console.log('tagsParams:', tagsParams);

  let allTagsHTML = '';

  /* [NEW] START LOOP: for each tag in allTags: */
  for (let tag in allTags) {
    // console.log(tag);
    /* [NEW] generate code of a link and add it to allTagsHTML */

    const tagLinkRight = '<li><a href="#" class="' + calculateTagClass(allTags[tag], tagsParams) + '">' + tag + '</a></li>';

    allTagsHTML = allTagsHTML + tagLinkRight;

    /* [NEW] END LOOP: for each tag in allTags: */
  }
  /*[NEW] add HTML from allTagsHTML to tagList */
  tagList.innerHTML = allTagsHTML;
}

function generateAuthors() {
  /* [NEW] create a new variable allAuthors with an empty object */
  let allAuthors = {};
  // console.log('allAuthors',allAuthors);

  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);

  /* START LOOP: for every article: */
  for (let article of articles) {

    /* find author wrapper */
    const authorsWrapper = article.querySelector(optArticleAuthorSelector);

    /* get author from data-author attribute */
    const authorsContent = article.getAttribute('data-author');

    /* make html variable with empty string */
    let authorsHtml = '';

    /* generate author link */
    const authorLinkHTML = '<a href="#author-' + authorsContent + '">' + authorsContent + '</a>';

    /* add generated code to html variable */
    authorsHtml = authorsHtml + authorLinkHTML;
    // console.log('authorsHtml', authorsHtml);

    // /* [NEW] check if this link is NOT already in allAuthors */
    if (!allAuthors[authorsContent]) {
      /* [NEW] add author to allAuthors object */
      allAuthors[authorsContent] = 1;
    } else {
      allAuthors[authorsContent]++;
    }

    /* insert HTML of all the links into the author wrapper */
    authorsWrapper.innerHTML = authorsHtml;

    /* END LOOP: for every article: */
  }

  // /* [NEW] find list of tags in right column */
  const authorList = document.querySelector('.authors');

  // /* [NEW] create variable for all links HTML code */
  const authorsParams = calculateTagsParams(allAuthors);

  let allAuthorsHTML = '';

  // /* [NEW] START LOOP: for each author in allAuthors: */
  for (let author in allAuthors) {
    // console.log('author dddupa',author);
    /* [NEW] generate code of a link and add it to allAuthorsHTML */

    const authorLinkRight = '<li><a href="#">' + author + '</a></li>' + '\n';

    allAuthorsHTML += authorLinkRight;

    /* [NEW] END LOOP: for each tag in allTags: */
  }
  console.log('allAuthorsHTML', allAuthorsHTML);
  // /*[NEW] add HTML from allTagsHTML to tagList */
  authorList.innerHTML = allAuthorsHTML;
}

generateAuthors();

const authorClickHandler = function (event) {
  /* prevent default action for this event */
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  console.log('Author link is clicked');

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  console.log('href', href);

  /* make a new constant "author" and extract author from the "href" constant */
  const author = href.replace('#author-', '');
  console.log('author:', author);

  /* find all author links with class active */
  const activeAuthors = document.querySelectorAll('a.active[href^="#author-"]');

  /* START LOOP: for each active author link */
  for (const activeAuthor of activeAuthors) {

    /* remove class active */
    activeAuthor.classList.remove('active');

    /* END LOOP: for each active author link */
  }

  /* find all author links with "href" attribute equal to the "href" constant */
  const allAuthorLinks = document.querySelectorAll('a[href="' + href + '"]');

  /* START LOOP: for each found author link */
  for (const allAuthorLink of allAuthorLinks) {

    /* add class active */
    allAuthorLink.classList.add('active');
    /* END LOOP: for each found author link */
  }
  /* execute function "generateAuthors" with article selector as argument */

  generateTitleLinks(`[data-author="${author}"]`);
};

function addClickListenersToAuthors() {
  /* find all links to authors */
  const authorLinks = document.querySelectorAll('.post .post-author a');
  // console.log('authorLinks', authorLinks);

  /* START LOOP: for each link */
  for (let authorLink of authorLinks) {

    /* add  authorClickHandler as event listener for that link */
    authorLink.addEventListener('click', authorClickHandler);

    /* END LOOP: for each link */
  }
}

addClickListenersToAuthors();


const titleClickHandler = function (event) {
  event.preventDefault();
  const clickedElement = this;
  console.log('Article link was clicked!');

  /* [DONE]remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');

  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }
  /* [DONE] add class 'active' to the clicked link */
  console.log('clicked Element: ', clickedElement);

  clickedElement.classList.add('active');

  /* [DONE] remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.posts article.active');

  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
  }
  /* [DONE] get 'href' attribute from the clicked link */

  const getTitleHref = this.getAttribute('href');

  /* [DONE] find the correct article using the selector (value of 'href' attribute) */
  const getArticleElement = document.querySelector(getTitleHref);

  /* [DONE] add class 'active' to the correct article */
  getArticleElement.classList.add('active');
};

function generateTitleLinks(customSelector = '') {
  // console.log('Title link is generated');

  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';

  let html = '';

  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  for (let article of articles) {

    /* [DONE] get id for each article and  assign to the constant */
    const articleId = article.getAttribute('id');

    /* [DONE] find and get  the title element and assign it to the constant */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    /* [DONE] create html link and assign it to the constant */
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';

    /* [DONE] add link to the list using innerHTML */
    html = html + linkHTML;
  }
  titleList.innerHTML = html;
}

generateTitleLinks();
const links = document.querySelectorAll('.titles a');
for (let link of links) {
  link.addEventListener('click', titleClickHandler);
}
generateTags();

const tagClickHandler = function (event) {
  /* prevent default action for this event */
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  console.log('Tag link is clicked');

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');

  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');

  /* find all tag links with class active */
  const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');
  console.log(activeTags);

  /* START LOOP: for each active tag link */
  for (const activeTag of activeTags) {

    /* remove class active */
    activeTag.classList.remove('active');

    /* END LOOP: for each active tag link */
  }

  /* find all tag links with "href" attribute equal to the "href" constant */
  const allTagLinks = document.querySelectorAll('a[href="' + href + '"]');

  /* START LOOP: for each found tag link */
  for (const allTagLink of allTagLinks) {

    /* add class active */
    allTagLink.classList.add('active');
    /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  // generateTitleLinks('[data-tags~="'+ tag + '"]');
  generateTitleLinks(`[data-tags~="${tag}"]`);
};

function addClickListenersToTags() {
  /* find all links to tags */
  const tagLinks = document.querySelectorAll('.post-tags .list a');

  /* START LOOP: for each link */
  for (let tagLink of tagLinks) {

    /* add tagClickHandler as event listener for that link */
    tagLink.addEventListener('click', tagClickHandler);

    /* END LOOP: for each link */
  }
}

addClickListenersToTags();
