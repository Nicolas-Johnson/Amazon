import { cart, deletItemFromCart, updateCartDeliveryDate } from '../data/cart.js';
import { products } from '../data/products.js';
import formatCurrency from './utils/money.js';
import { deliveryOptions } from '../data/deliveryOptions.js';

let cartItensHtml = '';


cart.forEach((cartItem, index) => {
    const { productId, quantity, deliveryOptionId } = cartItem;

    let productMatch = products.filter((product) => product.id === productId);  

    let { image, name, priceCents } = productMatch[0];

    let deliveryOption = deliveryOptions.filter((item) => item.id === deliveryOptionId);

    const { deliveryDays } = deliveryOption[0];
    const finalDay = dayjs().add(deliveryDays, 'day').format('dddd, MMM D');


    cartItensHtml += `
    <div class="cart-item-container 
    js-cart-item-container-${productId}">
            <div class="delivery-date">
                Delivery date: ${finalDay}
            </div>

            <div class="cart-item-details-grid">
                <img class="product-image"
                src="${image}">

                <div class="cart-item-details">
                <div class="product-name">
                    ${name}
                </div>
                <div class="product-price">
                    ${formatCurrency(priceCents)}
                </div>
                <div class="product-quantity">
                    <span>
                    Quantity: <span class="quantity-label">${quantity}</span>
                    </span>
                    <span class="update-quantity-link link-primary">
                    Update
                    </span>
                    <span class="delete-quantity-link link-primary js-delete-link" data-item-id="${productId}">
                    Delete
                    </span>
                </div>
                </div>

                <div class="delivery-options js-delivery-options">
                    <div class="delivery-options-title">
                        Choose a delivery option:
                    </div>
                    ${deliveryOptionsHTML(productId)}
                </div>
            </div>
            </div>
    `   
});

function deliveryOptionsHTML(productId) {
    let html = '';
    deliveryOptions.forEach(({deliveryDays, priceCents, id}) => {
        const finalPrice = priceCents === 0 ? 'FREE' : formatCurrency(priceCents);
        const finalDay = dayjs().add(deliveryDays, 'day').format('dddd, MMM D');
        html +=
        `
            <div class="delivery-option js-delivery-option" data-product-id="${productId}" data-delivery-date-id="${id}">
                <input type="radio"
                ${id === '1'? 'checked': ''}
                class="delivery-option-input"
                name="delivery-option-${productId}">
                <div>
                <div class="delivery-option-date">
                    ${finalDay}
                </div>
                <div class="delivery-option-price">
                ${finalPrice} - Shipping
                </div>
                </div>
            </div>
        `

    });
    return html;
};

document.querySelector('.js-order-sumary').innerHTML = cartItensHtml;
document.querySelectorAll('.js-delete-link')
    .forEach((link) => {
        link.addEventListener('click', () => {
            const { itemId } = link.dataset;
            deletItemFromCart(itemId);
            document.querySelector(`.js-cart-item-container-${itemId}`).remove();
})});

document.querySelectorAll('.js-delivery-option').forEach((option) => {
    const { productId, deliveryDateId} = option.dataset;
    option.addEventListener('click', () => {
        updateCartDeliveryDate(productId, deliveryDateId);
    })
});