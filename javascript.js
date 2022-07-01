$(function(){
    $("#slider").slider({
        min: 2,
        max: 20,
        slide: function(event, ui){
            $("#circle").height(ui.value);
            $("#circle").width(ui.value);
        }
    });

    //declare variables
        var paint=false;//paintingerasing or not
        var paint_erase="paint";//paiting or erasing
        var canvas=document.getElementById("paint");
        var ctx=canvas.getContext("2d");//get the canvas and context
        var container=$("#container");//get the canvas container
        var mouse={x:0,Y:0};//mouse position

    //onload load saved work from localStorage
    if(localStorage.getItem("imgCanvas")!=null){
        var img=new Image();
        img.onload=function(){
            ctx.drawImage(img, 0, 0)
        }
        img.src=localStorage.getItem("imgCanvas");
    }

    //set drawing parameters (lineWidth, lineJoin, lineCap)
    ctx.lineWidth=2;
    ctx.lineJoin="round";
    ctx.lineCap="round";

    //click inside container
    container.mousedown(function(e){
        paint=true;
        ctx.beginPath();
        mouse.x=e.pageX-this.offsetLeft;
        mouse.y=e.pageY-this.offsetTop;
        ctx.moveTo(mouse.x,mouse.y);
    });

    //move the mouse while holding mouse key
    container.mousemove(function(e){
        mouse.x=e.pageX-this.offsetLeft;
        mouse.y=e.pageY-this.offsetTop;
        if(paint==true){
            if(paint_erase=="paint"){
                ctx.strokeStyle=$("#paintColor").val();//get color input
            }else{
                ctx.strokeStyle="white";//white color
            }
            ctx.lineTo(mouse.x,mouse.y);
            ctx.stroke();
        }
    });

    //mouse up->not paintingerasing anymore
    container.mouseup(function(){
        paint=false;
    });

    //if we leave the container we are not painting anymore
    container.mouseleave(function(){
        paint=false;
    });

    //click on th reset button
    $("#reset").click(function(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        paint_erase="paint";
        $("#erase").removeClass("eraseMode")
    })

    //click on save button
    $("#save").click(function(){
        if(typeof(localStorage)!=null){
            localStorage.setItem("imgCanvas", canvas.toDataURL());
        }else{
            window.alert("Local storage not suported")
        }
    })
    

    //click on erase button
    $("#erase").click(function(){
        if(paint_erase=="paint"){
            paint_erase="erase"
        }else{
            paint_erase="paint"
        }
        $(this).toggleClass("eraseMode")
    });

    //change color input
    $("#paintColor").change(function(){
        $("#circle").css("background-color",$(this).val())
    })

    //change lineWidth using slider 
    $("#slider").slider({
        min: 2,
        max: 20,
        slide: function(event, ui){
            $("#circle").height(ui.value);
            $("#circle").width(ui.value);
            ctx.lineWidth=ui.value;
        }
    });
});