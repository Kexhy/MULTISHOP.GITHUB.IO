let storeData = {
  name: 'Mi Tienda',
  description: '',
  address: '',
  phone: '',
  style: 'modern',
  mainColor: '#4CAF50',
  social: {
    facebook: '',
    instagram: '',
    twitter: '',
    whatsapp: ''
  },
  products: [],
  banner: '',
  logo: '',
  logoPosition: 'center'
};

function showSection(sectionId) {
  document.querySelectorAll('.section').forEach(section => {
    section.classList.remove('active');
  });
  document.getElementById(sectionId).classList.add('active');
  
  // Show/hide header based on section
  const header = document.querySelector('.app > header');
  if (sectionId === 'preview') {
    header.style.display = 'none';
  } else {
    header.style.display = 'block';
  }
}

function previewImage(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      const imagePreview = document.getElementById('imagePreview');
      imagePreview.style.backgroundImage = `url(${e.target.result})`;
      imagePreview.innerHTML = '';
    };
    reader.readAsDataURL(file);
  }
}

function updateStoreStyle() {
  const mainColor = document.getElementById('mainColor').value;
  const style = document.getElementById('storeStyle').value;
  
  storeData.mainColor = mainColor;
  storeData.style = style;
  
  // Convert hex to RGB for gradient
  const hex2rgb = (hex) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `${r}, ${g}, ${b}`;
  };
  
  document.documentElement.style.setProperty('--main-color', mainColor);
  document.documentElement.style.setProperty('--main-color-rgb', hex2rgb(mainColor));
  document.getElementById('storePreview').className = `store-preview ${style}`;
  
  updatePreview();
}

function updateStoreInfo() {
  // Update store data
  storeData.name = document.getElementById('storeName').value;
  storeData.description = document.getElementById('storeDescription').value;
  storeData.address = document.getElementById('storeAddress').value;
  storeData.phone = document.getElementById('storePhone').value;
  storeData.social.facebook = document.getElementById('facebookUrl').value;
  storeData.social.instagram = document.getElementById('instagramUrl').value;
  storeData.social.twitter = document.getElementById('twitterUrl').value;
  storeData.social.whatsapp = document.getElementById('whatsappNumber').value;

  // Update preview
  document.getElementById('previewStoreName').textContent = storeData.name;
  document.getElementById('previewDescription').textContent = storeData.description;
  document.getElementById('previewAddress').textContent = storeData.address;
  document.getElementById('previewPhone').textContent = storeData.phone;

  // Update social links
  const facebookLink = document.getElementById('previewFacebook');
  const instagramLink = document.getElementById('previewInstagram');
  const twitterLink = document.getElementById('previewTwitter');
  const whatsappLink = document.getElementById('previewWhatsapp');

  facebookLink.href = storeData.social.facebook;
  instagramLink.href = storeData.social.instagram;
  twitterLink.href = storeData.social.twitter;
  whatsappLink.href = `https://wa.me/${storeData.social.whatsapp.replace(/\D/g, '')}`;

  // Hide empty social links
  facebookLink.style.display = storeData.social.facebook ? 'inline' : 'none';
  instagramLink.style.display = storeData.social.instagram ? 'inline' : 'none';
  twitterLink.style.display = storeData.social.twitter ? 'inline' : 'none';
  whatsappLink.style.display = storeData.social.whatsapp ? 'inline' : 'none';
}

function addProduct() {
  const name = document.getElementById('productName').value;
  const price = document.getElementById('productPrice').value;
  const description = document.getElementById('productDesc').value;
  const imagePreview = document.getElementById('imagePreview');
  const imageUrl = imagePreview.style.backgroundImage.slice(5, -2) || '';
  
  if (!name || !price) {
    alert('Por favor completa al menos el nombre y precio del producto');
    return;
  }
  
  const product = {
    id: Date.now(),
    name,
    price: parseFloat(price),
    description,
    image: imageUrl
  };
  
  storeData.products.push(product);
  
  updateProductList();
  updatePreview();
  
  // Limpiar formulario
  document.getElementById('productName').value = '';
  document.getElementById('productPrice').value = '';
  document.getElementById('productDesc').value = '';
  imagePreview.style.backgroundImage = '';
  imagePreview.innerHTML = '<span>Haga clic para subir imagen</span>';
}

function updateProductList() {
  const productList = document.getElementById('productList');
  productList.innerHTML = '';
  
  storeData.products.forEach(product => {
    const productCard = document.createElement('div');
    productCard.className = 'product-card';
    productCard.innerHTML = `
      ${product.image ? `<img src="${product.image}" alt="${product.name}">` : ''}
      <h3>${product.name}</h3>
      <p>$${product.price.toFixed(2)}</p>
      <p>${product.description}</p>
      <button onclick="deleteProduct(${product.id})">Eliminar</button>
    `;
    productList.appendChild(productCard);
  });
}

function deleteProduct(id) {
  storeData.products = storeData.products.filter(product => product.id !== id);
  updateProductList();
  updatePreview();
}

function previewBanner(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      const bannerPreview = document.getElementById('bannerPreview');
      bannerPreview.style.backgroundImage = `url(${e.target.result})`;
      bannerPreview.innerHTML = '';
      storeData.banner = e.target.result;
      updatePreview();
    };
    reader.readAsDataURL(file);
  }
}

function previewLogo(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      const logoPreview = document.getElementById('logoPreview');
      logoPreview.style.backgroundImage = `url(${e.target.result})`;
      logoPreview.innerHTML = '';
      storeData.logo = e.target.result;
      updatePreview();
    };
    reader.readAsDataURL(file);
  }
}

