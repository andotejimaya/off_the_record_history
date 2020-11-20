// var CNT=0;
$(function(){

  $(document).ready(function(){
    // 設定を読み込んで入力欄を追加する
//    console.log('ready!!!!! id='+chrome.runtime.id);
    chrome.storage.sync.get([chrome.runtime.id], function(val){
      
//      console.log('sync.get='+val[chrome.runtime.id]);
      var patterns = [];
      if (val[chrome.runtime.id]) {
        patterns = JSON.parse(val[chrome.runtime.id]);
      } 

      while (patterns.length < 3) {
        patterns.push({url:"", regexp: "", checked: true});
      }

      for (var i=1; i<patterns.length; i++) {
        $('#list-action-add').click();
      }
    
      var checks = $('.gwt-CheckBox');
      var texts = $('.gwt-TextBox');
      for (var i=0; i<patterns.length; i++) {
        checks[i].checked = patterns[i].checked;
        texts[i].value = patterns[i].url;
      }
    });
  });

  $('#list-action-add').on('click', function(){
    // add input
	var str = ITEM.toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1];
    $('div.header-row:last-child').after(str);
    // add remove event
    $('.btn-remove:last-child')
      .off('click')
      .on('click', remove);
  });
  
  $('.btn-remove').on('click', remove);

  $('#list-action-save').on('click', function(){
//  	console.log('save!!!!');

  	var patterns = [];
  	
  	var checks = $('.gwt-CheckBox');
  	
    $('.gwt-TextBox').each(function(i,v){
      if (0 < v.value.length) {
        var regexp = v.value;
        if (regexp.indexOf('*') > -1) {
          regexp = regexp.replace(/\./g, '\\.');
          regexp = regexp.replace(/\*/g, '.+');
        }
        var checked = checks[i].checked;
//        console.log('checked='+checked);
        
        patterns.push({url: v.value, regexp: regexp, checked: checked});
      }
    });
  	
//  	console.log('patterns='+JSON.stringify(patterns)+' id='+chrome.runtime.id);
	
	chrome.storage.sync.set({[chrome.runtime.id]: JSON.stringify(patterns)}, function(){
	  window.close();
	});

  });
});

var remove = function() {
	var divs = $('div.header-row');
// console.log('divs.length='+divs.length);
	if (1 == divs.length) {
		return false;
	}
// console.log($(this).parent());
	$(this).parent().remove();
};

var ITEM = function(){/*
          <div class="header-row">
            <span class="header-cell"><input type="checkbox" class="gwt-CheckBox" checked></span>
            <span class="expression-input input-append header-cell-name header-cell"><input type="text" class="gwt-TextBox" placeholder="url" ></span>
            <button class="btn-remove r-btn r-btn-link header-cell"><i class="fa fa-times-thin"></i></button>
          </div>
*/};
