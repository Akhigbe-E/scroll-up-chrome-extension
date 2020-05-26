/** @license
  Simple Auto Scroll | MIT License
  Copyright 2013 Jose Pablo Barrantes

  Permission is hereby granted, free of charge, to any person obtaining a copy of
  this software and associated documentation files (the "Software"), to deal in
  the Software without restriction, including without limitation the rights to
  use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
  of the Software, and to permit persons to whom the Software is furnished to do
  so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in all
  copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE.

 */

let background = chrome.extension.getBackgroundPage();
document.addEventListener('DOMContentLoaded', e => {
    // document.getElementById("version").innerHTML = background.chrome.extension.getVersion();
    init();
    document.getElementById("save_settings").addEventListener('click', save_settings);
}, false);

const viewStatus = (id, msg) => {
    var status = document.getElementById(id);
    status.innerHTML = msg;
    setTimeout(() => { status.innerHTML = ""; }, 1 * 1000);
}

const init = () => {
    chrome.storage.sync.get(['speed'], function (result) {
        document.getElementById("scroll_speed").value = (result.speed || '')

    });
}

const save_settings = () => {
    var speed = document.getElementById("scroll_speed").value + "";
    chrome.storage.sync.set({ speed: speed });
    viewStatus("status_settings", "Options Saved");

    chrome.tabs.query({ active: true }, (tabArray) => {
        chrome.storage.sync.get(['speed'], ({ speed }) => {
            doScroll(tabArray[0], (speed || "1"))
        })
    })
}


let scrollbar = 0;
let wN2scRl;

const resetScroll = tab => {
    chrome.browserAction.setBadgeText({ text: "" });
    let upUrl = "javascript:var wN2scRl;Sa5gNA9k=new Function('clearTimeout(wN2scRl)');document.onkeydown=Sa5gNA9k;Sa5gNA9k();void(wN2scRl=setInterval('if(pageYOffset>0){window.scrollBy(0,0)}else{Sa5gNA9k()}',0))";
    if (upUrl != tab.url) {
        chrome.tabs.executeScript({
            code: upUrl
        });
    }
}

const doScroll = (tab, speed) => {
    scrollbar += 1;
    let intSpeed = parseInt(speed, 10)
    clearInterval(wN2scRl);
    let text;
    if (intSpeed === 0) {
        text = ''
    } else if (intSpeed >= 5) {
        text = 'fast'
    } else {
        text = 'slow'
    }
    chrome.browserAction.setBadgeText({ text });
    wN2scRl = setInterval(() => {
        upurl(tab.id, tab.url);
    }, ((1 / speed)));
}


const upurl = (id, url) => {
    if (url.slice(0, 28) === 'https://twitter.com/messages') {
        chrome.tabs.executeScript({
            code: `document.querySelector(".r-11yh6sk").scrollTop-=1;`
        });
    } else {
        chrome.tabs.executeScript({
            code: `document.documentElement.scrollTop-=1`
        });
    }
}

chrome.extension.onMessage.addListener((request, sender, sendResponse) => {
    if (scrollbar != 0) {
        chrome.tabs.query({ active: true }, tab => {
            clearInterval(wN2scRl);
            resetScroll(tab);
        });
        scrollbar = 0;
    }
    sendResponse();
});

chrome.browserAction.onClicked.addListener(tab => {
    clearInterval(wN2scRl);
});

chrome.tabs.onActivated.addListener(({ tabid, selectinfo }) => {
    clearInterval(wN2scRl);
    chrome.browserAction.setBadgeText({ text: "" });
    scrollbar = 0;
});



