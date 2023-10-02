/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/2-hangman.js":
/*!**************************!*\
  !*** ./src/2-hangman.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Hangman)
/* harmony export */ });
class Hangman {
  constructor(word, remainingGuesses) {
    this.word = word.toLowerCase().split('');
    this.remainingGuesses = remainingGuesses;
    this.guessedLetters = [];
    this.status = 'playing';
  }
  get puzzle() {
    let puzzle = '';
    this.word.forEach(letter => {
      if (this.guessedLetters.includes(letter) || letter === ' ') {
        puzzle += letter;
      } else {
        puzzle += '*';
      }
    });
    return puzzle;
  }
  get status_message() {
    switch (this.status) {
      case 'finished':
        return `Great work! You guessed the word.`;
      case 'failed':
        return `Nice try! The word was "${this.word.join('')}".`;
      default:
        return `Guesses left: ${this.remainingGuesses}.`;
    }
  }
  calcStatus() {
    const isFinished = this.word.every(single => this.guessedLetters.includes(single) || single === ' ');
    const guessLimit = this.remainingGuesses <= 0;
    if (isFinished && this.status !== 'failed') {
      this.status = 'finished';
    } else if (guessLimit) {
      this.status = 'failed';
    }
  }
  makeGuess(guess) {
    guess = guess.toLowerCase();
    const isUnique = !this.guessedLetters.includes(guess);
    const isBadWord = !this.word.includes(guess);
    if (isUnique) {
      this.guessedLetters.push(guess);
      isBadWord && this.remainingGuesses--;
      this.calcStatus();
    }
  }
}


/***/ }),

/***/ "./src/request.js":
/*!************************!*\
  !*** ./src/request.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ new_request)
/* harmony export */ });
const request = {
  get(url) {
    return new Promise((resolve, reject) => {
      const xmlRequest = new XMLHttpRequest();
      xmlRequest.open('GET', url);
      xmlRequest.addEventListener('readystatechange', event => {
        if (event.target.readyState === 4 && event.target.status === 200) {
          resolve(JSON.parse(event.target.responseText));
        } else if (event.target.readyState === 4) {
          reject(JSON.parse(event.target.responseText));
        }
      });
      xmlRequest.send();
    });
  }
};
const new_request = {
  async get(url) {
    const response = await fetch(url);
    if (response.status === 200) {
      return response.json();
    } else {
      throw new Error('Unable to fetch data');
    }
  }
};


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _2_hangman__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./2-hangman */ "./src/2-hangman.js");
/* harmony import */ var _request__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./request */ "./src/request.js");


// console.log('asdasdd')
const div = document.createElement('div');
const wordEl = document.createElement('span');
const statusEl = document.createElement('span');
const button = document.createElement('button');
const render_word = game => {
  wordEl.innerHTML = '';
  game.puzzle.split('').forEach(word => {
    const span = document.createElement('span');
    span.textContent = word;
    wordEl.appendChild(span);
  });
  statusEl.textContent = game.status_message;
};
const renderGame = game => {
  render_word(game);
  button.textContent = 'reset';
  button.onclick = start_game;
  wordEl.classList.add('word');
  statusEl.classList.add('status');
  div.classList.add('game_container');
  div.appendChild(wordEl);
  div.appendChild(statusEl);
  div.appendChild(button);
  document.body.appendChild(div);
};
const play_game = (game, key) => {
  if (game.status === 'playing') {
    game.makeGuess(key);
    render_word(game);
  }
};
const start_game = async () => {
  const response = await _request__WEBPACK_IMPORTED_MODULE_1__["default"].get('https://puzzle.mead.io/puzzle?wordCount=3');
  const puzzle = new _2_hangman__WEBPACK_IMPORTED_MODULE_0__["default"](response.puzzle, 3);
  renderGame(puzzle);
  window.addEventListener('keypress', event => {
    play_game(puzzle, event.key);
  });
};
start_game();

// const get_location = async () => {
//   const location = await new_request.get(
//     'https://ipinfo.io/json?token=b9bdc67fc5f35a'
//   )
//   const position = await new_request.get('https://restcountries.com/v3.1/all')

//   const country_code = location.country
//   const country = position?.find((country) => country.cca2 === country_code)

