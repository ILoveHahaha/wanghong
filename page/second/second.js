window.onload = function () {
  let bottom = document.getElementById('bottom')
  let selectImg = document.getElementsByClassName('selectImg')[0]
  let state = false
  let clickState = new Set()
  let paint = document.getElementsByClassName('paint')[0]
  let currentPaint = {
    curX1: '',
    curY1: '',
    curX2: '',
    curY2: ''
  }
  let movePaint = {
    curX1: '',
    curY1: '',
    curX2: '',
    curY2: ''
  }
  let currentArray = []

  // 上拉框按钮监听
  bottom.onclick = function (ev) {
    let target = ev.target
    let targetName = target.id
    // console.log(target.style['0'])
    // console.log(target.name)
    // console.log(target.parentNode.getElementsByTagName('i'))
    if (targetName) {
      document.getElementsByClassName(targetName)[0].style.left = 0
    }
    if (target.id === 'pull') {
      if (state) {
        $('#bottom').animate({bottom: '-5.52rem'}, 250)
        state = false
      } else {
        $('#bottom').animate({bottom: 0}, 250)
        state = true
      }
    } else if (target.nodeName === 'I' && target.id) {
      for (let a = 0; a < target.parentNode.getElementsByTagName('i').length; a++) {
        target.parentNode.getElementsByTagName('i')[a].classList.remove('active')
        selectImg.removeEventListener('touchstart', function () {})
        selectImg.removeEventListener('touchmove', function () {})
        selectImg.removeEventListener('touchend', function () {})
      }
      // for (let a of target.parentNode.getElementsByTagName('i')) {
      //   console.log(a)
        // a.classList.remove('active')
        // selectImg.removeEventListener('touchstart', function () {})
        // selectImg.removeEventListener('touchmove', function () {})
        // selectImg.removeEventListener('touchend', function () {})
      // }
      target.classList.add('active')
      if (!clickState.has(targetName)) {
        switch (target.id) {
          case 'sky':
            createIcon(targetName, 11)
            scrollIcon(targetName, -54.52)
            break;
          case 'mountain':
            createIcon(targetName, 15)
            scrollIcon(targetName, -84.52)
            break;
          case 'farm':
            createIcon(targetName, 11)
            scrollIcon(targetName, -54.52)
            break;
          case 'decoration':
            createIcon(targetName, 15)
            scrollIcon(targetName, -84.52)
            break;
          case 'tile':
            createIcon(targetName, 19)
            scrollIcon(targetName, -114.52)
            break;
          case 'gothic':
            createIcon(targetName, 14)
            scrollIcon(targetName, -70.02)
            break;
          case 'castle':
            createIcon(targetName, 11)
            scrollIcon(targetName, -54.52)
            break;
        }
      }
      clickState.add(targetName)
      for (let a = 0; a < document.getElementsByClassName('icon').length; a++) {
        document.getElementsByClassName('icon')[a].style.display = 'none'
      }
      // for (let a of document.getElementsByClassName('icon')) {
      //   a.style.display = 'none'
      // }
      document.getElementsByClassName(target.id)[0].style.display = 'flex'
    } else if (target.nodeName === 'I' && target.style['0']) {
      let url = target.style.backgroundImage.split('second/')[1].split('")')[0].split('/')
      drawImage(url)
    } else if (target.nodeName === 'I' && target.name) {
      switch (target.name) {
        case 'tile':
          break;
        case 'gothic':
          break;
        case 'castle':
          break;
      }
    } else if (target.nodeName === 'I') {
      if (target.parentNode.classList[0] === 'color') {
        document.documentElement.style.backgroundColor = target.getAttribute('name')
      }
    }
  }

  // 画图去监听
  // paint.onclick = function (ev) {
  //   let target = ev.target
  // }
  paint.addEventListener('touchstart', function (ev) {
    let touches = ev.targetTouches
    let left = document.getElementsByClassName('left')[0].style.width
    let top = document.getElementsByClassName('title')[0].style.height * 0.9
    currentPaint.curX1 = touches[0].clientX - left
    currentPaint.curY1 = touches[0].clientY - top
    // console.log(ev.targetTouches)
    // console.log(currentPaint.curX1)
    // console.log(currentPaint.curY1)
    // console.log(ev.target.offsetLeft)
    // console.log(ev.target.offsetTop)
    paint.addEventListener('touchmove', function (ev) {
      // console.log(ev.target.tagName)
      if (touches.length === 1) {
        move(ev, left, top)
      } else if (touches.length === 2) {
        // currentPaint.curX2 = touches[1].clientX - document.getElementsByClassName('left')[0].style.width
        // currentPaint.curY2 = touches[1].clientY - document.getElementsByClassName('title')[0].style.height * 0.9
        if (touches[0].target.tagName === 'I' && touches[1].target.tagName === 'I') {
          drop(ev)
        } else if (touches[0].target.tagName === 'P' && touches[1].target.tagName === 'P') {
          romate(ev)
        }
      }
    })
    paint.addEventListener('touchend', function (ev) {
      currentArray = []
    })
    // console.log(touches[0].target.tagName)

    // console.log(ev.targetTouches)
  })

  // 动态创建元素
  function createIcon(targetName, num) {
    for (let a = 1; a <= num; a++) {
      let i = document.createElement('i')
      i.name = `${targetName}${a}`
      i.style.background = `url(../../img/second/${targetName}/${i.name}.png`
      i.style.backgroundSize = '100% 100%'
      document.getElementsByClassName(targetName)[0].appendChild(i)
    }
  }

  // 滚动条
  function scrollIcon(targetName, endWidth) {
    let selectLeft = 0
    selectImg.addEventListener('touchstart', function (ev) {
      selectLeft = document.querySelectorAll(`div.${targetName}`)[0].style.left.split('rem')[0]
      selectLeft = selectLeft ? parseFloat(selectLeft) : 0
      let primary = ev.touches[0].clientX
      let drap = 0
      selectImg.addEventListener('touchmove', function (ev) {
        drap = -(primary - ev.touches[0].clientX) / 50 + selectLeft
        if (drap > 3) {
          drap = 3
        } else if (drap < endWidth - 3) {
          drap = endWidth - 3
        }
        document.querySelectorAll(`div.${targetName}`)[0].style.left = drap + 'rem'
      })
      selectImg.addEventListener('touchend', function () {
        if (drap > 0) {
          document.querySelectorAll(`div.${targetName}`)[0].style.left = 0
        } else if (drap < endWidth) {
          document.querySelectorAll(`div.${targetName}`)[0].style.left = endWidth + 'rem'
        }
      })
    })
  }
  
  // 画图
  function drawImage({0: path, 1: name}) {
    let selectIcon = document.querySelectorAll(`.${path}Icon`)
    // if (path === 'sky' || path === 'farm') {
    if (path === 'sky') {
      if (selectIcon.length > 0) {
        selectIcon[0].childNodes[0].style.background = `url(../../img/second/${path}/${name}`
        selectIcon[0].childNodes[0].style.backgroundSize = '100% 100%'
      } else {
        let p = document.createElement('p')
        let i = document.createElement('i')
        p.className = `${path}Icon`
        p.style.padding = '0'
        p.style.border = 'none'
        p.style.top = '-0.4rem'
        p.style.left = '0'
        i.style.height = '12.236rem'
        i.style.width = '17.48rem'
        // p.style.marginTop = '-2.25rem'
        // p.style.marginLeft = '-3rem'
        // p.style.border = '1px dashed #CAFF70'
        i.style.background = `url(../../img/second/${path}/${name}`
        i.style.backgroundSize = '100% 100%'
        p.appendChild(i)
        paint.appendChild(p)
      }
    } else if (path === 'mountain' || path === 'farm') {
      if (selectIcon.length > 0) {
        selectIcon[0].childNodes[0].style.background = `url(../../img/second/${path}/${name}`
        selectIcon[0].childNodes[0].style.backgroundSize = '100% 100%'
      } else {
        let p = document.createElement('p')
        let i = document.createElement('i')
        p.className = `${path}Icon`
        p.style.padding = '0'
        p.style.border = 'none'
        p.style.bottom = '-0.4rem'
        p.style.left = '0'
        i.style.height = '5.83rem'
        i.style.width = '17.48rem'
        // p.style.marginTop = '-2.25rem'
        // p.style.marginLeft = '-3rem'
        // p.style.border = '1px dashed #CAFF70'
        i.style.background = `url(../../img/second/${path}/${name}`
        i.style.backgroundSize = '100% 100%'
        p.appendChild(i)
        paint.appendChild(p)
      }
    } else {
      let p = document.createElement('p')
      let i = document.createElement('i')
      p.className = `${path}Icon`
      // p.style.padding = '0'
      // p.style.border = 'none'
      p.style.top = '50%'
      // p.style.left = '0'
      p.style.marginTop = '-2.25rem'
      p.style.marginLeft = '-3rem'
      p.style.border = '1px dashed #CAFF70'
      i.style.height = '2.5rem'
      i.style.width = '3rem'
      i.style.background = `url(../../img/second/${path}/${name}`
      i.style.backgroundSize = '100% 100%'
      p.appendChild(i)
      paint.appendChild(p)
    }
  }
  
  // 放大缩小
  function drop(ev) {
    if (ev.target.parentNode.className === 'skyIcon') {
      return false
    }
    let width = ev.targetTouches[0].pageX - ev.targetTouches[1].pageX
    let height = ev.targetTouches[0].pageY - ev.targetTouches[1].pageY
    width = width > 0 ? width : -width
    height = height > 0 ? height : -height
    currentArray.push(width)
    if (currentArray.length < 2) {
      return
    } else {
      if (currentArray[currentArray.length - 1] > currentArray[currentArray.length - 2]) {
        ev.target.style.width = (ev.target.clientWidth + width / 10) + 'px'
        ev.target.style.height = (ev.target.clientHeight + height / 10) + 'px'
      } else if (currentArray[currentArray.length - 1] < currentArray[currentArray.length - 2]) {
        ev.target.style.width = (ev.target.clientWidth - width / 10) + 'px'
        ev.target.style.height = (ev.target.clientHeight - height / 10) + 'px'
      }
    }
  }
  // 移动
  function move(ev, left, top) {
    movePaint.curX1 = ev.targetTouches[0].clientX - left
    movePaint.curY1 = ev.targetTouches[0].clientY - top
    // if (touches[0].target.tagName === 'I') {
    if (ev.target.nodeName === 'I') {
      // ev.target.parentNode.style.left = (movePaint.curX1 - ev.target.parentNode.offsetLeft - ev.target.offsetLeft -left) + 'px'
      // ev.target.parentNode.style.top = (movePaint.curY1 - ev.target.parentNode.offsetTop - ev.target.offsetTop - top) + 'px'
      if (ev.target.parentNode.className === 'skyIcon') {
        return false
      }
      ev.target.parentNode.style.left = movePaint.curX1 + 'px'
      ev.target.parentNode.style.top = movePaint.curY1 + 'px'
    } else if (ev.target.nodeName === 'P') {
      ev.target.style.left = movePaint.curX1 + 'px'
      ev.target.style.top = movePaint.curY1 + 'px'
    }
  }
  
  // 旋转
  function romate(ev) {
    let width = ev.targetTouches[0].pageX - ev.targetTouches[1].pageX
    let height = ev.targetTouches[0].pageY - ev.targetTouches[1].pageY
    let deg = height / width * 5
    // ev.target
    if (ev.target.parentNode.className === 'skyIcon') {
      return false
    }
    ev.target.style.transform = `rotate(${deg}deg)`
  }

  // 下一页
  document.getElementsByClassName('next')[0].onclick = function () {
    this.style.display = 'none'
    document.getElementsByClassName('write')[0].style.display = 'block'
    document.getElementsByClassName('bottom')[0].style.display = 'none'
    document.getElementsByTagName('textarea')[0].value = '请输入你对乡村的一句话。'
  }

  // 输入留言
  document.getElementsByTagName('textarea')[0].onclick = function () {
    this.value = ''
  }
}