const MENU_CAPTURE = 'menu-capture';
const MENU_CAPTURE_WHOLE_PAGE= 'menu-capture-whole-page';

const captureWholePage = () => {
  chrome.tabs.captureVisibleTab({ format: 'png' }, (url) => {
    console.log('captured on ', url);
  });
};

chrome.contextMenus.create({
  id: MENU_CAPTURE,
  title: 'Capture'
});

chrome.contextMenus.create({
  id: MENU_CAPTURE_WHOLE_PAGE,
  title: 'Capture whole page',
  parentId: MENU_CAPTURE,
  onclick: (info, tab) => {
    captureWholePage();
  }
});
