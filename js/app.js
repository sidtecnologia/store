document.addEventListener('DOMContentLoaded', () => {

    // Contenedores de productos
    const featuredContainer = document.getElementById('featured-grid');
    const offersGrid = document.getElementById('offers-grid');
    const allFilteredContainer = document.getElementById('all-filtered-products');

    // Secciones de productos para ocultar/mostrar
    const featuredSection = document.getElementById('featured-section');
    const offersSection = document.getElementById('offers-section');
    const filteredSection = document.getElementById('filtered-section');
    const noProductsMessage = document.getElementById('no-products-message');

    // Elementos de la barra de busqueda y su titulo
    const searchInput = document.getElementById('search-input');
    const searchResultsTitle = document.getElementById('search-results-title');
    
    // Elementos del carrusel de categorías
    const categoryCarousel = document.getElementById('category-carousel');
    
    // Elementos del modal de imagen y del carrito
    const imageModal = document.getElementById('imageModal');
    const modalProductName = document.getElementById('modal-product-name');
    const modalProductDescription = document.getElementById('modal-product-description');
    const modalProductPrice = document.getElementById('modal-product-price');
    const modalAddToCartBtn = document.getElementById('modal-add-to-cart-btn');
    const sizeOptionsContainer = document.getElementById('size-options');
    const colorOptionsContainer = document.getElementById('color-options');
    const sizeGroup = document.getElementById('size-group');
    const colorGroup = document.getElementById('color-group');
    const selectionPrompt = document.getElementById('selection-prompt');
    const closeBtn = document.getElementsByClassName('close-button')[0];
    const cartBtn = document.getElementById('cart-btn');
    const cartBadge = document.getElementById('cart-badge');
    const cartModal = document.getElementById('cartModal');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    const checkoutBtn = document.getElementById('checkout-btn');
    const closeCartBtn = document.getElementsByClassName('close-cart-btn')[0];

    // Elementos del carrusel de imágenes del modal
    const carouselImagesContainer = document.getElementById('carousel-images-container');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    // Variables de estado
    let cart = [];
    let currentImageIndex = 0;

    // --- Funciones de Generación y Renderizado ---

    const generateProductCard = (product) => {
        const starIcon = product.featured ? '<span class="special-star featured-icon">⭐</span>' : '';
        const offerIcon = product.isOffer ? '<span class="special-star offer-icon">🔥</span>' : '';

        return `
            <div class="product-card" data-product-id="${product.id}">
                ${starIcon}
                ${offerIcon}
                <img src="${product.image[0]}" alt="${product.name}" class="product-image modal-trigger" 
                     data-id="${product.id}">
                <div class="product-info">
                    <h3 class="product-name">${product.name}</h3>
                    <p class="product-description">${product.description}</p>
                    <p class="product-price">$${product.price.toFixed(3)}</p>
                </div>
            </div>
        `;
    };

    const renderProducts = (container, products) => {
        container.innerHTML = '';
        if (products.length === 0) {
            noProductsMessage.style.display = 'block';
        } else {
            noProductsMessage.style.display = 'none';
            products.forEach(product => {
                container.innerHTML += generateProductCard(product);
            });
        }
    };
    
    // Lista de filtros personalizados para el carrusel
    const carouselFilters = [
        { label: 'Niño', image: 'img/niños.webp', filterKey: 'gender', filterValue: 'niños' },
        { label: 'Hombre', image: 'img/hombres.webp', filterKey: 'gender', filterValue: 'hombre' },
        { label: 'Mujer', image: 'img/mujeres.webp', filterKey: 'gender', filterValue: 'mujer' },
        { label: 'Ropa', image: 'img/vestuario.webp', filterKey: 'category', filterValue: 'ropa' },
        { label: 'Zapatos', image: 'img/zapato.webp', filterKey: 'category', filterValue: 'zapatos' },
        { label: 'Deportivo', image: 'img/deportivo.webp', filterKey: 'style', filterValue: 'deportivo' },
        { label: 'Accesorios', image: 'img/accesorio.webp', filterKey: 'category', filterValue: 'accesorios' },
        { label: 'Ofertas', image: 'img/oferta.webp', filterKey: 'isOffer', filterValue: true },
    ];

    const generateCategoryCarousel = () => {
        categoryCarousel.innerHTML = '';
        carouselFilters.forEach(item => {
            const categoryItem = document.createElement('div');
            categoryItem.className = 'category-item';
            categoryItem.innerHTML = `
                <img src="${item.image}" alt="${item.label}" class="category-image" data-filter-key="${item.filterKey}" data-filter-value="${item.filterValue}">
                <span class="category-name">${item.label}</span>
            `;
            categoryCarousel.appendChild(categoryItem);
        });
    };
    
    // Función central de búsqueda y filtrado
    const filterAndRenderProducts = (productsToFilter, titleText) => {
        if (productsToFilter.length > 0 && productsToFilter !== productData) {
            featuredSection.style.display = 'none';
            offersSection.style.display = 'none';
            filteredSection.style.display = 'block';
            searchResultsTitle.textContent = titleText;
            renderProducts(allFilteredContainer, productsToFilter);
        } else if (productsToFilter.length === 0) {
            featuredSection.style.display = 'none';
            offersSection.style.display = 'none';
            filteredSection.style.display = 'block';
            searchResultsTitle.textContent = titleText;
            renderProducts(allFilteredContainer, productsToFilter);
        } else {
            featuredSection.style.display = 'block';
            offersSection.style.display = 'block';
            filteredSection.style.display = 'none';
            renderProducts(featuredContainer, productData.filter(p => p.featured));
            renderProducts(offersGrid, productData.filter(p => p.isOffer));
        }
    };

    // --- Lógica del Carrusel con Arrastre ---
    let isDragging = false;
    let startPos = 0;
    let scrollLeft = 0;

    categoryCarousel.addEventListener('mousedown', (e) => {
        isDragging = true;
        categoryCarousel.classList.add('grabbing');
        startPos = e.pageX - categoryCarousel.offsetLeft;
        scrollLeft = categoryCarousel.scrollLeft;
    });

    categoryCarousel.addEventListener('mouseleave', () => {
        isDragging = false;
        categoryCarousel.classList.remove('grabbing');
    });

    categoryCarousel.addEventListener('mouseup', () => {
        isDragging = false;
        categoryCarousel.classList.remove('grabbing');
    });

    categoryCarousel.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - categoryCarousel.offsetLeft;
        const walk = (x - startPos) * 1.5;
        categoryCarousel.scrollLeft = scrollLeft - walk;
    });

    // --- Lógica del Carrusel del Modal ---
    const updateCarousel = (images) => {
        carouselImagesContainer.innerHTML = '';
        images.forEach(imgSrc => {
            const imgElement = document.createElement('img');
            imgElement.src = imgSrc;
            imgElement.classList.add('carousel-image');
            carouselImagesContainer.appendChild(imgElement);
        });
        currentImageIndex = 0;
        carouselImagesContainer.style.transform = 'translateX(0)';
    };

    prevBtn.addEventListener('click', () => {
        if (currentImageIndex > 0) {
            currentImageIndex--;
            updateCarouselPosition();
        }
    });

    nextBtn.addEventListener('click', () => {
        const product = productData.find(p => p.id === modalAddToCartBtn.dataset.id);
        if (product && currentImageIndex < product.image.length - 1) {
            currentImageIndex++;
            updateCarouselPosition();
        }
    });

    const updateCarouselPosition = () => {
        const imageWidth = carouselImagesContainer.clientWidth;
        carouselImagesContainer.style.transform = `translateX(-${currentImageIndex * imageWidth}px)`;
    };

    // --- Event Listener para la Búsqueda ---
    searchInput.addEventListener('input', (e) => {
        const searchQuery = e.target.value.toLowerCase();
        
        if (searchQuery.length > 0) {
            const filteredProducts = productData.filter(product => {
                const nameMatch = product.name.toLowerCase().includes(searchQuery);
                const descriptionMatch = product.description.toLowerCase().includes(searchQuery);
                const categoryMatch = product.category.toLowerCase().includes(searchQuery);
                const genderMatch = product.gender ? product.gender.toLowerCase().includes(searchQuery) : false;
                return nameMatch || descriptionMatch || categoryMatch || genderMatch;
            });
            filterAndRenderProducts(filteredProducts, `Resultados para "${searchQuery}"`);
        } else {
            filterAndRenderProducts(productData, "");
        }
    });

    // --- Event Listeners principales ---
    document.addEventListener('click', (e) => {
        // Abre el modal de imagen
        if (e.target.classList.contains('modal-trigger')) {
            const productId = e.target.dataset.id;
            const product = productData.find(p => p.id === productId);

            if (product) {
                // Actualiza los detalles del producto en el modal
                modalProductName.textContent = product.name;
                modalProductDescription.textContent = product.description;
                modalProductPrice.textContent = `$${product.price.toFixed(3)}`;
                modalAddToCartBtn.dataset.id = product.id;
                modalAddToCartBtn.disabled = true;

                // Actualiza el carrusel con las imágenes del producto
                updateCarousel(product.image);

                // Limpia y genera opciones de talla y color
                sizeOptionsContainer.innerHTML = '';
                colorOptionsContainer.innerHTML = '';
                
                // Crea los botones de talla
                if (product.sizes) {
                    product.sizes.forEach(size => {
                        const optionBtn = document.createElement('span');
                        optionBtn.textContent = size;
                        optionBtn.classList.add('option');
                        optionBtn.dataset.type = 'size';
                        optionBtn.dataset.value = size;
                        optionBtn.dataset.product = product.id;
                        sizeOptionsContainer.appendChild(optionBtn);
                    });
                }

                // Crea los botones de color
                if (product.colors) {
                    product.colors.forEach(color => {
                        const optionBtn = document.createElement('span');
                        optionBtn.textContent = color;
                        optionBtn.classList.add('option');
                        optionBtn.dataset.type = 'color';
                        optionBtn.dataset.value = color;
                        optionBtn.dataset.product = product.id;
                        colorOptionsContainer.appendChild(optionBtn);
                    });
                }
                
                // Muestra el prompt y activa la animación al abrir
                selectionPrompt.style.display = 'block';
                sizeGroup.classList.add('needs-selection');
                colorGroup.classList.add('needs-selection');
                
                // Actualiza el estado de las opciones y el botón del carrito
                updateOptionsState(product);
                updateAddToCartButtonState();
                imageModal.style.display = "block";
            }
        }
        
        // Maneja el clic en los botones de categoría
        const carouselItemImage = e.target.closest('.category-image');
        if (carouselItemImage) {
            const filterKey = carouselItemImage.dataset.filterKey;
            const filterValue = carouselItemImage.dataset.filterValue;
            const titleText = carouselItemImage.alt; // Obtener el texto del alt de la imagen

            const filteredProducts = productData.filter(product => {
                const productValue = product[filterKey];
                if (filterKey === 'isOffer') {
                    return productValue === (filterValue === 'true');
                }
                return productValue && productValue.toLowerCase() === filterValue.toLowerCase();
            });
            filterAndRenderProducts(filteredProducts, `${titleText}`);
            searchInput.value = ''; // Limpiar la barra de búsqueda para evitar conflictos
        }

        // Añade al carrito desde el modal (con talla y color)
        if (e.target.id === 'modal-add-to-cart-btn') {
            const productId = e.target.dataset.id;
            const selectedSize = sizeOptionsContainer.querySelector('.option.selected')?.dataset.value || null;
            const selectedColor = colorOptionsContainer.querySelector('.option.selected')?.dataset.value || null;
            addToCart(productId, selectedSize, selectedColor);
            imageModal.style.display = 'none';
        }

        // Aumenta la cantidad
        if (e.target.classList.contains('increase-qty')) {
            const item = cart.find(i => i.id === e.target.dataset.id);
            if (item) {
                item.quantity++;
                updateCart();
            }
        }

        // Disminuye la cantidad
        if (e.target.classList.contains('decrease-qty')) {
            const itemIndex = cart.findIndex(i => i.id === e.target.dataset.id);
            if (itemIndex !== -1) {
                if (cart[itemIndex].quantity > 1) {
                    cart[itemIndex].quantity--;
                } else {
                    cart.splice(itemIndex, 1);
                }
                updateCart();
            }
        }
    });

    // Lógica para seleccionar talla y color en el modal
    document.getElementById('image-modal-caption').addEventListener('click', (e) => {
        if (e.target.classList.contains('option') && !e.target.classList.contains('disabled')) {
            const type = e.target.dataset.type;
            const product = productData.find(p => p.id === e.target.dataset.product);
            const parent = e.target.closest('.product-options');
            
            // Remueve la clase 'selected' de los hermanos
            parent.querySelectorAll('.option').forEach(btn => {
                btn.classList.remove('selected');
            });
            // Añade la clase 'selected' al elemento clickeado
            e.target.classList.add('selected');
            
            updateOptionsState(product);
            updateAddToCartButtonState();
        }
    });

    // Función para actualizar el estado de las opciones y el botón de añadir al carrito
    const updateOptionsState = (product) => {
        const selectedSize = sizeOptionsContainer.querySelector('.option.selected')?.dataset.value;
        const selectedColor = colorOptionsContainer.querySelector('.option.selected')?.dataset.value;
        
        // Deshabilita las opciones que no tienen stock
        document.querySelectorAll('.product-options .option').forEach(option => {
            const type = option.dataset.type;
            const value = option.dataset.value;
            
            // Si hay una talla o color seleccionado, comprueba la combinación
            if (selectedSize || selectedColor) {
                let sizeToCheck = selectedSize;
                let colorToCheck = selectedColor;

                if (type === 'size') {
                    sizeToCheck = value;
                } else if (type === 'color') {
                    colorToCheck = value;
                }

                if (sizeToCheck && colorToCheck) {
                    const stockKey = `${colorToCheck}_${sizeToCheck}`;
                    if (product.stock && product.stock[stockKey] === 0) {
                        option.classList.add('disabled');
                    } else {
                        option.classList.remove('disabled');
                    }
                } else {
                    // Si solo se ha seleccionado uno, no deshabilites, espera la siguiente selección
                    option.classList.remove('disabled');
                }
            } else {
                 // Si no hay nada seleccionado, no deshabilites ninguna opción
                option.classList.remove('disabled');
            }
        });
    };

    const updateAddToCartButtonState = () => {
        const selectedSize = sizeOptionsContainer.querySelector('.option.selected');
        const selectedColor = colorOptionsContainer.querySelector('.option.selected');
        
        if (selectedSize && selectedColor && !selectedSize.classList.contains('disabled') && !selectedColor.classList.contains('disabled')) {
            modalAddToCartBtn.disabled = false;
            // Cuando ambos están seleccionados, quita el mensaje y la animación
            selectionPrompt.style.display = 'none';
            sizeGroup.classList.remove('needs-selection');
            colorGroup.classList.remove('needs-selection');
        } else {
            modalAddToCartBtn.disabled = true;
            // Si falta una selección, asegura que el mensaje y la animación estén visibles
            selectionPrompt.style.display = 'block';
            if (!selectedSize) {
                sizeGroup.classList.add('needs-selection');
            } else {
                sizeGroup.classList.remove('needs-selection');
            }
            if (!selectedColor) {
                colorGroup.classList.add('needs-selection');
            } else {
                colorGroup.classList.remove('needs-selection');
            }
        }
    };
    
    closeBtn.addEventListener('click', () => {
        imageModal.style.display = "none";
    });

    window.addEventListener('click', (event) => {
        if (event.target === imageModal) {
            imageModal.style.display = "none";
        }
    });

    cartBtn.addEventListener('click', () => {
        cartModal.style.display = "block";
        updateCart();
    });

    closeCartBtn.addEventListener('click', () => {
        cartModal.style.display = "none";
    });

    window.addEventListener('click', (e) => {
        if (e.target === cartModal) {
            cartModal.style.display = "none";
        }
    });
    
    // Funciones del carrito
    const updateCart = () => {
        cartItemsContainer.innerHTML = '';
        let total = 0;
        let totalItems = 0;
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p class="empty-cart-msg">Tu carrito está vacío.</p>';
        } else {
            cart.forEach(item => {
                const itemDetails = `
                    ${item.name} 
                    (${item.quantity})
                    ${item.selectedSize ? ` - Talla: ${item.selectedSize}` : ''}
                    ${item.selectedColor ? ` - Color: ${item.selectedColor}` : ''}
                `.trim();
                const cartItemElement = document.createElement('div');
                cartItemElement.classList.add('cart-item');
                cartItemElement.innerHTML = `
                    <span>${itemDetails}</span>
                    <span class="cart-item-price">$${(item.price * item.quantity).toFixed(3)}</span>
                    <div class="cart-item-controls">
                        <button class="decrease-qty" data-id="${item.id}">-</button>
                        <button class="increase-qty" data-id="${item.id}">+</button>
                    </div>
                `;
                cartItemsContainer.appendChild(cartItemElement);
                total += item.price * item.quantity;
                totalItems += item.quantity;
            });
        }
        cartTotalElement.textContent = total.toFixed(3);
        cartBadge.textContent = totalItems;
        if (totalItems > 0) {
            cartBadge.style.display = 'flex';
        } else {
            cartBadge.style.display = 'none';
        }
    };

    const addToCart = (productId, selectedSize = null, selectedColor = null) => {
        const product = productData.find(p => p.id === productId);
        if (product) {
            const existingItem = cart.find(item => 
                item.id === productId && 
                item.selectedSize === selectedSize && 
                item.selectedColor === selectedColor
            );
            if (existingItem) {
                existingItem.quantity++;
            } else {
                cart.push({ ...product, quantity: 1, selectedSize, selectedColor });
            }
            updateCart();
        }
    };

    // ... (el resto de tu código JS)

