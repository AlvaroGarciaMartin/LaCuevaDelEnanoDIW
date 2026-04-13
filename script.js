
/*
  INDICE RAPIDO (script.js)
  - ANIMACION scroll (actividad 5): IntersectionObserver activa clases CSS
    selector objetivo: '#novedades h2, #lmVendido h2, .novedadesProducto, .lmVendidoProducto, #contenedorBannerCentral, #contenedorBannerPie'
    clases que añade: .reveal-on-scroll y .is-visible
  - ANIMACION avanzada Chart.js (actividad 4): ids #ventasChart, #factorDemanda, #valorFactorDemanda, #botonAlternarSerie, #botonAlternarTipo, #valorTipoGrafico
*/

// Obtener elementos del modal
const modal = document.getElementById("modalProducto");
const modalImg = document.getElementById("modalImagen");
const modalTitulo = document.getElementById("modalTitulo");
const modalDescripcion = document.getElementById("modalDescripcion");
const cerrarModal = document.querySelector(".cerrar-modal");

// Descripciones personalizadas (puedes ampliarlas o modificarlas)
const productos = {
  "viajeros al tren": {
    precio: "29,99€",
    jugadores: "2 a 5",
    duracion: "45-60 minutos",
    descripcion: "Construye rutas ferroviarias por todo el mundo y compite por conectar las ciudades más importantes antes que tus rivales.",
    etiquetas: ["Estrategia", "Familia", "Clásico"],
    extras: [
      "Incluye tablero, trenes y billetes de destino.",
      "Alta rejugabilidad con distintas rutas y estrategias.",
      "Ideal para todas las edades.",
      "Edad recomendada: +8 años."
    ]
  },

  "la mansión de la locura": {
    precio: "80,99€",
    jugadores: "1 a 5",
    duracion: "120-180 minutos",
    descripcion: "Juego cooperativo de terror e investigación ambientado en el universo de H.P. Lovecraft. Resuelve misterios y sobrevive al horror.",
    etiquetas: ["Terror", "Cooperativo", "Aventura"],
    extras: [
      "Incluye miniaturas detalladas y mapas modulares.",
      "Aplicación digital con escenarios dinámicos.",
      "Compatible con múltiples expansiones.",
      "Edad recomendada: +14 años."
    ]
  },

  "exploding kittens": {
    precio: "19,99€",
    jugadores: "2 a 5",
    duracion: "15 minutos",
    descripcion: "Juego de cartas rápido y explosivo donde debes evitar sacar un gato bomba. Ríe, esquiva y sabotea a tus amigos.",
    etiquetas: ["Fiesta", "Humor", "Cartas"],
    extras: [
      "Ideal para reuniones familiares o entre amigos.",
      "Tiempo de juego corto y dinámico.",
      "Arte cómico y reglas simples.",
      "Edad recomendada: +7 años."
    ]
  },

  "the island": {
    precio: "34,99€",
    jugadores: "2 a 4",
    duracion: "45 minutos",
    descripcion: "Sobrevive al hundimiento de una isla mientras intentas salvar a tus exploradores de tiburones y monstruos marinos.",
    etiquetas: ["Aventura", "Supervivencia", "Estrategia"],
    extras: [
      "Tablero modular que cambia en cada partida.",
      "Alta interacción entre jugadores.",
      "Componentes de excelente calidad.",
      "Edad recomendada: +8 años."
    ]
  },

  "magic the gathering": {
    precio: "86,00€",
    jugadores: "2 a 6",
    duracion: "120 minutos",
    descripcion: "Adéntrate en el universo de Magic The Gathering con esta expansión de Arena of the Planeswalkers. Lucha en el plano de Zendikar con hechizos y figuras coleccionables.",
    etiquetas: ["Rol", "Aventura", "Fantasía"],
    extras: [
      "Figuras de planeswalkers y cartas de hechizo.",
      "Miniaturas detalladas de héroes y criaturas.",
      "Estrategia táctica con invocaciones y magia.",
      "Edad recomendada: +10 años."
    ]
  },

  "scotland yard": {
    precio: "39,99€",
    jugadores: "3 a 6",
    duracion: "45-60 minutos",
    descripcion: "Un jugador es el escurridizo Mr. X y los demás deben cooperar para atraparlo en las calles de Londres.",
    etiquetas: ["Deducción", "Cooperativo", "Clásico"],
    extras: [
      "Tablero con mapa detallado de Londres.",
      "Fomenta la cooperación y la planificación.",
      "Ideal para jugar en familia.",
      "Edad recomendada: +8 años."
    ]
  },

  "el señor de los anillos": {
    precio: "65,99€",
    jugadores: "1 a 5",
    duracion: "60-120 minutos",
    descripcion: "Embárcate en una aventura épica para destruir el Anillo Único mientras enfrentas a las fuerzas oscuras de Mordor.",
    etiquetas: ["Cooperativo", "Aventura", "Fantasía"],
    extras: [
      "Basado en la obra de J.R.R. Tolkien.",
      "Modo campaña con múltiples escenarios.",
      "Miniaturas detalladas y tablero modular.",
      "Edad recomendada: +14 años."
    ]
  },

  "la guerra del anillo": {
    precio: "75,99€",
    jugadores: "2 a 4",
    duracion: "180-240 minutos",
    descripcion: "Vive la trilogía de El Señor de los Anillos en un juego estratégico que enfrenta las fuerzas de la Luz y la Oscuridad.",
    etiquetas: ["Estrategia", "Fantasía", "Épico"],
    extras: [
      "Gran tablero con mapa de la Tierra Media.",
      "Miniaturas detalladas de ejércitos.",
      "Alta inmersión temática y narrativa.",
      "Edad recomendada: +14 años."
    ]
  },

  "munchkin": {
    precio: "49,99€",
    jugadores: "3 a 6",
    duracion: "60-90 minutos",
    descripcion: "Juego de cartas lleno de humor donde los aventureros compiten por alcanzar el nivel 10 traicionando a sus compañeros.",
    etiquetas: ["Humor", "Cartas", "Rol"],
    extras: [
      "Rápido y caótico con altas dosis de diversión.",
      "Decenas de expansiones disponibles.",
      "Perfecto para grupos grandes.",
      "Edad recomendada: +10 años."
    ]
  },

  "viajes por tierra media": {
    precio: "90,99€",
    jugadores: "1 a 5",
    duracion: "60-120 minutos",
    descripcion: "Explora la Tierra Media en un juego cooperativo con app digital. Lucha contra enemigos y vive una historia épica.",
    etiquetas: ["Aventura", "Cooperativo", "Fantasía"],
    extras: [
      "Aplicación digital que gestiona los escenarios.",
      "Miniaturas y componentes de alta calidad.",
      "Modo campaña con progresión de personajes.",
      "Edad recomendada: +14 años."
    ]
  },

  "la herencia de tía agata": {
    precio: "29,99€",
    jugadores: "2 a 4",
    duracion: "60 minutos",
    descripcion: "Compite por la fortuna de la tía Ágata en este juego clásico de misterio, humor y traición.",
    etiquetas: ["Clásico", "Humor", "Familia"],
    extras: [
      "Perfecto para partidas familiares.",
      "Fácil de aprender y muy entretenido.",
      "Temática cómica y original.",
      "Edad recomendada: +8 años."
    ]
  },

  "throw throw burrito": {
    precio: "18,99€",
    jugadores: "2 a 6",
    duracion: "15 minutos",
    descripcion: "Juego de cartas y reflejos donde los jugadores lanzan burritos de gomaespuma mientras intentan hacer combinaciones.",
    etiquetas: ["Fiesta", "Acción", "Reflejos"],
    extras: [
      "Juego físico y activo.",
      "Rápido y divertido para grupos.",
      "Perfecto para fiestas.",
      "Edad recomendada: +7 años."
    ]
  },

  "unestables unicorns": {
    precio: "20,99€",
    jugadores: "2 a 8",
    duracion: "30-45 minutos",
    descripcion: "Construye tu ejército de unicornios antes que tus rivales. Estrategia, humor y mucha traición.",
    etiquetas: ["Cartas", "Estrategia", "Fantástico"],
    extras: [
      "Ilustraciones adorables y estilo cómico.",
      "Alta interacción entre jugadores.",
      "Expansiones y versiones temáticas.",
      "Edad recomendada: +8 años."
    ]
  },

  "gnome street": {
    precio: "39,99€",
    jugadores: "2 a 4",
    duracion: "45 minutos",
    descripcion: "Construye el barrio de gnomos más próspero gestionando recursos y decorando jardines mágicos.",
    etiquetas: ["Estrategia", "Familiar", "Fantástico"],
    extras: [
      "Componentes coloridos y temáticos.",
      "Perfecto para jugar en familia.",
      "Duración equilibrada y reglas sencillas.",
      "Edad recomendada: +8 años."
    ]
  },

  "monopoli": {
    precio: "19,99€",
    jugadores: "2 a 6",
    duracion: "60-120 minutos",
    descripcion: "El clásico juego de compra y venta de propiedades donde solo uno puede quedarse con todo.",
    etiquetas: ["Clásico", "Estrategia", "Familia"],
    extras: [
      "Versión moderna del juego original.",
      "Ideal para toda la familia.",
      "Rejugabilidad casi infinita.",
      "Edad recomendada: +8 años."
    ]
  }
};