//   return `You are currently in ${location.city} ${location.region} ${country.name.common}!`
// }

// get_location().then(console.log).catch(console.error)

const typewriter_effect = async current_word => {
  for (let i = 0; i < current_word.length; i++) {
    statusEl.innerHTML = current_word.substring(0, i + 1);
    await new Promise(resolve => setTimeout(resolve, 100));
  }
};
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QzVDbkIsUUFBUSxDQUFDSSxTQUFTLEdBQUdjLFlBQVksQ0FBQ0csU0FBUyxDQUFDLENBQUMsRUFBRUYsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNyRCxNQUFNLElBQUkxQyxPQUFPLENBQUVDLE9BQU8sSUFBSzRDLFVBQVUsQ0FBQzVDLE9BQU8sRUFBRSxHQUFHLENBQUMsQ0FBQztFQUMxRDtBQUNGLENBQUMsQyIsInNvdXJjZXMiOlsid2VicGFjazovL2JvaWxlcnBsYXRlLy4vc3JjLzItaGFuZ21hbi5qcyIsIndlYnBhY2s6Ly9ib2lsZXJwbGF0ZS8uL3NyYy9yZXF1ZXN0LmpzIiwid2VicGFjazovL2JvaWxlcnBsYXRlL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JvaWxlcnBsYXRlL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9ib2lsZXJwbGF0ZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JvaWxlcnBsYXRlL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYm9pbGVycGxhdGUvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgSGFuZ21hbiB7XHJcbiAgY29uc3RydWN0b3Iod29yZCwgcmVtYWluaW5nR3Vlc3Nlcykge1xyXG4gICAgdGhpcy53b3JkID0gd29yZC50b0xvd2VyQ2FzZSgpLnNwbGl0KCcnKVxyXG4gICAgdGhpcy5yZW1haW5pbmdHdWVzc2VzID0gcmVtYWluaW5nR3Vlc3Nlc1xyXG4gICAgdGhpcy5ndWVzc2VkTGV0dGVycyA9IFtdXHJcbiAgICB0aGlzLnN0YXR1cyA9ICdwbGF5aW5nJ1xyXG4gIH1cclxuXHJcbiAgZ2V0IHB1enpsZSgpIHtcclxuICAgIGxldCBwdXp6bGUgPSAnJ1xyXG5cclxuICAgIHRoaXMud29yZC5mb3JFYWNoKChsZXR0ZXIpID0+IHtcclxuICAgICAgaWYgKHRoaXMuZ3Vlc3NlZExldHRlcnMuaW5jbHVkZXMobGV0dGVyKSB8fCBsZXR0ZXIgPT09ICcgJykge1xyXG4gICAgICAgIHB1enpsZSArPSBsZXR0ZXJcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBwdXp6bGUgKz0gJyonXHJcbiAgICAgIH1cclxuICAgIH0pXHJcblxyXG4gICAgcmV0dXJuIHB1enpsZVxyXG4gIH1cclxuXHJcbiAgZ2V0IHN0YXR1c19tZXNzYWdlKCkge1xyXG4gICAgc3dpdGNoICh0aGlzLnN0YXR1cykge1xyXG4gICAgICBjYXNlICdmaW5pc2hlZCc6XHJcbiAgICAgICAgcmV0dXJuIGBHcmVhdCB3b3JrISBZb3UgZ3Vlc3NlZCB0aGUgd29yZC5gXHJcbiAgICAgIGNhc2UgJ2ZhaWxlZCc6XHJcbiAgICAgICAgcmV0dXJuIGBOaWNlIHRyeSEgVGhlIHdvcmQgd2FzIFwiJHt0aGlzLndvcmQuam9pbignJyl9XCIuYFxyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIHJldHVybiBgR3Vlc3NlcyBsZWZ0OiAke3RoaXMucmVtYWluaW5nR3Vlc3Nlc30uYFxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgY2FsY1N0YXR1cygpIHtcclxuICAgIGNvbnN0IGlzRmluaXNoZWQgPSB0aGlzLndvcmQuZXZlcnkoXHJcbiAgICAgIChzaW5nbGUpID0+IHRoaXMuZ3Vlc3NlZExldHRlcnMuaW5jbHVkZXMoc2luZ2xlKSB8fCBzaW5nbGUgPT09ICcgJ1xyXG4gICAgKVxyXG4gICAgY29uc3QgZ3Vlc3NMaW1pdCA9IHRoaXMucmVtYWluaW5nR3Vlc3NlcyA8PSAwXHJcblxyXG4gICAgaWYgKGlzRmluaXNoZWQgJiYgdGhpcy5zdGF0dXMgIT09ICdmYWlsZWQnKSB7XHJcbiAgICAgIHRoaXMuc3RhdHVzID0gJ2ZpbmlzaGVkJ1xyXG4gICAgfSBlbHNlIGlmIChndWVzc0xpbWl0KSB7XHJcbiAgICAgIHRoaXMuc3RhdHVzID0gJ2ZhaWxlZCdcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG1ha2VHdWVzcyhndWVzcykge1xyXG4gICAgZ3Vlc3MgPSBndWVzcy50b0xvd2VyQ2FzZSgpXHJcbiAgICBjb25zdCBpc1VuaXF1ZSA9ICF0aGlzLmd1ZXNzZWRMZXR0ZXJzLmluY2x1ZGVzKGd1ZXNzKVxyXG4gICAgY29uc3QgaXNCYWRXb3JkID0gIXRoaXMud29yZC5pbmNsdWRlcyhndWVzcylcclxuXHJcbiAgICBpZiAoaXNVbmlxdWUpIHtcclxuICAgICAgdGhpcy5ndWVzc2VkTGV0dGVycy5wdXNoKGd1ZXNzKVxyXG4gICAgICBpc0JhZFdvcmQgJiYgdGhpcy5yZW1haW5pbmdHdWVzc2VzLS1cclxuICAgICAgdGhpcy5jYWxjU3RhdHVzKClcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7IEhhbmdtYW4gYXMgZGVmYXVsdCB9XHJcbiIsImNvbnN0IHJlcXVlc3QgPSB7XHJcbiAgZ2V0KHVybCkge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgY29uc3QgeG1sUmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpXHJcbiAgICAgIHhtbFJlcXVlc3Qub3BlbignR0VUJywgdXJsKVxyXG4gICAgICB4bWxSZXF1ZXN0LmFkZEV2ZW50TGlzdGVuZXIoJ3JlYWR5c3RhdGVjaGFuZ2UnLCAoZXZlbnQpID0+IHtcclxuICAgICAgICBpZiAoZXZlbnQudGFyZ2V0LnJlYWR5U3RhdGUgPT09IDQgJiYgZXZlbnQudGFyZ2V0LnN0YXR1cyA9PT0gMjAwKSB7XHJcbiAgICAgICAgICByZXNvbHZlKEpTT04ucGFyc2UoZXZlbnQudGFyZ2V0LnJlc3BvbnNlVGV4dCkpXHJcbiAgICAgICAgfSBlbHNlIGlmIChldmVudC50YXJnZXQucmVhZHlTdGF0ZSA9PT0gNCkge1xyXG4gICAgICAgICAgcmVqZWN0KEpTT04ucGFyc2UoZXZlbnQudGFyZ2V0LnJlc3BvbnNlVGV4dCkpXHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgICB4bWxSZXF1ZXN0LnNlbmQoKVxyXG4gICAgfSlcclxuICB9XHJcbn1cclxuXHJcbmNvbnN0IG5ld19yZXF1ZXN0ID0ge1xyXG4gIGFzeW5jIGdldCh1cmwpIHtcclxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2godXJsKVxyXG5cclxuICAgIGlmIChyZXNwb25zZS5zdGF0dXMgPT09IDIwMCkge1xyXG4gICAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1VuYWJsZSB0byBmZXRjaCBkYXRhJylcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7IG5ld19yZXF1ZXN0IGFzIGRlZmF1bHQgfVxyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBIYW5nbWFuIGZyb20gJy4vMi1oYW5nbWFuJ1xyXG5pbXBvcnQgbmV3X3JlcXVlc3QgZnJvbSAnLi9yZXF1ZXN0J1xyXG4vLyBjb25zb2xlLmxvZygnYXNkYXNkZCcpXHJcbmNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXHJcbmNvbnN0IHdvcmRFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKVxyXG5jb25zdCBzdGF0dXNFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKVxyXG5jb25zdCBidXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKVxyXG5cclxuY29uc3QgcmVuZGVyX3dvcmQgPSAoZ2FtZSkgPT4ge1xyXG4gIHdvcmRFbC5pbm5lckhUTUwgPSAnJ1xyXG4gIGdhbWUucHV6emxlLnNwbGl0KCcnKS5mb3JFYWNoKCh3b3JkKSA9PiB7XHJcbiAgICBjb25zdCBzcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpXHJcbiAgICBzcGFuLnRleHRDb250ZW50ID0gd29yZFxyXG4gICAgd29yZEVsLmFwcGVuZENoaWxkKHNwYW4pXHJcbiAgfSlcclxuICBzdGF0dXNFbC50ZXh0Q29udGVudCA9IGdhbWUuc3RhdHVzX21lc3NhZ2VcclxufVxyXG5cclxuY29uc3QgcmVuZGVyR2FtZSA9IChnYW1lKSA9PiB7XHJcbiAgcmVuZGVyX3dvcmQoZ2FtZSlcclxuICBidXR0b24udGV4dENvbnRlbnQgPSAncmVzZXQnXHJcbiAgYnV0dG9uLm9uY2xpY2sgPSBzdGFydF9nYW1lXHJcblxyXG4gIHdvcmRFbC5jbGFzc0xpc3QuYWRkKCd3b3JkJylcclxuICBzdGF0dXNFbC5jbGFzc0xpc3QuYWRkKCdzdGF0dXMnKVxyXG4gIGRpdi5jbGFzc0xpc3QuYWRkKCdnYW1lX2NvbnRhaW5lcicpXHJcblxyXG4gIGRpdi5hcHBlbmRDaGlsZCh3b3JkRWwpXHJcbiAgZGl2LmFwcGVuZENoaWxkKHN0YXR1c0VsKVxyXG4gIGRpdi5hcHBlbmRDaGlsZChidXR0b24pXHJcbiAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChkaXYpXHJcbn1cclxuXHJcbmNvbnN0IHBsYXlfZ2FtZSA9IChnYW1lLCBrZXkpID0+IHtcclxuICBpZiAoZ2FtZS5zdGF0dXMgPT09ICdwbGF5aW5nJykge1xyXG4gICAgZ2FtZS5tYWtlR3Vlc3Moa2V5KVxyXG4gICAgcmVuZGVyX3dvcmQoZ2FtZSlcclxuICB9XHJcbn1cclxuXHJcbmNvbnN0IHN0YXJ0X2dhbWUgPSBhc3luYyAoKSA9PiB7XHJcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBuZXdfcmVxdWVzdC5nZXQoXHJcbiAgICAnaHR0cHM6Ly9wdXp6bGUubWVhZC5pby9wdXp6bGU/d29yZENvdW50PTMnXHJcbiAgKVxyXG5cclxuICBjb25zdCBwdXp6bGUgPSBuZXcgSGFuZ21hbihyZXNwb25zZS5wdXp6bGUsIDMpXHJcblxyXG4gIHJlbmRlckdhbWUocHV6emxlKVxyXG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdrZXlwcmVzcycsIChldmVudCkgPT4ge1xyXG4gICAgcGxheV9nYW1lKHB1enpsZSwgZXZlbnQua2V5KVxyXG4gIH0pXHJcbn1cclxuXHJcbnN0YXJ0X2dhbWUoKVxyXG5cclxuLy8gY29uc3QgZ2V0X2xvY2F0aW9uID0gYXN5bmMgKCkgPT4ge1xyXG4vLyAgIGNvbnN0IGxvY2F0aW9uID0gYXdhaXQgbmV3X3JlcXVlc3QuZ2V0KFxyXG4vLyAgICAgJ2h0dHBzOi8vaXBpbmZvLmlvL2pzb24/dG9rZW49YjliZGM2N2ZjNWYzNWEnXHJcbi8vICAgKVxyXG4vLyAgIGNvbnN0IHBvc2l0aW9uID0gYXdhaXQgbmV3X3JlcXVlc3QuZ2V0KCdodHRwczovL3Jlc3Rjb3VudHJpZXMuY29tL3YzLjEvYWxsJylcclxuXHJcbi8vICAgY29uc3QgY291bnRyeV9jb2RlID0gbG9jYXRpb24uY291bnRyeVxyXG4vLyAgIGNvbnN0IGNvdW50cnkgPSBwb3NpdGlvbj8uZmluZCgoY291bnRyeSkgPT4gY291bnRyeS5jY2EyID09PSBjb3VudHJ5X2NvZGUpXHJcblxyXG4vLyAgIHJldHVybiBgWW91IGFyZSBjdXJyZW50bHkgaW4gJHtsb2NhdGlvbi5jaXR5fSAke2xvY2F0aW9uLnJlZ2lvbn0gJHtjb3VudHJ5Lm5hbWUuY29tbW9ufSFgXHJcbi8vIH1cclxuXHJcbi8vIGdldF9sb2NhdGlvbigpLnRoZW4oY29uc29sZS5sb2cpLmNhdGNoKGNvbnNvbGUuZXJyb3IpXHJcblxyXG5jb25zdCB0eXBld3JpdGVyX2VmZmVjdCA9IGFzeW5jIChjdXJyZW50X3dvcmQpID0+IHtcclxuICBmb3IgKGxldCBpID0gMDsgaSA8IGN1cnJlbnRfd29yZC5sZW5ndGg7IGkrKykge1xyXG4gICAgc3RhdHVzRWwuaW5uZXJIVE1MID0gY3VycmVudF93b3JkLnN1YnN0cmluZygwLCBpICsgMSlcclxuICAgIGF3YWl0IG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiBzZXRUaW1lb3V0KHJlc29sdmUsIDEwMCkpXHJcbiAgfVxyXG59XHJcbiJdLCJuYW1lcyI6WyJIYW5nbWFuIiwiY29uc3RydWN0b3IiLCJ3b3JkIiwicmVtYWluaW5nR3Vlc3NlcyIsInRvTG93ZXJDYXNlIiwic3BsaXQiLCJndWVzc2VkTGV0dGVycyIsInN0YXR1cyIsInB1enpsZSIsImZvckVhY2giLCJsZXR0ZXIiLCJpbmNsdWRlcyIsInN0YXR1c19tZXNzYWdlIiwiam9pbiIsImNhbGNTdGF0dXMiLCJpc0ZpbmlzaGVkIiwiZXZlcnkiLCJzaW5nbGUiLCJndWVzc0xpbWl0IiwibWFrZUd1ZXNzIiwiZ3Vlc3MiLCJpc1VuaXF1ZSIsImlzQmFkV29yZCIsInB1c2giLCJkZWZhdWx0IiwicmVxdWVzdCIsImdldCIsInVybCIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwieG1sUmVxdWVzdCIsIlhNTEh0dHBSZXF1ZXN0Iiwib3BlbiIsImFkZEV2ZW50TGlzdGVuZXIiLCJldmVudCIsInRhcmdldCIsInJlYWR5U3RhdGUiLCJKU09OIiwicGFyc2UiLCJyZXNwb25zZVRleHQiLCJzZW5kIiwibmV3X3JlcXVlc3QiLCJyZXNwb25zZSIsImZldGNoIiwianNvbiIsIkVycm9yIiwiZGl2IiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50Iiwid29yZEVsIiwic3RhdHVzRWwiLCJidXR0b24iLCJyZW5kZXJfd29yZCIsImdhbWUiLCJpbm5lckhUTUwiLCJzcGFuIiwidGV4dENvbnRlbnQiLCJhcHBlbmRDaGlsZCIsInJlbmRlckdhbWUiLCJvbmNsaWNrIiwic3RhcnRfZ2FtZSIsImNsYXNzTGlzdCIsImFkZCIsImJvZHkiLCJwbGF5X2dhbWUiLCJrZXkiLCJ3aW5kb3ciLCJ0eXBld3JpdGVyX2VmZmVjdCIsImN1cnJlbnRfd29yZCIsImkiLCJsZW5ndGgiLCJzdWJzdHJpbmciLCJzZXRUaW1lb3V0Il0sInNvdXJjZVJvb3QiOiIifQ==