const CART_KEY = 'cart';


export function getCart() {
  if (typeof window === 'undefined') {
    return [];
  }
  const cart = localStorage.getItem(CART_KEY);
  return cart ? JSON.parse(cart) : [];
}

export function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart))
  window.dispatchEvent(new CustomEvent('cartUpdated', {detail: cart}));

}

export function addToCart(product) {
  const cart = getCart();
  const existing = cart.find(item => item.documentId === product.documentId);
  let updatedCart;
  if (existing){
    updatedCart = cart.map(item => {
      return item.documentId === product.documentId ? {...item, quantity: item.quantity + 1} : item;
    }
  );
} else {
  updatedCart = [...cart, {...product, quantity:1}];
}
  saveCart(updatedCart);
}

export function removeFromCart(product) {
  const cart = getCart();
  const existing = cart.find(item => item.documentId === product.documentId);
  let updatedCart;
  if (existing) {
    if (existing.quantity > 1) {
      updatedCart = cart.map(item =>
        item.documentId === product.documentId ? {...item, quantity: item.quantity - 1} : item
      );
    } else {
      updatedCart = cart.filter(item => item.documentId !== product.documentId);
    }
    saveCart(updatedCart);
  }

}

export function clearCart() {
  localStorage.removeItem(CART_KEY);
  window.dispatchEvent(new CustomEvent('cartUpdated', {detail: []}));
}
