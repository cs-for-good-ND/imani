var delay = 8000; //set delay between message change (in miliseconds)
   var maxsteps=30; // number of steps to take to change from start color to endcolor
   var stepdelay=40; // time in miliseconds of a single step
   //**Note: maxsteps*stepdelay will be total time in miliseconds of fading effect
   var startcolor= new Array(0,0,0); // start color (red, green, blue)
   var endcolor=new Array(0,0,0); // end color (red, green, blue)


   var fcontent=new Array();
   begintag='<div style="font: normal 20px sans-serif;padding-bottom: 10px; padding-top: 10px; color:black; background-color:rgba(123,128,53,0.85)"; background-position: center; >'; //set opening tag, such as font declarations


   fcontent[0]="When the Missionaries came, we had the land and they had the bible.  They taught us to pray with our eyes closed.  When we opened our eyes, they had the land and we had the bible.<br><br><b>Jomo Kenyatta</b><br><br>";
   fcontent[1]="What is a friend? A single soul living in two bodies.<br><br><b>Aristotle</b><br><br>";
   fcontent[2]="All that is necessary for evil to succeed is that good men do nothing.<br><br><b>Edmund Burke</b><br><br>";
   fcontent[3]="Nothing pains man so much as to think<br><br><b>Dr. Martin Luther King</b><br><br>";
   fcontent[4]="<b>Kalama Sutra</b><br><br><font size=3>Rely not on the teacher-person, but on the teaching. Rely not on the words of the teaching, but on the spirit of the words. Rely not on theory, but on experience. Do not believe in anything simply because you have heard it. Do not believe in traditions because they have been handed down for many generations. Do not believe anything because it is spoken and rumored by many. Do not believe in anything because it is written in your religious books. Do not believe in anything merely on the authority of your teachers and elders. But after observation and analysis, when you find that anything agrees with reason and is conducive to the good and the benefit of one and all, then accept it and live up to it.</font><br><br><b>The Buddha </b><br><br>";
   fcontent[5]="When the missionaries came we had the land and they had the bible.  They taught us to pray with our eyes closed.  When we opened our eyes they had the land and we had the bible.<br><br><b>Jomo Kenyatta</b><br><br>";
   fcontent[6]="Never allow someone to be your Priority while allowing yourself to be their Option<br><br><b>anonymous</b><br><br>";
   fcontent[7]="It's not the load that breaks you down, it's the way you carry it.  <br><br><b>Lena Horne</b><br><br>";
   fcontent[8]="Our lives end as soon as we start being silent about the things that matter<br><br><b>Dr. Martin Luther King</b><br><br>";
   fcontent[9]="<b>Love Thy Neighbor</b><br><br>Thy homeless neighbor, Thy muslim neighbor, Thy black neighbor<br>Thy gay neighbor, Thy white neighbor, Thy jewish neighbor<br>Thy christian neighbor, Thy atheist neighbor, Thy racist neighbor<br>Thy addicted neighbor<br><br><br>";
   fcontent[10]="Now is the accepted time, not tomorrow, not some more convenient season. It is today that our best work can be done and not some future day or future year. It is today that we fit ourselves for the greater usefulness of tomorrow. Today is the seed time, now are the hours of work, and tomorrow comes the harvest and the playtime.<br><br><b>W.E.B. Du Bois</b><br><br>";
   fcontent[11]="Outside show is a poor substitute for inner worth.<br><br><b>Aesop</b><br><br>";
   fcontent[12]="A little less complaint and whining, and a little more dogged work and manly striving, would do us more credit than a thousand civil rights bills.<br><br><b>W.E.B. Du Bois</b>";
   closetag='</div>';

   var fwidth='100%'; //set scroller width
   var fheight='200px'; //set scroller height
   var fadelinks=1;  //should links inside scroller content also fade like text? 0 for no, 1 for yes.

   ///No need to edit below this line/////////////////
   var ie4=document.all&&!document.getElementById;
   var DOM2=document.getElementById;
   var faderdelay=0;
   var index=0;


   /*Rafael Raposo edited function*/    //function to change content
   function changecontent(){
     if (index>=fcontent.length)
       index=0
     if (DOM2){
       document.getElementById("fscroller").style.color="rgb("+startcolor[0]+", "+startcolor[1]+", "+startcolor[2]+")"
       document.getElementById("fscroller").innerHTML=begintag+fcontent[index]+closetag
       if (fadelinks)
         linkcolorchange(1);
       colorfade(1, 15);
     }
     else if (ie4)
       document.all.fscroller.innerHTML=begintag+fcontent[index]+closetag;
     index++
   }


   function linkcolorchange(step){
     var obj=document.getElementById("fscroller").getElementsByTagName("A");
     if (obj.length>0){
       for (i=0;i<obj.length;i++)
         obj[i].style.color=getstepcolor(step);
     }
   }


   var fadecounter;
   function colorfade(step) {
     if(step<=maxsteps) {
       document.getElementById("fscroller").style.color=getstepcolor(step);
       if (fadelinks)
         linkcolorchange(step);
       step++;
       fadecounter=setTimeout("colorfade("+step+")",stepdelay);
     }else{
       clearTimeout(fadecounter);
       document.getElementById("fscroller").style.color="rgb("+endcolor[0]+", "+endcolor[1]+", "+endcolor[2]+")";
       setTimeout("changecontent()", delay);

     }
   }


   function getstepcolor(step) {
     var diff
     var newcolor=new Array(3);
     for(var i=0;i<3;i++) {
       diff = (startcolor[i]-endcolor[i]);
       if(diff > 0) {
         newcolor[i] = startcolor[i]-(Math.round((diff/maxsteps))*step);
       } else {
         newcolor[i] = startcolor[i]+(Math.round((Math.abs(diff)/maxsteps))*step);
       }
     }
     return ("rgb(" + newcolor[0] + ", " + newcolor[1] + ", " + newcolor[2] + ")");
   }

   if (ie4||DOM2)
     document.write('<div id="fscroller" style="width:'+fwidth+';height:'+fheight+'"></div>');

   if (window.addEventListener)
   window.addEventListener("load", changecontent, false)
   else if (window.attachEvent)
   window.attachEvent("onload", changecontent)
   else if (document.getElementById)
   window.onload=changecontent
