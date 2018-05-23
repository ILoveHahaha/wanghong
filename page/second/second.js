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
  let currentELement = ''
  let primaryZoomPoint = ''
  let primaryRotatePoint = {}

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
      target.classList.add('active')
      if (!clickState.has(targetName)) {
        switch (target.id) {
          case 'sky':
            createIcon(targetName, 11)
            scrollIcon(targetName, -54.52)
            break;
          case 'mountain':
            createIcon(targetName, 15)
            scrollIcon(targetName, -94.52)
            break;
          case 'farm':
            createIcon(targetName, 11)
            scrollIcon(targetName, -94.52)
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
      document.getElementsByClassName(target.id)[0].style.display = 'flex'
    } else if (target.nodeName === 'IMG' && target.style['0']) {
      let url = target.src.split('second/')[1].split('")')[0].split('/')
      // let url = target.style.backgroundImage.split('second/')[1].split('")')[0].split('/')
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
    deleteElement(ev)
    currentELement = ev
    borderLine(ev)
    let touches = ev.targetTouches
    let left = document.getElementsByClassName('left')[0].clientWidth
    let top = document.getElementsByClassName('title')[0].clientHeight
    currentPaint.curX1 = touches[0].clientX - left
    currentPaint.curY1 = touches[0].clientY - top
    // console.log(ev.targetTouches)
    // console.log(currentPaint.curX1)
    // console.log(currentPaint.curY1)
    // console.log(ev.target.offsetLeft)
    // console.log(ev.target.offsetTop)
    if (ev.target.nodeName === 'IMG' || ev.target.parentNode.className !== 'skyIcon') {
      ev.target.parentNode.style.zIndex = parseInt(ev.target.parentNode.style.zIndex) + 10
    }
    paint.addEventListener('touchmove', function (ev) {
      move(ev, left, top)
      drop(ev)
      // rotate(ev)
      // console.log(ev.target.tagName)
      // if (touches.length === 1) {
      //   move(ev, left, top)
      // } else if (touches.length === 2) {
      //   // currentPaint.curX2 = touches[1].clientX - document.getElementsByClassName('left')[0].style.width
      //   // currentPaint.curY2 = touches[1].clientY - document.getElementsByClassName('title')[0].style.height * 0.9
      //   if (touches[0].target.tagName === 'IMG' && touches[1].target.tagName === 'IMG') {
      //     // drop(ev)
      //   } else if (touches[0].target.tagName === 'P' && touches[1].target.tagName === 'P') {
      //     // rotate(ev)
      //   }
      // }
    })
    paint.addEventListener('touchend', function (ev) {
      currentArray = []
      borderNone(ev)
      if (ev.target.nodeName === 'P') {
        if (ev.target.offsetTop < -50) {
          $('.paint').empty(ev.target)
        }
      } else if (ev.target.nodeName === 'IMG') {
        if (ev.target.parentNode.offsetTop < -50) {
          $('.paint').empty(ev.target.parentNode)
          console.log(ev.target.parentNode)
        }
      }
    })
    // console.log(touches[0].target.tagName)

    // console.log(ev.targetTouches)
  })

  // 动态创建元素
  function createIcon(targetName, num) {
    for (let a = 1; a <= num; a++) {
      let i = document.createElement('img')
      i.name = `${targetName}${a}`
      i.style.height = '4rem'
      if (targetName === 'mountain' || targetName === 'farm') {
        i.style.height = '3rem'
        i.style.width = '7rem'
      }
      i.src = `../../img/second/${targetName}/${i.name}.png`
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

  function deleteElement(ev) {
    if (ev.target.className === 'delete') {
      ev.target.parentNode.style.display = 'none'
    }
  }
  
  // 画图
  function drawImage({0: path, 1: name}) {
    let selectIcon = document.querySelectorAll(`.${path}Icon`)
    let deleteIcon = document.createElement('i')
    if (path === 'sky') {
      if (selectIcon.length > 0) {
        selectIcon[0].childNodes[1].src = `../../img/second/${path}/${name}`
      } else {
        let p = document.createElement('p')
        let i = document.createElement('img')
        p.className = `${path}Icon`
        // p.style.zIndex = '10'
        p.style.padding = '0'
        p.style.border = 'none'
        p.style.top = '-0.4rem'
        p.style.left = '0'
        i.style.width = '17.48rem'
        i.src = `../../img/second/${path}/${name}`
        deleteIcon.className = 'delete'
        p.appendChild(deleteIcon)
        p.appendChild(i)
        paint.appendChild(p)
      }
    } else if (path === 'mountain') {
      if (selectIcon.length > 0) {
        selectIcon[0].childNodes[2].src = `../../img/second/${path}/${name}`
      } else {
        let p = document.createElement('p')
        let img = document.createElement('img')
        let i = document.createElement('i')
        i.className = 'zoom'
        p.className = `${path}Icon`
        // p.style.zIndex = '20'
        p.style.padding = '0'
        p.style.border = 'none'
        p.style.bottom = '5.43rem'
        p.style.left = '50%'
        p.style.marginLeft = '-8.74rem'
        img.style.width = '17.48rem'
        img.src = `../../img/second/${path}/${name}`
        p.appendChild(i)
        deleteIcon.className = 'delete'
        p.appendChild(deleteIcon)
        p.appendChild(img)
        paint.appendChild(p)
      }
    } else if (path === 'farm') {
      if (selectIcon.length > 0) {
        selectIcon[0].childNodes[2].src = `../../img/second/${path}/${name}`
      } else {
        let p = document.createElement('p')
        let img = document.createElement('img')
        let i = document.createElement('i')
        i.className = 'zoom'
        p.className = `${path}Icon`
        // p.style.zIndex = '20'
        p.style.padding = '0'
        p.style.border = 'none'
        p.style.bottom = '0'
        p.style.left = '50%'
        p.style.marginLeft = '-8.74rem'
        img.style.width = '17.48rem'
        img.src = `../../img/second/${path}/${name}`
        p.appendChild(i)
        deleteIcon.className = 'delete'
        p.appendChild(deleteIcon)
        p.appendChild(img)
        paint.appendChild(p)
      }
    } else {
      let p = document.createElement('p')
      let img = document.createElement('img')
      // let i1 = document.createElement('i')
      let i2 = document.createElement('i')
      p.className = `${path}Icon`
      p.style.top = '50%'
      // p.style.zIndex = '50'
      p.style.marginTop = '-2.25rem'
      p.style.marginLeft = '-3rem'
      // p.style.border = '1px dashed #CAFF70'
      // i1.className = 'rotate'
      i2.className = 'zoom'
      img.style.width = '3rem'
      img.src = `../../img/second/${path}/${name}`
      // p.appendChild(i1)
      p.appendChild(i2)
      deleteIcon.className = 'delete'
      p.appendChild(deleteIcon)
      p.appendChild(img)
      paint.appendChild(p)
    }
  }
  
  // 放大缩小
  function drop(ev) {
    if (ev.target.parentNode.className === 'skyIcon') {
      return false
    } else if (ev.target.className !== 'zoom') {
      return false
    } else {
      let width
      if (primaryZoomPoint !== '') {
        width = ev.targetTouches[0].clientX - primaryZoomPoint
        let img = ev.target.parentNode.getElementsByTagName('img')[0]
        img.style.width = (img.clientWidth + width) + 'px'
      }
      primaryZoomPoint = ev.targetTouches[0].clientX
    }
  }
  // 移动
  function move(ev, left, top) {
    if (ev.target.nodeName === 'IMG') {
        if (ev.target.parentNode.className === 'skyIcon') {
          return false
        }
    }
    // if (movePaint.x) {
    //   let width = ev.targetTouches[0].clientX - movePaint.x
    //   let height = ev.targetTouches[0].clientY - movePaint.y
    // }
    // movePaint.x = ev.targetTouches[0].clientX
    // movePaint.y = ev.targetTouches[0].clientY


    movePaint.curX1 = ev.targetTouches[0].clientX - left / 2
    movePaint.curY1 = ev.targetTouches[0].clientY - top
    if (ev.target.nodeName === 'IMG') {
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
  function rotate(ev) {
    if (ev.target.nodeName === 'IMG' || ev.target.nodeName === 'DIV') {
      return false
    } else if (ev.target.className !== 'rotate') {
      return false
    } else {
      if (ev.target.parentNode.className === 'skyIcon'
        || ev.target.parentNode.className === 'mountainIcon'
        || ev.target.parentNode.className === 'farmIcon') {
        return false
      }
      if (primaryRotatePoint.x) {
        let width = ev.targetTouches[0].clientX - primaryRotatePoint.x
        let height = ev.targetTouches[0].clientY - primaryRotatePoint.y
        let deg = 180 / (Math.PI) * Math.atan2(height, width)
        console.log(deg)
        ev.target.parentNode.style.transform = `rotate(${deg}deg)`

      }
      primaryRotatePoint.x = ev.targetTouches[0].clientX
      primaryRotatePoint.y = ev.targetTouches[0].clientY
    }
  }

  function borderLine(ev) {
    if (ev.target.nodeName === 'IMG') {
      if (ev.target.parentNode.className === 'skyIcon') return false
      ev.target.parentNode.style.border = '1px dashed #CAFF70'
    } else if (ev.target.nodeName === 'P') {
      ev.target.style.border = '1px dashed #CAFF70'
    }
  }

  function borderNone(ev) {
    if (ev.target.nodeName === 'IMG') {
      ev.target.parentNode.style.border = 'none'
    } else if (ev.target.nodeName === 'P') {
      ev.target.style.border = 'none'
    }
  }

  // 下一页
  document.getElementsByClassName('next')[0].onclick = function () {
    this.style.display = 'none'
    $('.zoom').hide()
    $('.rotate').hide()
    $('.delete').hide()
    document.getElementsByClassName('write')[0].style.display = 'block'
    document.getElementsByClassName('bottom')[0].style.display = 'none'
    document.getElementsByTagName('textarea')[0].value = '请输入你对乡村的一句话。'
    let div = document.createElement('div')
    div.style.width = '17.48rem'
    div.style.height = '17.5rem'
    // div.style.zIndex = '100'
    div.style.top = '1.8rem'
    div.style.position = 'absolute'
    document.getElementsByClassName('secondContain')[0].appendChild(div)
  }

  // 输入留言
  document.getElementsByTagName('textarea')[0].onclick = function () {
    this.value = ''
  }

  document.getElementsByClassName('goback')[0].onclick = function () {
    location.href = 'http://119.29.157.202:8080/hongjie/wanghong/wanghong/page/index/index.html'
  }
}