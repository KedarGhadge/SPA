import ko from "knockout";
import template from "text!./image_holder.html";

class ImageHolder {
  constructor(params) {
    // This viewmodel doesn't do anything except pass through the 'route' parameter to the view.
    // You could remove this viewmodel entirely, and define 'nav-bar' as a template-only component.
    // But in most apps, you'll want some viewmodel logic to determine what navigation options appear.
    this.route = params.route;
    var self = this;
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    self.imageWidth = ko.observable("30");
    self.imageHeight = ko.observable("30");
    // const image_input = document.querySelector("#image-input");
    // image_input.addEventListener("change", function () {
    //   const reader = new FileReader();
    //   reader.addEventListener("load", () => {
    //     const uploaded_image = reader.result;
    //     document.querySelector(
    //       "#display-image"
    //     ).style.backgroundImage = `url(${uploaded_image})`;
    //   });
    //   reader.readAsDataURL(this.files[0]);
    // });
    // var c = document.getElementById("myCanvas");
    // var ctx = c.getContext("2d");
    // ctx.font = "30px Arial";
    // ctx.drawImage(reader, 10, 50);
    self.handleImage = function (e) {
      // ctx.font = "30px Arial";
      // ctx.drawImage(reader, 10, 50);
      var reader = new FileReader();
      reader.onload = function (event) {
        var img = new Image();
        img.onload = function () {
          canvas.width = img.width;
          canvas.height = img.height;
          self.imageWidth(img.width);
          self.imageHeight(img.height);
          ctx.drawImage(img, 0, 0);
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(e);
    };

    self.grayscaleImage = function () {
      var imageData = ctx.getImageData(
        0,
        0,
        self.imageWidth(),
        self.imageHeight()
      );
      var data = imageData.data;
      for (var i = 0; i < data.length; i += 4) {
        var avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
        data[i] = avg; // red
        data[i + 1] = avg; // green
        data[i + 2] = avg; // blue
      }
      ctx.putImageData(imageData, 0, 0);
    };
    // self.changeOpacity = function () {
    //   var imageData = ctx.getImageData(
    //     0,
    //     0,
    //     self.imageWidth(),
    //     self.imageHeight()
    //   );
    //   ctx.save();
    //   ctx.globalAlpha = 0.4;
    //   ctx.putImageData(imageData, 0, 0);
    //   ctx.restore();
    // };
    self.invertImage = function () {
      var imageData = ctx.getImageData(
        0,
        0,
        self.imageWidth(),
        self.imageHeight()
      );
      var data = imageData.data;
      for (var i = 0; i < data.length; i += 4) {
        data[i] = 255 - data[i]; // red
        data[i + 1] = 255 - data[i + 1]; // green
        data[i + 2] = 255 - data[i + 2]; // blue
      }
      ctx.putImageData(imageData, 0, 0);
    };
    self.downloadImage = function () {
      var anchor = document.createElement("a");
      anchor.href = canvas.toDataURL("image/png");
      anchor.download = "IMAGE.PNG";
      anchor.click();
      anchor.remove();
      // window.open(
      //   canvas.toDataURL("image/png").replace("image/png", "image/octet-stream")
      // ); // here is the most important part because if you dont replace you will get a DOM 18 exception.
    };
  }

  // grayscaleImage = function () {
  //   var imageData = ctx.getImageData(
  //     0,
  //     0,
  //     self.imageWidth(),
  //     this.imageHeight()
  //   );
  //   var data = imageData.data;
  //   for (var i = 0; i < data.length; i += 4) {
  //     var avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
  //     data[i] = avg; // red
  //     data[i + 1] = avg; // green
  //     data[i + 2] = avg; // blue
  //   }
  //   ctx.putImageData(imageData, 0, 0);
  // };
}

export default { viewModel: ImageHolder, template: template };
