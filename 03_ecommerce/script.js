document.addEventListener("DOMContentLoaded", () => {

    const products = [
        {id: 1, name: "Product1", price: 25.99},
        {id: 2, name: "Product2", price: 20.999},
        {id: 3, name: "Product3", price: 30.89},
    ]

    const cart = JSON.parse(localStorage.getItem("products")) || []

    

    const productList = document.getElementById("product-list")
    const cartItems = document.getElementById("cart-items")
    const emptyCartMessage = document.getElementById("empty-cart")
    const cartTotalDiv = document.getElementById("cart-total")
    const totalPrice = document.getElementById("total-price")
    const checkoutButton = document.getElementById("checkout-btn")
    
    products.map(product => {
        const productDiv = document.createElement("div")
        productDiv.innerHTML = `<span>${product.name} - $${product.price} </span>
        <button data-id="${product.id}">Add to Cart</button>`
        productDiv.classList.add("product")
        productList.appendChild(productDiv)
    })

    //.add-to-cart button
    productList.addEventListener("click", (e) => {
        if(e.target.tagName == "BUTTON") {
            const productId = parseInt(e.target.getAttribute("data-id"))
            const product = products.find(p => p.id == productId)
            addToCart(product) 
            saveProducts()           
        }
    })

    //.add-to-cart
    function addToCart(product) {
        cart.push(product)
        renderCart()
    }

    //.render-cart 
    function renderCart() {
        cartItems.innerText = ""
        let finalPrice = 0
        
        if(cart.length > 0) { 
            
            cartTotalDiv.classList.remove("hidden")
            emptyCartMessage.classList.add("hidden")
            
            cart.forEach((item, index) => {
                finalPrice+=item.price
                

                const cartItem = document.createElement("div")
                cartItem.innerHTML = `${item.name} - $${item.price}`
                cartItem.classList.add("product")
                const deleteBtn = document.createElement("button")
                deleteBtn.innerText = "Delete"
                cartItem.appendChild(deleteBtn)
                cartItems.appendChild(cartItem)
                
                //! delete
                deleteBtn.addEventListener("click", () => deleteProduct(item))
                


                //? totalPrice
                totalPrice.textContent = `$${finalPrice.toFixed(2)}`
                
            })
            
        } else {
            cartTotalDiv.classList.add("hidden")
            emptyCartMessage.classList.remove("hidden")
        }
    }

    

    //. checkout 
    checkoutButton.addEventListener("click", () => {
        cart.length = 0
        //alert("Checkout successfully")
        renderCart()
        localStorage.clear()
    })

    //. Delete Product 
    function deleteProduct(product) {
        const index = cart.findIndex(item => item.id == product.id)
        if(index != -1) {
            cart.splice(index, 1)
            renderCart()
            saveProducts()
        }
    }
    

    //.local storage 
    function saveProducts() {
        localStorage.setItem("products", JSON.stringify(cart))
    }

    renderCart()
    


})