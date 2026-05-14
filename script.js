const body = document.body;
const stringWrap = document.getElementById('stringWrap');
const hint = document.createElement('p');
hint.className = 'hint';
hint.textContent = 'Pull the string';
document.body.appendChild(hint);

let isOn = false;
let isPulling = false;

function flicker(callback) {
  body.classList.add('flickering');
  setTimeout(() => {
    body.classList.remove('flickering');
    if (callback) callback();
  }, 520);
}

function turnOn() {
  stringWrap.classList.add('pulling');
  setTimeout(() => stringWrap.classList.remove('pulling'), 400);

  flicker(() => {
    body.classList.add('on');
    isOn = true;
  });
}

function turnOff() {
  stringWrap.classList.add('pulling');
  setTimeout(() => stringWrap.classList.remove('pulling'), 400);

  flicker(() => {
    body.classList.remove('on');
    isOn = false;
  });
}

stringWrap.addEventListener('click', () => {
  if (isPulling) return;
  isPulling = true;
  setTimeout(() => isPulling = false, 600);

  if (!isOn) {
    turnOn();
  } else {
    turnOff();
  }
});

// Touch swipe down on string = pull
let touchStartY = 0;
stringWrap.addEventListener('touchstart', e => {
  touchStartY = e.touches[0].clientY;
}, { passive: true });

stringWrap.addEventListener('touchend', e => {
  const dy = e.changedTouches[0].clientY - touchStartY;
  if (dy > 10) {
    if (isPulling) return;
    isPulling = true;
    setTimeout(() => isPulling = false, 600);
    isOn ? turnOff() : turnOn();
  }
}, { passive: true });