const imagenesProductos = {
  "viajeros al tren": "aventurerosTren.png",
  "la mansión de la locura": "mansion.png",
  "exploding kittens": "explodingKitten.png",
  "the island": "theIsland.png",
  "magic the gathering": "magic.png",
  "scotland yard": "scotland.png",
  "el señor de los anillos": "senorAnillos.png",
  "la guerra del anillo": "guerraAnillo.png",
  "munchkin": "munchking.png",
  "viajes por tierra media": "viajesTierraMedia.png",
  "la herencia de tía agata": "herencia.png",
  "throw throw burrito": "burrito.png",
  "unestables unicorns": "unestableUnicorns.png",
  "gnome street": "gnomeStreet.png",
  "monopoli": "monopoli.png"
};

function normalizarTexto(texto) {
  return (texto || '')
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

function obtenerListaProductos() {
  return Object.entries(productos).map(([nombre, datos]) => ({
    nombre,
    ...datos,
    imagen: imagenesProductos[nombre] || 'logoPrincipal.png'
  }));
}

function filtrarProductos(consulta, listaProductos) {
  const consultaNormalizada = normalizarTexto(consulta);
  if (!consultaNormalizada) return listaProductos;

  return listaProductos.filter((producto) => {
    const nombre = normalizarTexto(producto.nombre);
    const descripcion = normalizarTexto(producto.descripcion);
    const etiquetas = normalizarTexto((producto.etiquetas || []).join(' '));
    return nombre.includes(consultaNormalizada)
      || descripcion.includes(consultaNormalizada)
      || etiquetas.includes(consultaNormalizada);
  });
}

const CART_STORAGE_KEY = 'cueva_cart_v1';
const RATINGS_STORAGE_KEY = 'cueva_ratings_v1';
const FAVORITOS_STORAGE_KEY = 'cueva_favoritos_v1';

function precioTextoANumero(precioTexto) {
  const limpio = (precioTexto || '0')
    .replace('€', '')
    .replace(/\./g, '')
    .replace(',', '.')
    .trim();
  const valor = Number(limpio);
  return Number.isFinite(valor) ? valor : 0;
}

function numeroAPrecioTexto(valor) {
  return `${valor.toFixed(2).replace('.', ',')}€`;
}

function obtenerNombreVisible(claveProducto) {
  return claveProducto
    .split(' ')
    .map((palabra) => palabra.charAt(0).toUpperCase() + palabra.slice(1))
    .join(' ');
}

function cargarCarrito() {
  try {
    const guardado = localStorage.getItem(CART_STORAGE_KEY);
    return guardado ? JSON.parse(guardado) : [];
  } catch {
    return [];
  }
}

function guardarCarrito(carrito) {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(carrito));
}

function cargarValoraciones() {
  try {
    const guardado = localStorage.getItem(RATINGS_STORAGE_KEY);
    return guardado ? JSON.parse(guardado) : {};
  } catch {
    return {};
  }
}

function guardarValoraciones(valoraciones) {
  localStorage.setItem(RATINGS_STORAGE_KEY, JSON.stringify(valoraciones));
}

function cargarFavoritos() {
  try {
    const guardado = localStorage.getItem(FAVORITOS_STORAGE_KEY);
    return guardado ? JSON.parse(guardado) : [];
  } catch {
    return [];
  }
}

function guardarFavoritos(favoritos) {
  localStorage.setItem(FAVORITOS_STORAGE_KEY, JSON.stringify(favoritos));
}

