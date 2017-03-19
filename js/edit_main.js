//edit_main.js
require.config({
	paths:{
		jquery:"jquery-3.1.1.min"
	}
});
require(["jquery","edit","calendar"],function($,e,c){
        new e.Edit();
        $("#edit_footer_left").find("input").click(function(){
           if($("#cal").length==0){
           	 new c.Calendar();
           	 $("#edit_footer").css("height","360px");
           }else{
             $("#cal").remove();
             $("#edit_footer").css("height","104px");
           }         
     });  
})