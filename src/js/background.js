/*--------------------- communicate with content ----------------------*/
// send
function sendMessageToContent(msg, cb) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, msg, function(res) {
        if(cb) callback(res);
    });
  });
}
// recv
function backgoundMsgHandle(req, sender, res) {
  switch (req.cmd) {
    case 'SET_BADGE_TEXT':
      setBadgeText(sender.tab.id, req.data.text)
      break;
  }
}
chrome.runtime.onMessage.addListener(backgoundMsgHandle);

function setBadgeText(tabId, text) {
  chrome.browserAction.setBadgeText({tabId: tabId, text: text});
}

