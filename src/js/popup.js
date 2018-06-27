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
}
chrome.runtime.onMessage.addListener(backgoundMsgHandle);




/*---------------------------- main -------------------------------------*/
function reloadRules() {
  $('#rules tbody tr').remove();
  var host = $('#host').val();
  getHostData(host, function(data) {
    var apply = data.apply || false;
    if (apply) {
      turnOnSwitch('apply');
    } else {
      turnOffSwitch('apply');
    }
    var rules = data.rules || [];
    var tbody = $('#rules tbody');
    var lastTr = tbody;
    var str = '';
    var tr, td, div, btn, input;
    for (var i = 0; i < rules.length; i++) {
      tr = $('<tr class="tr">')
      // rule
      td = $('<td class="td text-left">')
      div = $('<div class="cell">')
      div.text(rules[i])
      td.append(div)
      tr.append(td)
      // delete button
      td = $('<td class="td text-center">')
      div = $('<div class="cell">')
      btn = $('<button class="button width-24 rule-delete-btn" data-idx="' + i + '">DEL</button>')
      div.append(btn)
      td.append(div)
      tr.append(td)
      lastTr = lastTr.append(tr)
    }
  })
}

function swapApply() {
  var value = swapSwitch('apply')
  var host = $('#host').val()
  getHostData(host, function(data) {
    data.apply = value
    saveHostData(host, data)
  })
}

function addRule() {
  var host = $('#host').val()
  var rule = $('#rule').val()
  if (!rule) {
    return
  }
  getHostData(host, function(data) {
    data.apply = true
    data.rules.push(rule)
    saveHostData(host, data)
    $('#rule').val('')
    reloadRules()
  })
}

function deleteRule(idx) {
  var host = $('#host').val()
  getHostData(host, function(data) {
    $('#rule').val(data.rules[idx])
    data.rules.splice(idx, 1)
    saveHostData(host, data)
    reloadRules()
  })
}

$(function() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var host = getHost(tabs[0].url)
    $('#host').val(host)
    reloadRules()
  })

  $('#apply').on('click', swapApply)
  $('#add').on('click', addRule)

  $('#rules tbody').on('click', 'button.rule-delete-btn', function() {
    deleteRule($(this).data('idx'))
  })
})