function setLogoPosition(position) {
  storeData.logoPosition = position;
  document.querySelectorAll('.position-option').forEach(opt => {
    opt.classList.remove('active');
  });
  document.querySelector(`[data-position="${position}"]`).classList.add('active');
  updatePreview();
}

function updatePreview() {
  const previewProducts = document.getElementById('previewProducts');
  previewProducts.innerHTML = '';
  
  storeData.products.forEach(product => {
    const productElement = document.createElement('div');
    productElement.className = 'preview-product';
    productElement.innerHTML = `
      ${product.image ? `<img src="${product.image}" alt="${product.name}">` : ''}
      <h3>${product.name}</h3>
      <p class="price">$${product.price.toFixed(2)}</p>
      <p>${product.description}</p>
      <button onclick="openWhatsApp('${product.name}', '${product.price}')">
        <i class="fab fa-whatsapp"></i> Comprar por WhatsApp
      </button>
    `;
    previewProducts.appendChild(productElement);
  });

  // Update banner and logo
  const previewHeader = document.getElementById('previewHeader');
  previewHeader.innerHTML = `
    ${storeData.banner ? `<img src="${storeData.banner}" class="banner-preview" alt="Banner">` : ''}
    ${storeData.logo ? `<img src="${storeData.logo}" class="logo-preview logo-${storeData.logoPosition}" alt="Logo">` : ''}
    <h1 id="previewStoreName">${storeData.name}</h1>
    <p id="previewDescription" class="store-description">${storeData.description}</p>
  `;
}

function openWhatsApp(productName, productPrice) {
  const whatsappNumber = storeData.social.whatsapp.replace(/\D/g, '');
  if (whatsappNumber) {
    const message = encodeURIComponent(
      `Hola, me interesa comprar: ${productName} - $${productPrice}`
    );
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
  } else {
    alert('No se ha configurado un número de WhatsApp para la tienda');
  }
}

function backToEdit() {
  document.querySelector('.app > header').style.display = 'block';
  showSection('config');
}

function publishStore() {
  const modal = document.getElementById('publishModal');
  modal.classList.add('active');
  
  // Verificar el estado de la tienda
  validateStoreStatus();
}

function validateStoreStatus() {
  const steps = document.querySelectorAll('.step');
  
  // Validar información básica
  const hasBasicInfo = storeData.name && storeData.description;
  steps[0].querySelector('i').style.color = hasBasicInfo ? '#28a745' : '#dc3545';
  
  // Validar productos
  const hasProducts = storeData.products.length > 0;
  steps[1].querySelector('i').style.color = hasProducts ? '#28a745' : '#dc3545';
  
  // Validar diseño
  const hasDesign = storeData.style && storeData.mainColor;
  steps[2].querySelector('i').style.color = hasDesign ? '#28a745' : '#dc3545';
}

function closeModal() {
  const modal = document.getElementById('publishModal');
  modal.classList.remove('active');
}

function confirmPublish() {
  // Get the store preview HTML
  const storePreview = document.getElementById('storePreview').cloneNode(true);
  
  // Remove any edit buttons or controls
  storePreview.querySelectorAll('.preview-actions, .back-button').forEach(el => el.remove());
  
  // Create the payload
  const publishData = {
    html: storePreview.outerHTML,
    css: document.querySelector('link[href="styles.css"]').outerHTML,
    storeData: storeData
  };

  // Show publishing status
  const modal = document.getElementById('publishModal');
  const modalContent = modal.querySelector('.modal-content');
  modalContent.innerHTML = '<h2>Publicando tienda...</h2><div class="publish-progress"><i class="fas fa-spinner fa-spin"></i></div>';

  // Make API request to websim.ai
  fetch('https://websim.ai/api/publish', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      path: '@Roxana/websim-page-linker',
      content: publishData
    })
  })
  .then(response => response.json())
  .then(data => {
    modalContent.innerHTML = `
      <h2>¡Tienda Publicada!</h2>
      <p>Tu tienda ha sido publicada exitosamente.</p>
      <p>Puedes acceder a ella en:</p>
      <a href="https://websim.ai/@Roxana/websim-page-linker" target="_blank" class="published-link">
        Ver tienda publicada <i class="fas fa-external-link-alt"></i>
      </a>
      <div class="publish-actions">
        <button onclick="closeModal()" class="confirm-publish">Cerrar</button>
      </div>
    `;
  })
  .catch(error => {
    modalContent.innerHTML = `
      <h2>Error al publicar</h2>
      <p>Hubo un error al publicar la tienda. Por favor intenta nuevamente.</p>
      <div class="publish-actions">
        <button onclick="confirmPublish()" class="confirm-publish">Reintentar</button>
        <button onclick="closeModal()" class="cancel-publish">Cancelar</button>
      </div>
    `;
  });
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('mainColor').value = storeData.mainColor;
  document.getElementById('storeName').value = storeData.name;
  document.getElementById('storeStyle').value = storeData.style;
  document.getElementById('storeDescription').value = storeData.description;
  document.getElementById('storeAddress').value = storeData.address;
  document.getElementById('storePhone').value = storeData.phone;
  document.getElementById('facebookUrl').value = storeData.social.facebook;
  document.getElementById('instagramUrl').value = storeData.social.instagram;
  document.getElementById('twitterUrl').value = storeData.social.twitter;
  document.getElementById('whatsappNumber').value = storeData.social.whatsapp;
  updatePreview();
  updateStoreInfo();
});