function resolverClaveProducto(nombre) {
  const nombreNormalizado = normalizarTexto(nombre);
  const claves = Object.keys(productos);

  let exacta = claves.find((clave) => normalizarTexto(clave) === nombreNormalizado);
  if (exacta) return exacta;

  exacta = claves.find((clave) => {
    const claveNormalizada = normalizarTexto(clave);
    return claveNormalizada.includes(nombreNormalizado) || nombreNormalizado.includes(claveNormalizada);
  });

  return exacta || null;
}

function obtenerClaveDesdeBotonAnadir(boton) {
  if (boton.id === 'botonAnadirModal' && modalTitulo?.textContent) {
    return resolverClaveProducto(modalTitulo.textContent);
  }

  const contenedor = boton.closest('.catalogo-card, .novedadesProducto, .lmVendidoProducto, .modal-contenido, [class*="p"][class*="f"]');
  if (!contenedor) return null;

  const tituloShop = contenedor.querySelector('.textoProductoShopTitulo');
  if (tituloShop?.textContent) {
    return resolverClaveProducto(tituloShop.textContent);
  }

  const textos = [...contenedor.querySelectorAll('.textoProducto')]
    .map((el) => el.textContent.trim())
    .filter((texto) => texto && !normalizarTexto(texto).includes('precio'));

  if (textos.length) {
    return resolverClaveProducto(textos[0]);
  }

  const imagen = contenedor.querySelector('img[alt]');
  if (imagen?.alt) {
    return resolverClaveProducto(imagen.alt);
  }

  return null;
}

function actualizarContadorCarrito() {
  const cantidadTotal = cargarCarrito().reduce((suma, item) => suma + item.cantidad, 0);

  document.querySelectorAll('.icono-carrito').forEach((icono) => {
    const enlace = icono.closest('a');
    if (!enlace) return;

    let badge = enlace.querySelector('.cart-badge');
    if (!badge) {
      badge = document.createElement('span');
      badge.className = 'cart-badge';
      enlace.appendChild(badge);
    }

    badge.textContent = String(cantidadTotal);
    badge.hidden = cantidadTotal === 0;
    enlace.setAttribute('aria-label', `Carrito con ${cantidadTotal} productos`);
  });
}

function mostrarNotificacionCarrito(texto) {
  let contenedor = document.getElementById('notificacionesCarrito');
  if (!contenedor) {
    contenedor = document.createElement('div');
    contenedor.id = 'notificacionesCarrito';
    contenedor.className = 'cart-toast-container';
    document.body.appendChild(contenedor);
  }

  const aviso = document.createElement('div');
  aviso.className = 'cart-toast';
  aviso.textContent = texto;
  contenedor.appendChild(aviso);

  requestAnimationFrame(() => aviso.classList.add('visible'));

  window.setTimeout(() => {
    aviso.classList.remove('visible');
    aviso.classList.add('exit-right');
    window.setTimeout(() => aviso.remove(), 700);
  }, 5000);
}

function renderizarResumenCarritoDesplegable() {
  const lista = document.getElementById('cartQuickList');
  const total = document.getElementById('cartQuickTotal');
  const vacio = document.getElementById('cartQuickEmpty');
  if (!lista || !total || !vacio) return;

  const carrito = cargarCarrito();
  const totalNumero = carrito.reduce((suma, item) => suma + (item.precioNumero * item.cantidad), 0);
  total.textContent = numeroAPrecioTexto(totalNumero);

  if (!carrito.length) {
    vacio.hidden = false;
    lista.innerHTML = '';
    return;
  }

  vacio.hidden = true;
  lista.innerHTML = carrito.slice(0, 5).map((item) => `
    <article class="cart-quick-item">
      <img src="img/images/pequenas/${item.imagen}" alt="${item.nombre}" loading="lazy">
      <div>
        <p class="cart-quick-name">${item.nombre}</p>
        <p class="cart-quick-meta">${item.cantidad} x ${item.precioTexto}</p>
      </div>
    </article>
  `).join('');
}

function inicializarResumenCarritoDesplegable() {
  const enlacesCarrito = [...document.querySelectorAll('.icono-carrito')]
    .map((icono) => icono.closest('a[href="cart.html"]'))
    .filter(Boolean);
  if (!enlacesCarrito.length) return;

  let backdrop = document.getElementById('cartQuickBackdrop');
  let panel = document.getElementById('cartQuickPanel');

  if (!backdrop || !panel) {
    backdrop = document.createElement('div');
    backdrop.id = 'cartQuickBackdrop';
    backdrop.className = 'cart-quick-backdrop';

    panel = document.createElement('aside');
    panel.id = 'cartQuickPanel';
    panel.className = 'cart-quick-panel';
    panel.innerHTML = `
      <header class="cart-quick-header">
        <h2>Resumen del carrito</h2>
        <button id="cartQuickClose" type="button" aria-label="Cerrar resumen">×</button>
      </header>
      <div id="cartQuickEmpty" class="cart-quick-empty">Tu carrito está vacío.</div>
      <div id="cartQuickList" class="cart-quick-list"></div>
      <footer class="cart-quick-footer">
        <div class="cart-quick-total-row"><span>Total</span><strong id="cartQuickTotal">0,00€</strong></div>
        <a href="cart.html" class="btn btn-warning fw-bold">Ir al carrito</a>
      </footer>
    `;

    document.body.appendChild(backdrop);
    document.body.appendChild(panel);
  }

  const cerrar = () => {
    panel.classList.remove('open');
    backdrop.classList.remove('open');
    document.body.classList.remove('cart-quick-open');
  };

  const abrir = () => {
    renderizarResumenCarritoDesplegable();
    panel.classList.add('open');
    backdrop.classList.add('open');
    document.body.classList.add('cart-quick-open');
  };

  enlacesCarrito.forEach((enlace) => {
    enlace.addEventListener('click', (event) => {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      abrir();
    });
  });

  document.getElementById('cartQuickClose')?.addEventListener('click', cerrar);
  backdrop.addEventListener('click', cerrar);
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') cerrar();
  });

  renderizarResumenCarritoDesplegable();
}

function inicializarBotonSubir() {
  const botonSubir = document.createElement('button');
  botonSubir.type = 'button';
  botonSubir.className = 'scroll-top-btn';
  botonSubir.setAttribute('aria-label', 'Subir al inicio');
  botonSubir.textContent = '↑';
  document.body.appendChild(botonSubir);

  const actualizarVisibilidad = () => {
    if (window.scrollY > 120) {
      botonSubir.classList.add('visible');
      return;
    }
    botonSubir.classList.remove('visible');
  };

  botonSubir.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  window.addEventListener('scroll', actualizarVisibilidad, { passive: true });
  actualizarVisibilidad();
}

