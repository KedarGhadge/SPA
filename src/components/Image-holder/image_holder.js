import ko from "knockout";
import template from "text!./image_holder.html";

class ImageHolder {
  constructor(params) {
    // This viewmodel doesn't do anything except pass through the 'route' parameter to the view.
    // You could remove this viewmodel entirely, and define 'nav-bar' as a template-only component.
    // But in most apps, you'll want some viewmodel logic to determine what navigation options appear.
    this.route = params.route;
    const image_input = document.querySelector("#image-input");
    image_input.addEventListener("change", function () {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        const uploaded_image = reader.result;
        document.querySelector(
          "#display-image"
        ).style.backgroundImage = `url(${uploaded_image})`;
      });
      reader.readAsDataURL(this.files[0]);
    });
  }
}

export default { viewModel: ImageHolder, template: template };
