let loop = 1;
while(loop === 0)
{
    update_cart_total();
    console.log(loop);
}

function update_cart_total()
{;
    var cart = document.getElementsByClassName('cart-items')[0];
    var cart_rows = cart.getElementsByClassName('cart-row');
    var cart_total = 0;
    for(x = 0; x < cart_rows.length; x++)
    {
        var cart_row = cart_rows[x];
        var cost_Element = cart_row.getElementsByClassName('cart-price')[0];
        var cost = parseFloat(cost_Element.innerText.replace('$', ''));
        var quantity_element = cart_row.getElementsByClassName('cart-quantity-input')[0];
        var quantity = quantity_element.value;

        if (quantity == 0)
        {
            remove_item(quantity_element)
            update_cart_total();
        }

        cart_total += (cost * quantity);
    }

    cart_total = Math.round(cart_total * 100) / 100
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + cart_total
}

function add_to_cart(event)
{
    var new_row = document.createElement("div");
    new_row.classList.add('cart-row');
    var cart_items = document.getElementsByClassName('cart-items')[0]
    var cart_item_name = cart_items.getElementsByClassName('cart-item-title')
    
    var shopItem = event.parentElement.parentElement
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    var img = shopItem.getElementsByClassName('shop-item-image')[0].src
    console.log(title);
    for(x = 0; x < cart_item_name.length; x++)
    {
        if(cart_item_name[x].innerText === title)
        {
            alert("Already in cart");
            return;
        }
    }

    var cartRowContents = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${img}" width="100" height="100">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button onclick = "remove_item(this)" class="btn btn-danger" type="button">REMOVE</button>
        </div>`

    new_row.innerHTML = cartRowContents
    cart_items.append(new_row);
    update_cart_total();
    // new_row.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
    // new_row.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
}


function purchase()
{
    alert("Thank you for shopping with us");
    var cart = document.getElementsByClassName('cart-items')[0];
    while(cart.hasChildNodes())
    {
        cart.removeChild(cart.firstChild);
    }
     update_cart_total();
}

function remove_item(x)
{
    x.parentElement.parentElement.remove();
    update_cart_total();
}