function crearWidgetValoracionModal() {
  const modalContenedor = document.querySelector('#modalProducto .modal-contenido');
  if (!modalContenedor || document.getElementById('modalRating')) return;

  const bloque = document.createElement('section');
  bloque.id = 'modalRating';
  bloque.className = 'modal-rating';
  bloque.innerHTML = `
    <h4>Valora este producto</h4>
    <div id="modalRatingStars" class="rating-stars" role="radiogroup" aria-label="Valoración de producto"></div>
    <p id="modalRatingText" class="rating-text">Aún sin valoración.</p>
  `;

  const botonAnadirModal = document.getElementById('botonAnadirModal');
  if (botonAnadirModal) {
    modalContenedor.insertBefore(bloque, botonAnadirModal);
  } else {
    modalContenedor.appendChild(bloque);
  }
}

function actualizarWidgetValoracion(claveProducto) {
  const contenedorEstrellas = document.getElementById('modalRatingStars');
  const textoValoracion = document.getElementById('modalRatingText');
  if (!contenedorEstrellas || !textoValoracion || !claveProducto) return;

  const valoraciones = cargarValoraciones();
  const actual = Number(valoraciones[claveProducto] || 0);

  contenedorEstrellas.innerHTML = '';
  for (let valor = 1; valor <= 5; valor += 1) {
    const boton = document.createElement('button');
    boton.type = 'button';
    boton.className = `rating-star ${valor <= actual ? 'active' : ''}`;
    boton.setAttribute('aria-label', `${valor} estrellas`);
    boton.textContent = '★';

    boton.addEventListener('click', () => {
      const nuevasValoraciones = cargarValoraciones();
      nuevasValoraciones[claveProducto] = valor;
      guardarValoraciones(nuevasValoraciones);
      actualizarWidgetValoracion(claveProducto);
    });

    contenedorEstrellas.appendChild(boton);
  }

  textoValoracion.textContent = actual
    ? `Tu valoración: ${actual}/5`
    : 'Aún sin valoración.';
}

function inicializarInteraccionesTienda() {
  const cuadrante = document.querySelector('.cuadranteTienda');
  const sliderPrecio = document.getElementById('filtroPrecioMax');
  const valorPrecio = document.getElementById('valorFiltroPrecio');
  const selectorOrden = document.getElementById('ordenProductosShop');
  const botonReset = document.getElementById('resetFiltrosShop');
  const textoEstado = document.getElementById('estadoFiltroShop');
  const contadorFavoritos = document.getElementById('contadorFavoritosShop');
  if (!cuadrante || !sliderPrecio || !valorPrecio || !selectorOrden || !botonReset || !textoEstado || !contadorFavoritos) return;

  let favoritos = cargarFavoritos();
  const tarjetas = [...cuadrante.children];

  const obtenerClaveTarjeta = (tarjeta) => {
    const titulo = tarjeta.querySelector('.textoProductoShopTitulo')?.textContent || '';
    return resolverClaveProducto(titulo);
  };

  const obtenerPrecioTarjeta = (tarjeta) => {
    const textoPrecio = tarjeta.querySelector('.textoProductoShop')?.textContent || '0';
    const coincidencia = textoPrecio.match(/[\d.,]+/);
    return coincidencia ? Number(coincidencia[0]) : 0;
  };

  const actualizarFavoritosUI = () => {
    contadorFavoritos.textContent = String(favoritos.length);
    tarjetas.forEach((tarjeta) => {
      const clave = obtenerClaveTarjeta(tarjeta);
      const boton = tarjeta.querySelector('.favorito-btn');
      if (!clave || !boton) return;
      const activo = favoritos.includes(clave);
      boton.classList.toggle('activo', activo);
      boton.setAttribute('aria-label', activo ? 'Quitar de favoritos' : 'Añadir a favoritos');
    });
  };

  tarjetas.forEach((tarjeta) => {
    if (tarjeta.querySelector('.favorito-btn')) return;

    const botonFavorito = document.createElement('button');
    botonFavorito.type = 'button';
    botonFavorito.className = 'favorito-btn';
    botonFavorito.textContent = '❤';

    botonFavorito.addEventListener('click', () => {
      const clave = obtenerClaveTarjeta(tarjeta);
      if (!clave) return;
      if (favoritos.includes(clave)) {
        favoritos = favoritos.filter((item) => item !== clave);
      } else {
        favoritos.push(clave);
      }
      guardarFavoritos(favoritos);
      actualizarFavoritosUI();
    });

    tarjeta.appendChild(botonFavorito);
  });

  const aplicarFiltrosYOrden = () => {
    const precioMaximo = Number(sliderPrecio.value);
    const orden = selectorOrden.value;

    valorPrecio.textContent = `${precioMaximo}€`;

    tarjetas.forEach((tarjeta) => {
      const precio = obtenerPrecioTarjeta(tarjeta);
      tarjeta.style.display = precio <= precioMaximo ? '' : 'none';
    });

    const visibles = tarjetas.filter((tarjeta) => tarjeta.style.display !== 'none');

    visibles.sort((a, b) => {
      const tituloA = (a.querySelector('.textoProductoShopTitulo')?.textContent || '').trim();
      const tituloB = (b.querySelector('.textoProductoShopTitulo')?.textContent || '').trim();
      const precioA = obtenerPrecioTarjeta(a);
      const precioB = obtenerPrecioTarjeta(b);

      if (orden === 'precio-asc') return precioA - precioB;
      if (orden === 'precio-desc') return precioB - precioA;
      if (orden === 'nombre-asc') return tituloA.localeCompare(tituloB);
      if (orden === 'nombre-desc') return tituloB.localeCompare(tituloA);
      return 0;
    });

    visibles.forEach((tarjeta) => cuadrante.appendChild(tarjeta));
    textoEstado.textContent = `Mostrando ${visibles.length} productos con los filtros actuales.`;
  };

  sliderPrecio.addEventListener('input', aplicarFiltrosYOrden);
  selectorOrden.addEventListener('change', aplicarFiltrosYOrden);
  botonReset.addEventListener('click', () => {
    sliderPrecio.value = sliderPrecio.max;
    selectorOrden.value = 'default';
    aplicarFiltrosYOrden();
  });

  actualizarFavoritosUI();
  aplicarFiltrosYOrden();
}