// --- Lógica de Banner de Instalación para PWA ---
const installBanner = document.getElementById('install-banner');
const installCloseBtn = document.getElementById('install-close-btn');
const installPromptBtn = document.getElementById('install-prompt-btn');
let deferredPrompt; // Variable para almacenar el evento de instalación

window.addEventListener('beforeinstallprompt', (e) => {
    // Evita que el navegador muestre su propio mensaje de instalación
    e.preventDefault();
    // Almacena el evento para poder dispararlo más tarde
    deferredPrompt = e;
    // Muestra el banner de instalación personalizado
    installBanner.classList.add('visible');
});

installPromptBtn.addEventListener('click', (e) => {
    if (deferredPrompt) {
        // Oculta el banner
        installBanner.classList.remove('visible');
        // Muestra el mensaje de instalación del navegador
        deferredPrompt.prompt();
        // Resetea la variable
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('El usuario aceptó la instalación de la PWA');
            } else {
                console.log('El usuario rechazó la instalación de la PWA');
            }
            deferredPrompt = null;
        });
    }
});

installCloseBtn.addEventListener('click', () => {
    installBanner.classList.remove('visible');
});

// Asegúrate de que este bloque de código está dentro del listener DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    // ... todas tus variables y funciones...
    
    // Pega el bloque de código de la PWA aquí
    const installBanner = document.getElementById('install-banner');
    const installCloseBtn = document.getElementById('install-close-btn');
    const installPromptBtn = document.getElementById('install-prompt-btn');
    let deferredPrompt; 

    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
        installBanner.classList.add('visible');
    });

    installPromptBtn.addEventListener('click', (e) => {
        if (deferredPrompt) {
            installBanner.classList.remove('visible');
            deferredPrompt.prompt();
            deferredPrompt.userChoice.then((choiceResult) => {
                if (choiceResult.outcome === 'accepted') {
                    console.log('El usuario aceptó la instalación de la PWA');
                } else {
                    console.log('El usuario rechazó la instalación de la PWA');
                }
                deferredPrompt = null;
            });
        }
    });

    installCloseBtn.addEventListener('click', () => {
        installBanner.classList.remove('visible');
    });
    // Detectar si ya está instalada la PWA
