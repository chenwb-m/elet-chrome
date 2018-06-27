/*--------------------- communicate with backgound ----------------------*/
// send
function sendMessageToBackground(msg, cb) {
  chrome.runtime.sendMessage(msg, cb ? cb : function(){});
}
// recv
function backgroundMsgHandle(msg, sender, res) {
}
chrome.runtime.onMessage.addListener(backgroundMsgHandle);


/*--------------------- inject inject.js into page -----------------------*/
$((function injectCustomJs() {
  var jsPath = 'js/inject.js';
  var scriptEl = document.createElement('script');
  scriptEl.setAttribute('type', 'text/javascript');
  // get the address like：chrome-extension://ihcokhadfjfchaeagdoclpnjdiokfakg/js/inject.js
  scriptEl.src = chrome.extension.getURL(jsPath);
  scriptEl.onload = function() {
    this.parentNode.removeChild(this);
  };
  document.head.appendChild(scriptEl);
}))

/*-------------------------------- main -----------------------------------*/
// chrome.browserAction.setBadgeBackgroundColor({color: [255, 255, 255, 255]});
var counter = 0
function run (loop) {
  var host = location.host
  getHostData(host, function(data) {
    if (data.apply) {
      var rules = data.rules
      var deleteEls
      log('get rules', rules)
      for (var i = 0; i < rules.length; i++) {
        deleteEls = $(rules[i]).remove()
        // deleteEls = $(rules[i]).css({display: 'none'})
        counter += deleteEls.length
        log('delete', deleteEls.length, 'by rule', rules[i])
      }
      sendMessageToBackground({
        cmd: 'SET_BADGE_TEXT',
        data: {
          host: host,
          text: String(counter == 0 ? '' : counter)
        }
      })
    }
    if (loop) setTimeout(function () {
      run(true)
    }, 3000);
  })
}
// $(function() {
//   run()
// })
run()

var timesCount = 0
function mutationObserverCb (records) {
  run()
  log('MutationObserver callback execute', ++timesCount, 'times')
}
var mutationObserver = null
function startMutationObserver () {
  mutationObserver = new MutationObserver(mutationObserverCb);
  mutationObserver.observe(document, {
    'childList': true,
    'subtree': true,
    // 'attributes': true,
  });
}

startMutationObserver()