function anadirProductoAlCarrito(claveProducto, cantidad = 1) {
  const producto = productos[claveProducto];
  if (!producto) return;

  const carrito = cargarCarrito();
  const existente = carrito.find((item) => item.clave === claveProducto);

  if (existente) {
    existente.cantidad += cantidad;
  } else {
    carrito.push({
      clave: claveProducto,
      nombre: obtenerNombreVisible(claveProducto),
      precioTexto: producto.precio || '0,00€',
      precioNumero: precioTextoANumero(producto.precio || '0,00€'),
      imagen: imagenesProductos[claveProducto] || 'logoPrincipal.png',
      cantidad
    });
  }

  guardarCarrito(carrito);
  actualizarContadorCarrito();
  renderizarResumenCarritoDesplegable();
  mostrarNotificacionCarrito(`el producto ${obtenerNombreVisible(claveProducto)} ha sido añadido al carrito`);
}

function renderizarPaginaCarrito() {
  const lista = document.getElementById('cartItemsList');
  const subtotal = document.getElementById('cartSubtotal');
  const total = document.getElementById('cartTotal');
  const totalItems = document.getElementById('cartItemsCount');
  const estadoVacio = document.getElementById('cartEmptyState');
  const botonVaciar = document.getElementById('cartClearButton');

  if (!lista || !subtotal || !total || !totalItems || !estadoVacio || !botonVaciar) return;

  let clavePendienteEliminar = null;
  let nombrePendienteEliminar = '';

  let modalEliminar = document.getElementById('modalConfirmarEliminarCarrito');
  if (!modalEliminar) {
    const modalMarkup = `
      <div class="modal fade" id="modalConfirmarEliminarCarrito" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Confirmar eliminación</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
            </div>
            <div class="modal-body" id="modalTextoEliminarCarrito"></div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
              <button type="button" class="btn btn-danger" id="confirmarEliminarCarrito">Eliminar producto</button>
            </div>
          </div>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalMarkup);
    modalEliminar = document.getElementById('modalConfirmarEliminarCarrito');
  }

  const textoModalEliminar = document.getElementById('modalTextoEliminarCarrito');
  const botonConfirmarEliminar = document.getElementById('confirmarEliminarCarrito');
  const instanciaModalEliminar = (typeof bootstrap !== 'undefined' && modalEliminar)
    ? new bootstrap.Modal(modalEliminar)
    : null;

  botonConfirmarEliminar?.addEventListener('click', () => {
    if (!clavePendienteEliminar) return;

    const carrito = cargarCarrito();
    const filtrado = carrito.filter((it) => it.clave !== clavePendienteEliminar);
    guardarCarrito(filtrado);
    actualizarContadorCarrito();
    renderizarResumenCarritoDesplegable();
    pintar();

    clavePendienteEliminar = null;
    nombrePendienteEliminar = '';
    if (instanciaModalEliminar) instanciaModalEliminar.hide();
  });

  const pintar = () => {
    const carrito = cargarCarrito();
    const cantidad = carrito.reduce((suma, item) => suma + item.cantidad, 0);
    const subtotalNumero = carrito.reduce((suma, item) => suma + (item.precioNumero * item.cantidad), 0);

    totalItems.textContent = String(cantidad);
    subtotal.textContent = numeroAPrecioTexto(subtotalNumero);
    total.textContent = numeroAPrecioTexto(subtotalNumero);
    estadoVacio.hidden = carrito.length !== 0;
    botonVaciar.disabled = carrito.length === 0;

    if (!carrito.length) {
      lista.innerHTML = '';
      return;
    }

    lista.innerHTML = carrito.map((item) => `
      <article class="cart-item">
        <img src="img/images/pequenas/${item.imagen}" alt="${item.nombre}" class="cart-item-image" loading="lazy">
        <div class="cart-item-content">
          <h3>${item.nombre}</h3>
          <p class="cart-price">${item.precioTexto}</p>
          <div class="cart-item-controls">
            <button class="cart-control-btn" data-action="decrease" data-key="${item.clave}" type="button" aria-label="Restar unidad">-</button>
            <span class="cart-qty">${item.cantidad}</span>
            <button class="cart-control-btn" data-action="increase" data-key="${item.clave}" type="button" aria-label="Sumar unidad">+</button>
            <button class="cart-remove-btn" data-action="remove" data-key="${item.clave}" type="button">Eliminar</button>
          </div>
        </div>
      </article>
    `).join('');
  };

  lista.addEventListener('click', (event) => {
    const boton = event.target.closest('[data-action][data-key]');
    if (!boton) return;

    const action = boton.getAttribute('data-action');
    const key = boton.getAttribute('data-key');
    const carrito = cargarCarrito();
    const item = carrito.find((it) => it.clave === key);
    if (!item) return;

    if (action === 'increase') item.cantidad += 1;
    if (action === 'decrease') item.cantidad = Math.max(1, item.cantidad - 1);
    if (action === 'remove') {
      clavePendienteEliminar = key;
      nombrePendienteEliminar = item.nombre;
      if (textoModalEliminar) {
        textoModalEliminar.textContent = `¿Seguro que deseas eliminar ${nombrePendienteEliminar} del carrito?`;
      }

      if (instanciaModalEliminar) {
        instanciaModalEliminar.show();
      } else if (window.confirm(`¿Seguro que deseas eliminar ${nombrePendienteEliminar} del carrito?`)) {
        const filtrado = carrito.filter((it) => it.clave !== key);
        guardarCarrito(filtrado);
        actualizarContadorCarrito();
        renderizarResumenCarritoDesplegable();
        pintar();
      }
      return;
    }

    guardarCarrito(carrito);
    actualizarContadorCarrito();
    renderizarResumenCarritoDesplegable();
    pintar();
  });

  botonVaciar.addEventListener('click', () => {
    guardarCarrito([]);
    actualizarContadorCarrito();
    renderizarResumenCarritoDesplegable();
    pintar();
  });

  pintar();
}



// Añadir eventos a todas las imágenes
document.querySelectorAll(".ajustarImagenEnlace img, .novedadesProducto img, .lmVendidoProducto img, .imagenProducto img")
  .forEach((img) => {
    img.addEventListener("click", (e) => {
      if (!modal || !modalImg || !modalTitulo || !modalDescripcion) return;
      e.preventDefault();
      const key = img.alt.toLowerCase();
      const producto = productos[key] || {};

      //modalImg.src = img.src;
      const baseName = img.src.split('/').pop();
      //modalImg.src = "img/images/medianas/" + baseName;

      modalImg.src = "img/images/medianas/" + baseName;
      modalImg.srcset = `
          img/images/medianas/${baseName} 500w,
          img/images/grandes/${baseName} 1200w`;
      modalImg.sizes = "80vw";

      modalTitulo.textContent = img.alt;
      modalDescripcion.textContent = producto.descripcion || "Descripción no disponible.";
      document.getElementById("modalPrecio").textContent = producto.precio || "—";
      document.getElementById("modalJugadores").textContent = producto.jugadores || "—";
      document.getElementById("modalDuracion").textContent = producto.duracion || "—";
      actualizarWidgetValoracion(key);

      // Etiquetas
      const etiquetasDiv = document.getElementById("modalEtiquetas");
      etiquetasDiv.innerHTML = "";
      (producto.etiquetas || []).forEach(tag => {
        const span = document.createElement("span");
        span.textContent = tag;
        etiquetasDiv.appendChild(span);
      });

      // Extras
      const extrasList = document.getElementById("modalExtras");
      extrasList.innerHTML = "";
      (producto.extras || []).forEach(extra => {
        const li = document.createElement("li");
        li.textContent = extra;
        extrasList.appendChild(li);
      });

      modal.classList.remove("oculto");
      document.body.classList.add("modal-abierto");
    });
  });
// Evento para cerrar el modal
if (cerrarModal && modal) {
  cerrarModal.addEventListener("click", () => {
    modal.classList.add("oculto");
    document.body.classList.remove("modal-abierto");
  });
}

// --- Desplegable de Ficha Técnica solo en móviles ---
function activarFichaTecnica() {
  const ficha = document.querySelector(".ficha-tecnica");
  const tituloFicha = ficha?.querySelector(".ficha-titulo");

  if (!ficha || !tituloFicha) return;

  tituloFicha.addEventListener("click", () => {
    if (window.innerWidth <= 500) {
      ficha.classList.toggle("activa");
    }
  });
}
document.addEventListener("click", activarFichaTecnica);

// funcion para cambiar el color del tema

const toggleButton = document.getElementById('modoImagen');

document.addEventListener('DOMContentLoaded', () => {
  const toggleButton = document.getElementById('modoImagen');
  const icon = toggleButton.querySelector('img');

  // Función para aplicar un tema
  function applyTheme(theme) {
    if (theme === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
      icon.src = 'img/icons/encendido.png'; // Icono para tema claro
      icon.alt = 'modo Claro';
    } else {
      document.documentElement.removeAttribute('data-theme');
      icon.src = 'img/icons/apagado.png'; // Icono para tema oscuro
      icon.alt = 'modo Oscuro';
    }
  }

  // Función para alternar el tema
  function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    applyTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  }

  // Asignamos evento click
  toggleButton.addEventListener('click', toggleTheme);

  // Aplicamos el tema guardado al cargar la página
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    applyTheme(savedTheme);
  }
});

//cambiar favicon segun tema
function updateFavicon() {
  const favicon = document.querySelector('link[rel="icon"]') || document.createElement('link');
  favicon.rel = 'icon';
  favicon.type = 'image/png';

  const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  favicon.href = isDark ? 'iconsvec/faviconClaro.png' : 'iconsvec/faviconOscuro.png';

  document.head.appendChild(favicon);
}

updateFavicon();

// Escuchar cambios en preferencia de color
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', updateFavicon);

//abrir imagen modal en nueva pestaña al hacer click
if (modalImg) {
  modalImg.addEventListener("click", () => {
    window.open(modalImg.src.replace("medianas", "grandes"), "_blank");
  });
}

// Carrito: contador global y alta de productos desde botones de compra.
document.addEventListener('DOMContentLoaded', () => {
  actualizarContadorCarrito();
  inicializarResumenCarritoDesplegable();
  renderizarPaginaCarrito();
  inicializarBotonSubir();
  crearWidgetValoracionModal();
  inicializarInteraccionesTienda();

  document.addEventListener('click', (event) => {
    const boton = event.target.closest('.botonAnadir');
    if (!boton) return;
    if (boton.tagName.toUpperCase() === 'A') return;

    const claveProducto = obtenerClaveDesdeBotonAnadir(boton);
    if (!claveProducto) return;

    const cantidadModal = boton.id === 'botonAnadirModal'
      ? Math.max(1, Number(document.getElementById('cantidadProducto')?.value || 1))
      : 1;

    anadirProductoAlCarrito(claveProducto, cantidadModal);
  });
});

// Buscador global: redirige a search.html manteniendo la consulta en la URL.
document.addEventListener('DOMContentLoaded', () => {
  const inputBusqueda = document.getElementById('buscador');
  const botonBusqueda = document.getElementById('botonLupa');
  if (!inputBusqueda || !botonBusqueda) return;

  const listaProductos = obtenerListaProductos();
  const grupoBusqueda = inputBusqueda.closest('.input-group');
  const panelSugerencias = document.createElement('div');
  panelSugerencias.className = 'buscador-sugerencias';
  panelSugerencias.hidden = true;

  if (grupoBusqueda) {
    grupoBusqueda.style.position = 'relative';
    grupoBusqueda.appendChild(panelSugerencias);
  }

  const enviarBusqueda = () => {
    const termino = (inputBusqueda.value || '').trim();
    const destino = termino
      ? `search.html?q=${encodeURIComponent(termino)}`
      : 'search.html';
    window.location.href = destino;
  };

  const pintarSugerencias = () => {
    const termino = (inputBusqueda.value || '').trim();
    if (!termino) {
      panelSugerencias.hidden = true;
      panelSugerencias.innerHTML = '';
      return;
    }

    const coincidencias = filtrarProductos(termino, listaProductos).slice(0, 6);
    if (!coincidencias.length) {
      panelSugerencias.innerHTML = '<div class="sugerencia-vacia">ningun resultado coincide</div>';
      panelSugerencias.hidden = false;
      return;
    }

    panelSugerencias.innerHTML = coincidencias
      .map((producto) => `
        <button class="sugerencia-item" type="button" data-producto="${producto.nombre}">
          <img src="img/images/pequenas/${producto.imagen}" alt="${producto.nombre}">
          <span>${producto.nombre}</span>
        </button>
      `)
      .join('');

    panelSugerencias.hidden = false;
  };

  botonBusqueda.addEventListener('click', enviarBusqueda);
  inputBusqueda.addEventListener('input', pintarSugerencias);

  inputBusqueda.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      panelSugerencias.hidden = true;
      enviarBusqueda();
    }
  });

  panelSugerencias.addEventListener('click', (event) => {
    const boton = event.target.closest('.sugerencia-item');
    if (!boton) return;
    const termino = boton.getAttribute('data-producto') || '';
    inputBusqueda.value = termino;
    panelSugerencias.hidden = true;
    window.location.href = `search.html?q=${encodeURIComponent(termino)}`;
  });

  document.addEventListener('click', (event) => {
    if (!grupoBusqueda?.contains(event.target)) {
      panelSugerencias.hidden = true;
    }
  });
});

// Atajo de teclado: Alt+Shift+T vuelve a la parte superior de la web.
document.addEventListener('keydown', (event) => {
  const etiqueta = (event.target?.tagName || '').toUpperCase();
  const escribiendo = etiqueta === 'INPUT' || etiqueta === 'TEXTAREA' || event.target?.isContentEditable;
  if (escribiendo) return;

  if (event.altKey && event.shiftKey && event.key.toLowerCase() === 't') {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
});

// Página de búsqueda: pinta resultados usando la misma base de productos del modal.
document.addEventListener('DOMContentLoaded', () => {
  const contenedorResultados = document.getElementById('resultadosBusqueda');
  const tituloResultados = document.getElementById('tituloResultadosBusqueda');
  const textoConsulta = document.getElementById('textoConsultaBusqueda');
  if (!contenedorResultados || !tituloResultados || !textoConsulta) return;

  const params = new URLSearchParams(window.location.search);
  const consultaOriginal = (params.get('q') || '').trim();
  const consulta = normalizarTexto(consultaOriginal);

  textoConsulta.textContent = consultaOriginal || 'todas las categorías';

  const listaProductos = obtenerListaProductos();
  const resultados = filtrarProductos(consulta, listaProductos);

  tituloResultados.textContent = `Resultados encontrados: ${resultados.length}`;

  if (!resultados.length) {
    contenedorResultados.innerHTML = '<p class="small">ningun resultado coincide</p>';
    return;
  }

  contenedorResultados.innerHTML = resultados
    .map((producto) => `
      <article class="resultado-item">
        <img class="resultado-imagen" src="img/images/pequenas/${producto.imagen}" alt="${producto.nombre}" loading="lazy">
        <h3>${producto.nombre}</h3>
        <p><strong>Precio:</strong> ${producto.precio || '—'}</p>
        <p>${producto.descripcion || 'Sin descripción disponible.'}</p>
        <a class="btn btn-primary botonAnadir" href="shop.html">Ver en tienda</a>
      </article>
    `)
    .join('');
});

/*
  ANIMACION scroll (actividad 5)
  DÓNDE: este bloque añade la clase .reveal-on-scroll a títulos, tarjetas y banners centrales.
  QUÉ HACE: cuando el elemento entra en viewport, se añade .is-visible para ejecutar la animación CSS.
*/
document.addEventListener('DOMContentLoaded', () => {
  const elementosAnimables = document.querySelectorAll(
    '#novedades h2, #lmVendido h2, .novedadesProducto, .lmVendidoProducto, #contenedorBannerCentral, #contenedorBannerPie'
  );

  if (!elementosAnimables.length) return;

  // Si no existe soporte, dejamos los elementos visibles.
  if (!('IntersectionObserver' in window)) return;

  elementosAnimables.forEach((el) => el.classList.add('reveal-on-scroll'));

  // Observador: cuando el elemento es visible, añade .is-visible y deja de observarlo.
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.22,
    rootMargin: '0px 0px -2% 0px'
  });

  elementosAnimables.forEach((el) => observer.observe(el));
});

/*
  ANIMACION scroll tarjetas (comportamiento personalizado)
  DÓNDE: este bloque solo trabaja sobre .novedadesProducto y usa el punto de referencia #lmVendido.
  QUÉ HACE:
  - Si bajas y te acercas a "Lo más vendido", Novedades se oculta con .tarjeta-scroll-hidden.
  - Si subes, Novedades reaparece quitando esa clase.
*/
document.addEventListener('DOMContentLoaded', () => {
  const tarjetasNovedades = document.querySelectorAll('.novedadesProducto');
  const seccionLmVendido = document.getElementById('lmVendido');
  if (!tarjetasNovedades.length || !seccionLmVendido) return;

  tarjetasNovedades.forEach((tarjeta) => tarjeta.classList.add('tarjeta-scroll-anim'));

  let ultimoScrollY = window.scrollY;

  // Añade la clase que desplaza a la izquierda y desvanece.
  const ocultarNovedades = () => {
    tarjetasNovedades.forEach((tarjeta) => tarjeta.classList.add('tarjeta-scroll-hidden'));
  };

  // Quita la clase para mostrar otra vez las tarjetas.
  const mostrarNovedades = () => {
    tarjetasNovedades.forEach((tarjeta) => tarjeta.classList.remove('tarjeta-scroll-hidden'));
  };

  const actualizarNovedadesPorScroll = () => {
    const scrollActual = window.scrollY;
    const bajando = scrollActual > ultimoScrollY + 2;
    const subiendo = scrollActual < ultimoScrollY - 2;
    // Punto de disparo: antes de llegar visualmente a "Lo más vendido".
    const puntoDisparo = seccionLmVendido.offsetTop - window.innerHeight * 0.55;

    if (scrollActual < puntoDisparo) {
      mostrarNovedades();
      ultimoScrollY = scrollActual;
      return;
    }

    if (bajando) {
      ocultarNovedades();
    }

    if (subiendo) {
      mostrarNovedades();
    }

    ultimoScrollY = scrollActual;
  };

  window.addEventListener('scroll', actualizarNovedadesPorScroll, { passive: true });
  window.addEventListener('resize', actualizarNovedadesPorScroll);
  actualizarNovedadesPorScroll();
});

/*
  ACTIVIDAD 4 - ANIMACIONES AVANZADAS CON LIBRERÍA (Chart.js sobre Canvas)
  DÓNDE:
  - Canvas: #ventasChart
  - Slider: #factorDemanda
  - Texto de valor: #valorFactorDemanda
  - Botón de interacción: #botonAlternarSerie
  QUÉ HACE:
  - Renderiza un gráfico de líneas animado dentro de la web.
  - El slider cambia los datos (factor de demanda) con transición animada.
  - El botón alterna entre dos series base (A/B) con animación.
*/
document.addEventListener('DOMContentLoaded', () => {
  const canvasVentas = document.getElementById('ventasChart');
  const sliderDemanda = document.getElementById('factorDemanda');
  const textoDemanda = document.getElementById('valorFactorDemanda');
  const botonAlternarSerie = document.getElementById('botonAlternarSerie');
  const botonAlternarTipo = document.getElementById('botonAlternarTipo');
  const textoTipoGrafico = document.getElementById('valorTipoGrafico');

  // Si no estamos en la página que contiene la actividad 4, salimos sin hacer nada.
  if (!canvasVentas || !sliderDemanda || !textoDemanda || !botonAlternarSerie || !botonAlternarTipo || !textoTipoGrafico) return;

  // Si Chart.js no está disponible por cualquier motivo, evitamos errores.
  if (typeof Chart === 'undefined') return;

  const etiquetasMeses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago'];

  // Dos series base para demostrar interacción real con cambio de datos.
  const serieBaseA = [18, 24, 28, 22, 35, 31, 40, 44];
  const serieBaseB = [14, 19, 23, 27, 29, 34, 37, 41];

  let usandoSerieA = true;
  const tiposGrafico = ['line', 'bar', 'radar'];
  let indiceTipoActual = 0;

  // Función utilitaria: aplica factor de demanda (% slider) a cada punto de la serie.
  const aplicarFactor = (serie, factor) => serie.map((valor) => Math.round(valor * factor));

  // Factor inicial del slider (100% = 1.0).
  const obtenerFactorActual = () => Number(sliderDemanda.value) / 100;

  // Datos iniciales del gráfico.
  let datosActivos = aplicarFactor(serieBaseA, obtenerFactorActual());
  const reducirMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const chartVentas = new Chart(canvasVentas, {
    type: 'line',
    data: {
      labels: etiquetasMeses,
      datasets: [{
        label: 'Ventas simuladas',
        data: datosActivos,
        tension: 0.35,
        fill: true,
        borderWidth: 3,
        borderColor: '#d9b25d',
        backgroundColor: 'rgba(217, 178, 93, 0.22)',
        pointBackgroundColor: '#d9b25d',
        pointBorderColor: '#121212',
        pointRadius: 4,
        pointHoverRadius: 6
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        duration: reducirMovimiento ? 0 : 900,
        easing: 'easeOutQuart'
      },
      interaction: {
        mode: 'index',
        intersect: false
      },
      plugins: {
        legend: {
          labels: {
            color: '#f5f5f5'
          }
        },
        tooltip: {
          enabled: true
        }
      },
      scales: {
        x: {
          ticks: {
            color: '#f5f5f5'
          },
          grid: {
            color: 'rgba(255,255,255,0.08)'
          }
        },
        y: {
          beginAtZero: true,
          ticks: {
            color: '#f5f5f5'
          },
          grid: {
            color: 'rgba(255,255,255,0.08)'
          }
        }
      }
    }
  });

  // Sincroniza texto de UI con el valor del slider.
  const actualizarTextoDemanda = () => {
    textoDemanda.textContent = `${sliderDemanda.value}%`;
  };

  // Sincroniza texto de UI con el tipo actual de gráfico.
  const actualizarTextoTipo = () => {
    textoTipoGrafico.textContent = tiposGrafico[indiceTipoActual];
  };

  // Reconfigura opciones/dataset según tipo (line, bar, radar).
  const aplicarTipoGrafico = () => {
    const tipo = tiposGrafico[indiceTipoActual];
    chartVentas.config.type = tipo;

    const dataset = chartVentas.data.datasets[0];

    if (tipo === 'radar') {
      dataset.tension = 0.2;
      dataset.fill = true;
      dataset.borderWidth = 2;
      dataset.pointRadius = 3;
      dataset.backgroundColor = 'rgba(217, 178, 93, 0.25)';

      chartVentas.options.scales = {
        r: {
          beginAtZero: true,
          ticks: { color: '#f5f5f5' },
          grid: { color: 'rgba(255,255,255,0.12)' },
          angleLines: { color: 'rgba(255,255,255,0.12)' },
          pointLabels: { color: '#f5f5f5' }
        }
      };
      return;
    }

    if (tipo === 'bar') {
      dataset.tension = 0;
      dataset.fill = false;
      dataset.borderWidth = 2;
      dataset.borderRadius = 7;
      dataset.backgroundColor = 'rgba(217, 178, 93, 0.55)';
      dataset.pointRadius = 0;
    } else {
      dataset.tension = 0.35;
      dataset.fill = true;
      dataset.borderWidth = 3;
      dataset.borderRadius = 0;
      dataset.backgroundColor = 'rgba(217, 178, 93, 0.22)';
      dataset.pointRadius = 4;
    }

    chartVentas.options.scales = {
      x: {
        ticks: { color: '#f5f5f5' },
        grid: { color: 'rgba(255,255,255,0.08)' }
      },
      y: {
        beginAtZero: true,
        ticks: { color: '#f5f5f5' },
        grid: { color: 'rgba(255,255,255,0.08)' }
      }
    };
  };

  // Recalcula la serie y anima la actualización del gráfico.
  const actualizarGrafica = () => {
    const serieActiva = usandoSerieA ? serieBaseA : serieBaseB;
    const factor = obtenerFactorActual();
    chartVentas.data.datasets[0].data = aplicarFactor(serieActiva, factor);
    chartVentas.update();
  };

  // Interacción 1: slider de demanda.
  sliderDemanda.addEventListener('input', () => {
    actualizarTextoDemanda();
    actualizarGrafica();
  });

  // Interacción 2: alternancia A/B.
  botonAlternarSerie.addEventListener('click', () => {
    usandoSerieA = !usandoSerieA;
    actualizarGrafica();
  });

  // Interacción 3: alterna tipo de gráfico entre line -> bar -> radar.
  botonAlternarTipo.addEventListener('click', () => {
    indiceTipoActual = (indiceTipoActual + 1) % tiposGrafico.length;
    aplicarTipoGrafico();
    actualizarTextoTipo();
    actualizarGrafica();
  });

  // Estado inicial visible.
  actualizarTextoDemanda();
  actualizarTextoTipo();
});
