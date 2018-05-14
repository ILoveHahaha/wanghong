window.onload = function () {
  let bottom = document.getElementById('bottom')
  let selectImg = document.getElementsByClassName('selectImg')[0]
  let state = false
  let clickState = new Set()

  // 上拉框按钮监听
  bottom.addEventListener('click', function (ev) {
    let target = ev.target
    let targetName = target.id
    if (targetName) {
      document.getElementsByClassName(targetName)[0].style.left = 0
    }
    console.log(targetName)
    if (target.id === 'pull') {
      if (state) {
        $('#bottom').animate({bottom: '-5.52rem'}, 250)
        state = false
      } else {
        $('#bottom').animate({bottom: 0}, 250)
        state = true
      }
    } else if (target.nodeName === 'I' && target.id) {
      for (let a of target.parentNode.getElementsByTagName('i')) {
        a.classList.remove('active')
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
      for (let a of document.getElementsByClassName('icon')) {
        a.style.display = 'none'
      }
      document.getElementsByClassName(target.id)[0].style.display = 'flex'
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
      selectLeft = document.getElementsByClassName(targetName)[0].style.left.split('rem')[0]
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
        document.getElementsByClassName(targetName)[0].style.left = drap + 'rem'
      })
      selectImg.addEventListener('touchend', function () {
        if (drap > 0) {
          document.getElementsByClassName(targetName)[0].style.left = 0
        } else if (drap < endWidth) {
          document.getElementsByClassName(targetName)[0].style.left = endWidth + 'rem'
        }
      })
    })
  }
  
  // 画图
  function drawImage() {
    
  }
  
  // 放大缩小
  function drop() {
    
  }
  
  // 旋转
  function romate() {
    
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