/*------------------------------ switch ----------------------------------*/
function turnOnSwitch(id) {
  var s = $('#' + id)
  var c = s.find("input[type='checkbox']")
  c.prop('checked', true)
  s.addClass('is-checked')
}
function turnOffSwitch(id) {
  var s = $('#' + id)
  var c = s.find("input[type='checkbox']")
  c.prop('checked', false)
  s.removeClass('is-checked')
}
function getSwitchValue(id) {
  return $('#' + id + " input[type='checkbox']").prop('checked')
}
function swapSwitch(id) {
  var value = getSwitchValue(id)
  value ? turnOffSwitch(id) : turnOnSwitch(id)
  return !value
}