/*---------------------------- storage ---------------------------------*/
function save(obj, cb) {
  chrome.storage.sync.set(obj, cb ? cb : function(){})
}
function load(obj, cb) {
  chrome.storage.sync.get(obj, cb)
}
function getHostData(host, cb) {
  var obj = {}
  obj[host] = {
    apply: false,
    rules: []
  }
  if (!host) {
    return cb && cb(obj)
  }
  load(obj, function(data) {
    data = data[host] || {}
    obj = {
      apply: data.apply || false,
      rules: data.rules || []
    }
    cb && cb(obj)
  })
}
function saveHostData(host, data, cb) {
  var obj = {}
  obj[host] = data
  save(obj, cb)
}
function getOptionData(cb) {
  var obj = {
    __option__: {}
  }
  load(obj, function(data) {
    data = data['__option__'] || {}
    cb && cb(data)
  })
}
function saveOptionData(data, cb) {
  var obj = {
    __option__: data
  }
  save(obj, cb)
}

/*------------------------------ url -----------------------------------*/
function buildAEl(url) {
  var a = document.createElement('a');
  a.href = url;
  return a;
}
function getHost(url) {
  var a = buildAEl(url)
  return a.host
}

/*------------------------------ log -------------------------------------*/
function log () {
  var args = arguments
  getOptionData(function(option) {
    if (option.debug) {
      var argsNew = ['ELET extension log:']
      for (var i = 0; i < args.length; i++) {
        argsNew.push(args[i])
      }
      // argsNew.concat(args)
      console.log.apply(null, argsNew);
    }
  })
}