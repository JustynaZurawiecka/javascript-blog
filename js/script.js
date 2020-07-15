{
  const titleClickHandler = function(event){
    event.preventDefault();
    const clickedElement = this;
    console.log('Link was clicked!');
  
    /* [DONE]remove class 'active' from all article links  */
    const activeLinks = document.querySelectorAll('.titles a.active');

    for(let activeLink of activeLinks){
      console.log('active link', activeLink);
      activeLink.classList.remove('active');
    }
    /* [DONE] add class 'active' to the clicked link */
    console.log('clicked Element: ', clickedElement);

    clickedElement.classList.add('active');

    /* [DONE] remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll('.posts article.active');

    for(let activeArticle of activeArticles){
      activeArticle.classList.remove('active');
    }
    /* [DONE] get 'href' attribute from the clicked link */

    const getTitleHref = this.getAttribute('href');
    console.log('Href: ', getTitleHref);
  
    /* [DONE] find the correct article using the selector (value of 'href' attribute) */
    const getArticleElement = document.querySelector(getTitleHref);
    console.log(getArticleElement);
  
    /* [DONE] add class 'active' to the correct article */
    getArticleElement.classList.add('active');
  };

  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles';

  // eslint-disable-next-line no-inner-declarations
  function generateTitleLinks(){
    console.log('Title link is generated');

    const titleList= document.querySelector(optTitleListSelector);
    titleList.innerHTML= '';

    let html = '';
    
    const articles = document.querySelectorAll(optArticleSelector);
    for(let article of articles){
        
      /* [DONE] get id for each article and  assign to the constant */
      const articleId = article.getAttribute('id');
      console.log(articleId);

      /* [DONE] find and get  the title element and assign it to the constant */      

      const articleTitle = article.querySelector(optTitleSelector).innerHTML;
      console.log(articleTitle);

      /* [DONE] create html link and assign it to the constant */
      const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
      console.log(linkHTML);

      /* [DONE] add link to the list using innerHTML */
      html = html + linkHTML;
      console.log(html);
    }
    console.log(titleList);
    titleList.innerHTML = html;
  }
  generateTitleLinks();
  const links = document.querySelectorAll('.titles a');
  console.log(links);
  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }
}
