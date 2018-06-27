/*---------------------------- main -------------------------------------*/
function reloadOptions() {
  getOptionData(function(options) {
    if (options.debug)
    {
      turnOnSwitch('debug');
    } else {
      turnOffSwitch('debug');
    }
  })
}

function swapDebug() {
  var value = swapSwitch('debug')
  getOptionData(function(options) {
    options.debug = value
    saveOptionData(options)
  })
}

$(function() {
  reloadOptions()
  $('#debug').on('click', swapDebug)
})