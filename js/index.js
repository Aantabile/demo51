//定义主页面
define(["jquery"],function($){
   var Index=function(){
      this.delAll=$("#list_body_footer button:contains(删除)");
      this.checkboxs=$("#list_body_footer input")[0];
      this.checkAll=$(".list_table input");
      this.del();
      this.select();
      var that=this;
      this.getData();
      if($(".list_table").length==0){
         $("#main").hide()
         .next().show();
      }
   }
   Index.prototype={
   	  del:function(){
   	  	this.delAll.click(function(){
        $(".list_table input:checked")
        .parent().remove();
        if($(".list_table").length==0){
            $("#main").hide()
            .next().show();
         };
       });
   	  },
   	  select:function(){
   	  	$(this.checkboxs).click(function(){
   	  	       var list=$(".list_table :checkbox");
   	  	       for(var x=0;x<list.length;x++){
   	  	         list[x].checked=this.checked;
   	  	       }
   	  	});
   	  	for(var j=0;j<this.checkAll.length;j++){
   	  	  $(this.checkAll[j]).click(function(){
   	  	  	$("#list_body_footer input")[0].checked=false;
            var storage=window.localStorage;
            storage.clean();
    	  	  });
   	  	}
   	  	$("#list_head button").click(function(){
   	  	    $(this).parent().parent().hide();
   	  	    $("#new").show();
   	  	});
   	  },
     getData:function(){
         var storage=window.localStorage,
             key=storage.length+1;
         if(storage){
            for(var i=1;i<key;i++){
              var getLocalData=JSON.parse(localStorage.getItem(i));
              this.render(getLocalData);
            }
          }
        },
      render:function(data){
           var isSatue;
           if(data.statue==0){
             isSatue="未发布";
           }
           if(data.statue==1){
            isSatue="已结束";
           }
           var list_table=$("<div class='list_table'><input type='checkbox'><span>"
                           +data.tit+"</span><span>"
                           +data.day+"</span><span>"
                           + isSatue +"</span>"                    
                           +"<button><a href='page2.html'>编辑</a></button><button>删除</button><button>查看数据</button></div>");
           $("#list_body_footer").before(list_table);
      },
   }
   return{ 
   	  Index:Index
   	}
})