export let cart = JSON.parse(localStorage.getItem('cart')) ||
[
    {
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 1,
        deliveryOptionId: '1'
    },
    {
        productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity: 1,
        deliveryOptionId: '2'
    }
];

export const addToCart = (productId) => {
    let matchingItem;
    cart.forEach((item) => {
        if (item.productId === productId) {
            matchingItem = item;
        }
    });
    if (matchingItem) {
        matchingItem.quantity++;
    } else {
        cart.push({
            productId,
            quantity: 1,
            deliveryOptionId: '1'
        });
    }

    cartToLocalStorage();
};

export const hendleCartQuantity = () => {
    let cartQuantity = 0;

    cart.forEach((cartItem) => {
        cartQuantity += cartItem.quantity;
    })

    document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;

};

export const deletItemFromCart = (itemId) => {
    let newCart = cart.filter((item) => item.productId !== itemId);
    cart = newCart;
    cartToLocalStorage();
};

export const cartToLocalStorage = () => {
    localStorage.setItem('cart', JSON.stringify(cart));
};

export const updateCartDeliveryDate = (productId, deliveryOptionId) => {
    let newCart = [];
    cart.forEach((product) => {
        if(product.productId === productId){
            product.deliveryOptionId = deliveryOptionId;
            newCart.push(product);
        } else {
            newCart.push(product);
        }
    }); 
    cart = newCart;
    cartToLocalStorage();
};