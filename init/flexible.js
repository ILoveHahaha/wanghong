/**
 * 移动端rem自适应适配，designWidth为设计稿尺寸，
 * maxWidth为制作稿最大宽度值
 * */
;(function (designWidth, maxWidth) {
  let doc = document,
    win = window,
    docEl = doc.documentElement,
    remStyle = document.createElement('style'),
    tid;

  function refreshRem() {
    let width = docEl.getBoundingClientRect().width;
    maxWidth = maxWidth || 540;
    width > maxWidth && (width = maxWidth);
    let rem = width * 100 / designWidth;
    remStyle.innerHTML = `html{font-size: ${rem}px;`
  }

  if (docEl.firstElementChild) {
    docEl.firstElementChild.appendChild(remStyle)
  } else {
    let wrap = doc.createElement('div');
    wrap.appendChild(remStyle);
    doc.write(wrap.innerHTML);
    wrap = null
  }

  refreshRem()

  win.addEventListener('resize', function () {
    clearTimeout(tid);
    tid = setTimeout(refreshRem, 300)
  }, false);

  win.addEventListener('pageshow',function (e) {
    if (e.persisted) {
      clearTimeout(tid);
      tid = setTimeout(refreshRem, 300)
    }
  }, false);

  if (doc.readyState === 'complete') {
    doc.body.style.fontSize = '16px'
  } else {
    doc.addEventListener('DOMContentLoaded', function (e) {
      doc.body.style.fontSize = '16px'
    }, false)
  }
})(2048, 1024);