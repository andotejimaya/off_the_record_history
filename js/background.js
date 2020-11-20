chrome.history.onVisited.addListener(function(history_item) {
// console.log('onVisited '+JSON.stringify(history_item)+'  id='+chrome.runtime.id);

    chrome.storage.sync.get([chrome.runtime.id], function(val){
     
      var jsonstr = val[chrome.runtime.id];
//      console.log('sync.get@back='+jsonstr);
      if (!jsonstr) {
        return;
      } 
      var patterns = JSON.parse(jsonstr);
      if (0 == patterns.length) {
        return;
      } 

      for (var i=0; i<patterns.length; i++) {
        var pattern = patterns[i];
// console.log('regexp='+pattern.regexp+' if='+history_item.url.match(pattern.regexp));
        if (!pattern.checked) {
          continue;
// console.log('continue url='+pattern.url);
        }

        if (history_item.url.match(pattern.regexp)) {
          chrome.history.deleteUrl({url: history_item.url});
// console.log('delete history!!');
          break;
        }
      }
    });
    
});
