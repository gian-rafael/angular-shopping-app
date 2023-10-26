import { ToastContent } from "src/app/toast.service";

type ToastMessage = Pick<ToastContent, "description">;

const success: { [key: string]: ToastMessage } = {
  addToCart: {
    description: "Item added to cart.",
  },
  addToWishlist: {
    description: "Item added to wishlist.",
  },
  checkout: {
    description: "Your items are on the way.",
  },
  createProduct: {
    description: "Product added successfully.",
  },
  updateProduct: {
    description: "Product updated successfully.",
  },
  login: {
    description: "Logged in successfully",
  },
  register: {
    description: "Registered successfully",
  },
};

export class SuccessMessages {
  static readonly cartConfig: Pick<ToastContent, "title" | "type"> = {
    title: "Cart",
    type: "success",
  };

  static readonly wishlistConfig: Pick<ToastContent, "title" | "type"> = {
    title: "Wishlist",
    type: "success",
  };

  static readonly authConfig: Pick<ToastContent, "title" | "type"> = {
    title: "Auth",
    type: "success",
  };

  static readonly productConfig: Pick<ToastContent, "title" | "type"> = {
    title: "Product",
    type: "success",
  };

  static get addToCart(): ToastContent {
    return { ...success.addToCart, ...SuccessMessages.cartConfig };
  }

  static get addToWishlist(): ToastContent {
    return { ...success.addToWishlist, ...SuccessMessages.wishlistConfig };
  }

  static get checkout(): ToastContent {
    return { ...success.checkout, ...SuccessMessages.cartConfig };
  }

  static get createProduct(): ToastContent {
    return { ...success.createProduct, ...SuccessMessages.productConfig };
  }

  static get updateProduct(): ToastContent {
    return { ...success.updateProduct, ...SuccessMessages.productConfig };
  }

  static get login(): ToastContent {
    return { ...success.login, ...SuccessMessages.authConfig };
  }

  static get register(): ToastContent {
    return { ...success.register, ...SuccessMessages.authConfig };
  }
}

const info: { [key: string]: ToastMessage } = {
  removeFromCart: {
    description: "Item removed from cart.",
  },
  removeFromWishlist: {
    description: "Item removed from wishlist.",
  },
  logout: {
    description: "Logged out successfully",
  },
  deleteProduct: {
    description: "Product deleted successfully",
  },
};

export class InfoMessages {
  static readonly cartConfig: Pick<ToastContent, "title" | "type"> = {
    title: "Cart",
    type: "info",
  };

  static readonly wishlistConfig: Pick<ToastContent, "title" | "type"> = {
    title: "Wishlist",
    type: "info",
  };

  static readonly authConfig: Pick<ToastContent, "title" | "type"> = {
    title: "Auth",
    type: "info",
  };

  static readonly productConfig: Pick<ToastContent, "title" | "type"> = {
    title: "Product",
    type: "info",
  };

  static get removeFromCart() {
    return { ...info.removeFromCart, ...InfoMessages.cartConfig };
  }

  static get removeFromWishlist() {
    return { ...info.removeFromWishlist, ...InfoMessages.wishlistConfig };
  }

  static get logout() {
    return { ...info.logout, ...InfoMessages.authConfig };
  }

  static get deleteProduct() {
    return { ...info.deleteProduct, ...InfoMessages.productConfig };
  }
}

const error: { [key: string]: ToastMessage } = {
  getCartItems: {
    description: "Error while loading the cart items.",
  },
  addToCart: {
    description: "Error while adding item to cart.",
  },
  removeFromCart: {
    description: "Error while removing item from cart.",
  },
  checkout: {
    description: "Error while checking out.",
  },
};

export class ErrorMessages {
  static readonly config: Pick<ToastContent, "title" | "type"> = {
    title: "Error",
    type: "error",
  };

  static readonly defaultErrorDescription = "An error has occured";

  static get addToCart() {
    return { ...error.addToCart, ...ErrorMessages.config };
  }

  static get getCartItems() {
    return { ...error.getCartItems, ...ErrorMessages.config };
  }

  static get removeFromCart() {
    return { ...error.removeFromCart, ...ErrorMessages.config };
  }

  static get checkout() {
    return { ...error.checkout, ...ErrorMessages.config };
  }

  static customError(description?: string) {
    return {
      description: description || ErrorMessages.defaultErrorDescription,
      ...ErrorMessages.config,
    };
  }
}
