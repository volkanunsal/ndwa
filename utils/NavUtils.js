module.exports = {
  nextPageOrSection: function (props) {
    let {params, nav} = props;
    let {pageName, sectionName} = params;
    let {sections} = nav;
    if (!pageName) { pageName = "1" };
    pageName = Number(pageName);
    sectionName = Number(sectionName);
    let {pages} = sections[sectionName - 1];
    if (pages.length > 0 && pageName < pages.length) {
      pageName += 1;
    }else{
      sectionName += 1;
      pageName = 1;
    };
    return {sectionName, pageName}
  }
}