window.addEventListener('DOMContentLoaded', () => {
    if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true) {
        // Oculta el banner si ya está instalada
        const installBanner = document.getElementById('install-banner');
        if (installBanner) {
            installBanner.style.display = 'none';
        }
    }
});

});
    
    checkoutBtn.addEventListener('click', () => {
        if (cart.length === 0) {
            alert("Tu carrito está vacío. Añade productos para hacer tu pedido.");
            return;
        }

        const whatsappNumber = '573123456789';
        let message = "¡Hola! Quisiera hacer el siguiente pedido:\n\n";
        let total = 0;

        cart.forEach(item => {
            const itemDetails = `${item.name}${item.selectedSize ? ` (Talla: ${item.selectedSize})` : ''}${item.selectedColor ? ` (Color: ${item.selectedColor})` : ''}`;
            message += `* ${itemDetails} x${item.quantity} - $${(item.price * item.quantity).toFixed(3)}\n`;
            total += item.price * item.quantity;
        });

        message += `\nTotal: $${total.toFixed(3)}`;
        
        const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappLink, '_blank');
    });
    
    // Renderizado inicial
    renderProducts(featuredContainer, productData.filter(p => p.featured));
    renderProducts(offersGrid, productData.filter(p => p.isOffer));
    generateCategoryCarousel();
    updateCart();
});

