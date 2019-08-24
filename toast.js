/*
this function uses jquery v3.3.1
and bootstrap v3.3.7 glyphicons
also add this for spinner animation to your css stylesheet:

      @-webkit-keyframes spinner-border {
        to {
          -webkit-transform: rotate(360deg);
          transform: rotate(360deg);
        }
      }
*/

function toast(toastObj) {
    if(typeof toastObj === 'string' || toastObj instanceof String){
      if($('#toast-' + toastObj).length){
        removeToast(toastObj);
      }
    }else{
    var text, duration, width, height, position, bgColor, opacity, fontSize, textColor, fullToast,autoRemove,borderRadius,loadingSpinner,spinnerPosition,spinnerColor,icon,iconSize,id,parent, spinnerThickness,spinnerSize,dim,prepend,addPosClass;
    text=toastObj.text|| '';
    duration=toastObj.duration|| 1000;
    fontSize=toastObj.fontSize|| '15px';
    height=toastObj.height|| "30px";
    width=toastObj.width|| "auto";
    position=toastObj.position|| 'bottom';
    opacity=toastObj.opacity|| 0.8;
    bgColor=toastObj.backGroundColor|| '0,0,0';
    textColor=toastObj.textColor|| "255,255,255";
    borderRadius=toastObj.borderRadius|| "30px";
    autoRemove=(toastObj.autoRemove==undefined)?true:toastObj.autoRemove;
    loadingSpinner=toastObj.loadingSpinner|| false;
    spinnerPosition=toastObj.spinnerPosition|| 'spinner-only';
    spinnerColor=toastObj.spinnerColor||textColor;
    spinnerThickness=toastObj.spinnerThickness||"0.25rem";
    spinnerSize=toastObj.spinnerSize||"2rem";
    icon=toastObj.icon||null;
    iconSize=toastObj.iconSize||'25px';
    id=toastObj.id||null;
    dim=toastObj.dim||false;
    prepend= toastObj.prepend||false;
    parent=toastObj.parent||$('body');
    addPosClass = (prepend == true)?".pre":".app";
    var positionClass;
    if($('#toast-' + id).length == 0){
      switch(position){
        case "bottom":
        position="bottom: 40px;";
        positionClass="bottom-toast";
        break;
        case "top":
          position="top: 70px;";
          positionClass="top-toast";
        break;
        case "middle":
          position = "top: 50%;";
          positionClass="middle-toast";
        break;
        default:
          position="bottom: 80px;";
          positionClass="bottom-toast";
      }
      if(loadingSpinner == true){
       var spinnerContent='<div  class="spinner-border" style="display: inline-block;width:' + spinnerSize + ';height:' + spinnerSize + ';color:rgb(' + spinnerColor + '); vertical-align: text-bottom;border: ' + spinnerThickness + ' solid currentColor;border-right-color: transparent;border-radius: 50%;-webkit-animation: spinner-border .75s linear infinite;animation: spinner-border .75s linear infinite;';
        switch(spinnerPosition){
          case "spinner-only":
            spinnerContent += '"></div>';
            text=spinnerContent;
          break;
          case "left":
            spinnerContent + ='margin-right:5px;"></div>';
            text=spinnerContent+text;
          break;
          case "right":
            spinnerContent += 'margin-left:5px;"></div>';
            text = text + spinnerContent;
          break;
          default:
            spinnerContent += '"></div>';
            text=spinnerContent;
        }
      }
      if(icon != null){
        var iconGlyph,iconColor='255, 255, 255';
        switch (icon){
          case "info":
            iconGlyph='glyphicon glyphicon-info-sign';
            iconColor='53, 157, 255';
          break;
          case "success":
            iconGlyph='glyphicon glyphicon-ok-sign';
            iconColor='72, 255, 48';
          break;
          case "warning":
            iconGlyph = 'glyphicon glyphicon-warning-sign';
            iconColor = '255, 210, 63';
          break;
          case "error":
            iconGlyph = 'glyphicon glyphicon-remove-sign';
            iconColor = '216, 0, 0';
          break;
          default:
            iconGlyph = icon;
        }
        if(toastObj.iconColor != null && toastObj.iconColor != undefined){
          iconColor = toastObj.iconColor;
        }
        text = '<i class="' + iconGlyph + '" style="color: rgb(' + iconColor + ');font-size:' + iconSize + '"></i><div>' + text + '</div>';
      }

      var fullBgColor = 'rgba(' + bgColor + ',' + opacity + ')';
      var toastIndex = (id != null) ? id : parent.children(".toasts"+addPosClass).children('.toast').length;
      var toastLength = parent.children(".toasts" + addPosClass).children('.' + positionClass).length;
      var previousToastBottom,previousToastHeight;
      if(toastLength > 0){
        previousToastBottom = $('.' + positionClass).eq(toastLength - 1).css('bottom');
        previousToastHeight = $('.' + positionClass).eq(toastLength - 1).css('height');
        previousToastBottom = parseInt(previousToastBottom.match(/[0-9]+/));
        previousToastHeight = parseInt(previousToastHeight.match(/[0-9]+/));
        position = 'bottom: ' + (previousToastBottom+previousToastHeight) + 'px;';
      }
        if(prepend == true && parent.children('.toasts.pre').length == 0){
           parent.prepend('<div class="toasts pre"></div>');
        }
         if(prepend == false && parent.children('.toasts.app').length == 0) {
          parent.append('<div class="toasts app"></div>');
        }
      if(parent.prop("tagName") == 'BODY') fullToast = ' <div class="toast ' + positionClass+'" id="toast-' + toastIndex + '" style="pointer-events:none;   width:100%; min-height: ' + height + '; position:fixed;display: none; z-index:9999;font-size: '+fontSize+'; ' + position + ';left: 0; text-align: center;">';
      else fullToast = ' <div class="toast ' + positionClass + '" id="toast-' + toastIndex+'" style="pointer-events:none;   width:'+width+'; min-height: ' + height + ';display: none; z-index:9999;font-size: '+fontSize+'; text-align: center;">';
      fullToast += '<div  style="min-width: ' + width + ';min-height: ' + height + ';display: inline-block; padding: 5px 15px;background-color: ' + fullBgColor + ';border-radius:'+borderRadius+';color: rgb(' + textColor + ');">' + text + '</div></div>';
      parent.children(".toasts"+addPosClass).append(fullToast);
      $(".toast").fadeIn(150);
      if(dim == true && parent.children('.dim-screen').length == 0){
        var dimWidth = parent.width() + parseInt(parent.css('padding-left').replace('px',''))+parseInt(parent.css('padding-right').replace('px',''));
        var dimHeight = parent.height() + parseInt(parent.css('padding-top').replace('px',''))+parseInt(parent.css('padding-bottom').replace('px',''));
       if(parent.css('position')) parent.css('position','relative');
        parent.children('.toasts').before('<div id="toast-' + toastIndex + '-dim-screen" class="dim-screen ' + dimClass + '" style="width: ' + dimWidth + 'px;height: ' + dimHeight + 'px;left: 0px;top: 0px;position:absolute;background-color:black;opacity:0.7;"></div>');
      }
      if(autoRemove == true){
        removeToast(toastIndex);
      }
    }
  }
      function removeToast(toast){
        if($('#toast-' + toast).length){
          setTimeout(() => {
            $('#toast-' + toast).fadeOut(300);
            setTimeout(() => {
              var toastContainer = $('#toast-' + toast).parent();
              if(positionClass == undefined && positionClass == null && $('#toast-' + toast).length){
                var  positionClass = $('#toast-' + toast).attr('class').match(/[a-z]+\-toast/);
              }
              if($('#toast-' + toast).index() == 0 && toastContainer.children('.'+positionClass).length > 1){
                var height = parseInt($('#toast-' + toast).css('height').match(/[0-9]+/));
                $('.' + positionClass).each(function(){
                var thisBottom = parseInt($(this).css('bottom').match(/[0-9]+/));
                var newBottom = (thisBottom-height);
                $(this).css('bottom',newBottom + 'px');
                });
              }
              $('#toast-'+toast).remove();
              if(toastContainer.children().length == 0){
                toastContainer.remove();
              }
              if($('#toast-' + toastIndex + '-dim-screen')){
                $('#toast-' + toastIndex + '-dim-screen').remove();
              }
            },300);
          },duration);
        }
      }
  }