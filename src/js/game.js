window.onload = function () {
  const startWindow = document.querySelector('.start__container');
  const game = document.querySelector('.game__container');
  const winResult = document.querySelector('.win-result');
  const failResult = document.querySelector('.fail-result');
  const maindishLeds = {
    left: document.querySelector('.plates__wrapper-left .maindish_led-type-2'),
    right: document.querySelector(
      '.plates__wrapper-right .maindish_led-type-2'
    ),
    center: document.querySelector(
      '.plates__wrapper-center .maindish_led-type-1'
    ),
  };

  createElem();
  createHero();
  createStartBtn();

  function startGame() {
    hideStartWindow();
    createWavingHero();
    createDish();
    showDish();
  }

  function hideStartWindow() {
    startWindow.classList.add('hidden');
    game.classList.remove('hidden');
    removeStartPageElements();
  }

  function showStartWindow() {
    game.classList.add('hidden');
    startWindow.classList.remove('hidden');
    createHero();
    createElem();
    createStartBtn();
    createRestartBtn();
  }

  function restartGame() {
    hideStartWindow();
    createWavingHero();
    showDish();
  }

  function createWavingHero() {
    setTimeout(function () {
      const wavingBlitzy = document.createElement('div');
      const blitzyWithoutHand = document.createElement('div');
      const blitzyHand = document.createElement('div');

      wavingBlitzy.classList.add('blitzy-waving');
      blitzyWithoutHand.classList.add('blitzy-without-hand');
      blitzyHand.classList.add('blitzy-hand');

      game.appendChild(wavingBlitzy);
      wavingBlitzy.appendChild(blitzyWithoutHand);
      wavingBlitzy.appendChild(blitzyHand);

      setTimeout(function () {
        blitzyHand.classList.add('animated');
      }, 500);
    }, 700);
  }

  function createElem() {
    setTimeout(function () {
      const table = document.createElement('div');
      const bingoLogo = document.createElement('div');

      table.classList.add('table-1');
      bingoLogo.classList.add('bingo-logo-1');

      startWindow.appendChild(table);
      startWindow.appendChild(bingoLogo);
    }, 500);
  }

  function removeStartPageElements() {
    const parentElement = document.querySelector('.start__container');
    const elementsToRemove = [
      '.table-1',
      '.bingo-logo-1',
      '.candice',
      '.blitzy',
      '.play-now-btn',
      '.restart',
    ];

    elementsToRemove.forEach(selector => {
      const element = parentElement.querySelector(selector);
      if (element) {
        parentElement.removeChild(element);
      }
    });
  }

  function createHero() {
    setTimeout(function () {
      const candice = document.createElement('div');
      const blitzy = document.createElement('div');

      candice.classList.add('candice');
      blitzy.classList.add('blitzy');

      startWindow.appendChild(candice);
      startWindow.appendChild(blitzy);
    }, 1000);
  }

  function createStartBtn() {
    const startBtn = document.createElement('button');

    setTimeout(function () {
      startWindow.appendChild(startBtn);
      startBtn.classList.add('play-now-btn');
      startBtn.onclick = function () {
        startGame();
      };
    }, 1600);

    setTimeout(function () {
      startBtn.classList.add('animated');
    }, 2000);
  }

  function createRestartBtn() {
    setTimeout(function () {
      const restartBtn = document.createElement('button');
      startWindow.appendChild(restartBtn);
      restartBtn.classList.add('restart');
      restartBtn.onclick = function () {
        restartGame();
      };
    }, 2100);
  }

  function typeDish() {
    function random(min, max) {
      let rand = min - 0.5 + Math.random() * (max - min + 1);
      return Math.round(rand);
    }

    if (random(1, 3) == 1) {
      return 'win-1';
    } else if (random(1, 3) == 2) {
      return 'win-2';
    } else {
      return 'fail-1';
    }
  }

  function createDish() {
    const dishLeft = document.querySelector('.dish-left');
    const dishRight = document.querySelector('.dish-right');
    const dishCenter = document.querySelector('.dish-center');

    removeDishClasses();

    let dishLeftType = typeDish();
    let dishRightType = typeDish();
    let dishCenterType = typeDish();

    dishLeft.classList.add(`${dishLeftType}`);

    if (dishLeftType === dishRightType) {
      do {
        dishRightType = typeDish();
      } while (dishLeftType === dishRightType);
    }

    dishRight.classList.add(`${dishRightType}`);

    if (dishCenterType === dishLeftType || dishCenterType === dishRightType) {
      do {
        dishCenterType = typeDish();
      } while (
        dishCenterType === dishLeftType ||
        dishCenterType === dishRightType
      );
    }
    dishCenter.classList.add(`${dishCenterType}`);
  }

  function removeDishClasses() {
    const dishes = document.querySelectorAll(
      '.dish-left, .dish-right, .dish-center'
    );
    dishes.forEach(dish => {
      dish.classList.remove('win-1', 'win-2', 'fail-1');
    });
  }

  function handleMaindishLedClick(maindishLed, openClass) {
    const wavingBlitzy = document.querySelector('.blitzy-waving');
    wavingBlitzy.classList.add('blitzy-disappearance');

    setTimeout(function () {
      wavingBlitzy.classList.add('hidden');
      wavingBlitzy.remove();
    }, 300);

    maindishLed.classList.add(`${openClass}`);
    setTimeout(function () {
      const dish = maindishLed.parentElement.querySelector('.dish');

      if (
        dish.classList.contains('win-1') ||
        dish.classList.contains('win-2')
      ) {
        winResult.classList.remove('hidden');
      } else {
        failResult.classList.remove('hidden');
      }
    }, 800);

    setTimeout(function () {
      maindishLed.classList.remove(`${openClass}`);
      winResult.classList.add('hidden');
      failResult.classList.add('hidden');
      endGame();
    }, 2500);
  }

  function showDish() {
    maindishLeds.left.onclick = function () {
      const openClass = 'open-left';
      handleMaindishLedClick(maindishLeds.left, openClass);
    };
    maindishLeds.right.onclick = function () {
      const openClass = 'open-right';
      handleMaindishLedClick(maindishLeds.right, openClass);
    };
    maindishLeds.center.onclick = function () {
      const openClass = 'open-center';
      handleMaindishLedClick(maindishLeds.center, openClass);
    };
  }

  function endGame() {
    showStartWindow();
  }
};
