import ko from "knockout";
import homeTemplate from "text!./home.html";

class HomeViewModel {
  constructor(route) {
    this.message = ko.observable("Welcome to Sinetta!");
  }

  doSomething() {
    this.message(
      "To see more about us please visit our LinkedI Profile at this link"
    );
  }
}

export default { viewModel: HomeViewModel, template: homeTemplate };
