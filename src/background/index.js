const MENU_CAPTURE = 'menu-capture';
const MENU_CAPTURE_WHOLE_PAGE= 'menu-capture-whole-page';

const getCanvas = () => {
  const CANVAS_ID = 'trimming-canvas';

  let canvas = window.document.getElementById(CANVAS_ID);
  if (canvas) {
    return;
  };

  canvas = window.document.createElement('canvas');
  canvas.id = CANVAS_ID;
  window.document.body.appendChild(canvas);

  return canvas;
};

const captureWholePage = () => {
  chrome.tabs.captureVisibleTab({ format: 'png' }, (url) => {
    let context = getCanvas().getContext('2d');;
    context.canvas.width = 640;
    context.canvas.height = 480;

    let image = new Image();
    image.src = url;
    image.onload = function() {
      context.drawImage(this, -100, -100);

      var data = context.canvas.toDataURL('image/png');
      chrome.tabs.create({
        url: data,
        active: true,
      });
    }
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
