define(["jquery"],function($){
   var Calendar=function(){
         this.btn=false;
         this.cfg={
             width:280,
             height:300, 
             liWidth:40,
             liHeight:30,
             choice:"single",
             max:42,
             min:2

         }
         this.createMain();
         this.init();
         var self=this;
         this.clickNum=0;
         $("#calTitleLeft").click(function(){
           self.btn=true;
           self.preFun();
         });
         $("#calTitleRig").click(function(){
            self.btn=true;
            self.nextFun();
         });
        $("#calBody").click(function(e){
              e=e||window.event;
              var target=e.target||e.srcElement;
              if(target.nodeName=="LI"){
                if(self.cfg.choice=="single"){
                  self.getLiFun(target);
                 }
               }
            })
    }
    Calendar.prototype={
      //点击li时候获取日期
      getLiFun:function(tar){
          var y= $("#calTitleMid span")[0].innerHTML;
          var m=$("#calTitleMid span")[1].innerHTML;
          var d=tar.innerHTML;
          if(tar.className=="li1"){
               m=m-1;
               if(m==0){
                m=12;
                y=parseInt(y)-1;
               }
          }
          if(tar.className=="li2"){
               m=m;
          }
          if(tar.className=="li3"){
               m=parseInt(m)+1
               if(m==13){
                m=1;
                y=parseInt(y)+1;
               };
          }
          $("#edit_footer_left").find("input").val(y+"-"+m+"-"+d);
          $("#cal").remove();
          $("#edit_footer").css("height","104px");
      },
      //点击下月
      nextFun:function(){
         $("#calBody ul li").remove();
         var year=$("#calTitleMid span")[0].innerHTML;
         var month=$("#calTitleMid span")[1].innerHTML;
         if(month<12){
            month++;
         }else{
            month=1;
            year++;
         }
         $("#calTitleMid span")[0].innerHTML=year;
         $("#calTitleMid span")[1].innerHTML=month;
         var std=this.weekStartFun(year,month-1,1);
         var monM=this.monthDay(year,month);
         var preM=this.monthDay(year,month); 
         this.createBody(std,monM,$("#calBody ul"),preM);
      },
      preFun:function(){
         $("#calBody ul li").remove();
        var year=$("#calTitleMid span")[0].innerHTML;
        var month=$("#calTitleMid span")[1].innerHTML;
        if(month>1){
           month--;
        }else{
           month=12;
           year--;
        }
        $("#calTitleMid span")[0].innerHTML=year;
        $("#calTitleMid span")[1].innerHTML=month;   
        var std=this.weekStartFun(year,month-1,1);
        var monM=this.monthDay(year,month);
        var preM=this.monthDay(year,month); 
        this.createBody(std,monM,$("#calBody ul"),preM);
      },
      //初始化日历部分
      init:function(){
         var now=new Date();
         var year=now.getFullYear();
         var month=now.getMonth()+1;
         var day=now.getDate();
         var startDay=this.weekStartFun(year,month-1,1);
         var monthNum=this.monthDay(year,month);
         var preNum=this.monthDay(year,month-1);
         var nextNum=this.monthDay(year,month+1);
         this.createBody(startDay,monthNum,$("#calBody ul"),preNum);
      },
      //创建日历变化部分
      createBody:function(startNum,monNum,parent,preNum){
        var now=new Date();
        var day=now.getDate();
        for(var i=startNum;i>0;i--){
              var li1=$("<li class='li1'></li>");
              li1.html(preNum-i)
              .css("color","rgb(194,194,194)")
              .appendTo(parent);
        }
        for(var j=0;j<monNum;j++){
               var li2=$("<li class='li2'></li>");
               li2.html(j+1)
                  .appendTo(parent);
               for(var x=0;x<li2.length;x++){
                 if(li2[x].innerHTML==day&&this.btn==false){
                    li2[x].style.backgroundColor="#ee7419";
                    li2[x].style.color="#fff";
                 }
               }
        }
        for(var n=0;n<42-startNum-monNum;n++){
           var li3=$("<li class='li3'></li>");
           li3.html(n+1)
              .css("color","rgb(194,194,194)")
              .appendTo(parent);
   
        }
         $("#calBody ul li").css({
             height:this.cfg.liHeight+"px",
             width:this.cfg.liWidth+"px",  
             float:"left",
             listStyle:"none",
             textAlign:"center",
             paddingTop:"10px"
          });
      },
      //计算一月的开始是周几
      weekStartFun:function(yea,mon,day){
         var date=new Date(yea,mon,day);
         return date.getDay();
      },
      //计算一月多少天
      monthDay:function(yea,mon){
           var date=new Date(yea,mon,0);
           return date.getDate();
      },
      //创建日历不变的部分
      createMain:function(){
        var now=new Date(),
            year=now.getFullYear(),
            month=now.getMonth()+1;
        var cal=$("<div id='cal'></div>");
          var calTitle=$("<div id='calTitle'><span id='calTitleLeft'></span>"+
            "<span id='calTitleMid'><span>"+year+"</span>年<span>"+month+"</span>月</span>"+
            "<span id='calTitleRig'></span></div>");
          var calBodyWeek=$("<div id='calBodyWeek'><ul>"+
            "<li>日</li><li>一</li><li>二</li><li>三</li><li>四</li><li>五</li><li>六</li>"+
            "</ul></div>");
          var calBody=$("<div id='calBody'><ul></ul></div>");
          calTitle.appendTo(cal);
          calBodyWeek.appendTo(cal);
          calBody.appendTo(cal);
          cal.appendTo($("#edit_footer"))
             .css({width:this.cfg.width+"px",
              height:this.cfg.height+"px",
              border:"2px solid #eee",
              marginLeft:"207px",
              marginTop:"35px"
          });
          calTitle.css({
             height:this.cfg.liHeight+"px",
             width:this.cfg.Width+"px",  
             backgroundColor:"#ee7419",
             color:"#fff",
             lineHeight:this.cfg.liHeight+"px",
             position:"relative"
          });
          $("#calTitleLeft").css({
              display: "inline-block",
              width:'0',
              height:'0',
              borderTop:'5px solid transparent',
              borderBottom:'5px solid transparent',
              borderRight:'8px solid #fff',
              cursor:'pointer',
              position:'absolute',
              left:'10px',
              top:"10px"
          });
          $("#calTitleRig").css({
              display:'inline-block',
              width:'0',
              height:'0',
              borderTop:'5px solid transparent',
              borderBottom:'5px solid transparent',
              borderLeft:'8px solid #FFF',
              cursor:'pointer',
              position:'absolute',
              right:'10px',
              top:"10px"
          });
          $("#calTitleMid").css({
             display:'inline-block',
             marginLeft:"105px"
          });
          $("#calBodyWeek").css({
             height:this.cfg.liHeight+"px",
             width:this.cfg.Width+"px",  
             lineHeight:this.cfg.liHeight+"px"
          });
          $("#cal ul li").css({
             height:this.cfg.liHeight+"px",
             width:this.cfg.liWidth+"px",  
             float:"left",
             listStyle:"none",
             textAlign:"center",
          });
      },  
    }
    return {
      Calendar:Calendar
    }
})
