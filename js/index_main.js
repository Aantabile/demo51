//index_main.js
require.config({
	paths:{
		jquery:"jquery-3.1.1.min"
	}
});
require(["jquery","index","task"],function($,i,t){
    new i.Index();
	    var edits=$(".list_table button:contains(编辑)"),
	    storageS=window.sessionStorage;
	    for(var j=0;j<edits.length;j++){
	    	(function(arg){
    	       $(edits[arg]).click(function(){
                   storageS.setItem("msg",arg);
    	       });
    	   })(j)
		  }
    var looks=$(".list_table button:contains(查看数据)");
    for(var n=0;n<looks.length;n++){
		(function(n){
		  $(looks[n]).click(function(){
		  storageS.setItem("msg",n);
		  $("#main").hide().
		  next().next().show();
		});
	 })(n)
    }
    var dels=$(".list_table button:contains(删除)");
    for(var i=0;i<dels.length;i++){
    	(function(arg){
	       $(dels[arg]).click(function(){
				var self=this,
				storage=window.localStorage;
				$(this).css("backgroundColor"," #ee7419");
				new t.Task().confirm({
				content:"确认删除此问卷？",
				handler:function(){
				console.log(arg);
				$(self).parent().remove();
				if($(".list_table").length==0){
				$("#main").hide()
				.next().show();
				}
				},
				width:366,
				height:188,
				title:"提示",
				hasCloseBtn:true,
				skinClassName:null,
				mask:true,
				textBtn:"确认",
				textCal:"取消",
				el:self,
				textTrue:false,
				newBtn:false
				});
	       });
	   })(i)
    }
})