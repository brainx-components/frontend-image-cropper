var canvas  = $("#canvas"),
context = canvas.get(0).getContext("2d");
var $image = $('#image');
var $download = $('#download');

  //for images choose
  $('#inputImage').on( 'change', function(){
    processUploadedFile(this.files);
    $('#demoImage').hide();
  });

  function processUploadedFile(fileData)
  {
    ChooseImage(fileData,canvas,context);

    $('#btnCrop').unbind("click").click(function() {
      var croppedImageData = canvas.cropper('getCroppedCanvas');
      var croppedImageUrl = croppedImageData.toDataURL('image/png');
      $('#cropped-image').attr('src', croppedImageUrl);
      $('#download').attr('href', croppedImageUrl);
      $('#cropped-image').show();
      $('#download').show();
      $('.span-div').hide();
    });
    $('#btnCancel').unbind("click").click(function() {
     canvas.cropper('destroy');
     document.getElementById("inputImage").value = "";
   });
    $('#btnReset').unbind("click").click(function() {
     canvas.cropper('reset');
   });
  }

  function ChooseImage(fileData,canvas,context)
  {
    
    if (fileData && fileData[0]) {
      if ( fileData[0].type.match(/^image\//) ) {

        var reader = new FileReader();
        reader.onload = function(evt) {
          canvas.cropper('destroy');
          $('.cropper-canvas img').attr('src', evt.target.result);
          var img = new Image();
          img.onload = function() {
            context.canvas.height = img.height;
            context.canvas.width  = img.width;
            context.drawImage(img, 0, 0);
            var cropper = canvas.cropper({
              // aspectRatio: 4 / 3
            });
          };
          img.src = evt.target.result;
        };
        reader.readAsDataURL(fileData[0]);
      }
      else {
        alert("Invalid file type! Please select an image file.");
      }
    }
    else {
      alert('No file(s) selected.');
    }
  }