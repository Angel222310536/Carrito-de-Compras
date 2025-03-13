// Sample course data
const courses = [
    {
      id: 1,
      title: "Principiantes",
      image: "https://storage.googleapis.com/a1aa/image/MAkwq_hqDpe-ixKLmIyMj8V_MjhiH_AZzRr9BE73MnA.jpg",
      price: 15,
      originalPrice: 200,
      instructor: "renepmtz"
    },
    {
      id: 2,
      title: "Huerto en tu casa",
      image: "https://storage.googleapis.com/a1aa/image/pbKDKj1WjtE-lYfCASUm6OzzPkGe6GDlREDEP357DEw.jpg",
      price: 15,
      originalPrice: 200,
      instructor: "renepmtz"
    },
    {
      id: 3,
      title: "Decoración con productos de tu hogar",
      image: "https://storage.googleapis.com/a1aa/image/IQSrpBB8Sk8FaYpKVj-n2-fmbV-yPZmDyqL9PkXSOm8.jpg",
      price: 15,
      originalPrice: 200,
      instructor: "renepmtz"
    },
    {
      id: 4,
      title: "Diseño Web para Principiantes",
      image: "https://storage.googleapis.com/a1aa/image/p5j2lFeS9bLHCQ3mylnHaeSV6pPO2sq2qp_Rn8VmqHw.jpg",
      price: 15,
      originalPrice: 200,
      instructor: "renepmtz"
    },
    {
      id: 5,
      title: "Cocina Saludable",
      image: "https://storage.googleapis.com/a1aa/image/WZWrNJMm2jqwQlsPhM8UIbLfbOvDMpKN-RqyqA3FHwo.jpg",
      price: 15,
      originalPrice: 200,
      instructor: "renepmtz"
    },
    {
      id: 6,
      title: "Clases de Guitarra",
      image: "https://storage.googleapis.com/a1aa/image/NF-dwbXdBKKn0RLTmCgOdG1NCPlG7-r9aP6A83BpONQ.jpg",
      price: 15,
      originalPrice: 200,
      instructor: "renepmtz"
    },
    {
      id: 7,
      title: "Yoga para Principiantes",
      image: "https://storage.googleapis.com/a1aa/image/i1ZEB3W7Xp45-PLjYLtMdb7cWkuVfb2q2wv1RM6ygf0.jpg",
      price: 15,
      originalPrice: 200,
      instructor: "renepmtz"
    },
    {
      id: 8,
      title: "Fotografía Digital",
      image: "https://definicion.de/wp-content/uploads/2023/04/camara-digital.jpg",
      price: 15,
      originalPrice: 200,
      instructor: "renepmtz"
    },
    {
      id: 9,
      title: "Marketing Digital",
      image: "https://www.prospectfactory.com.mx/wp-content/uploads/2019/03/Que-es-Marketing-Digital-1000x500.jpg",
      price: 15,
      originalPrice: 200,
      instructor: "renepmtz"
    }
  ];
  
  let cart = [];
  
  // Render courses
  function renderCourses(filteredCourses = courses) {
    const courseList = document.getElementById('course-list');
    courseList.innerHTML = '';
    filteredCourses.forEach(course => {
      const courseCard = document.createElement('div');
      courseCard.className = 'bg-white p-4 rounded-lg shadow-md';
      courseCard.innerHTML = `
        <img alt="Product image" class="w-full h-48 object-cover rounded-t-lg" src="${course.image}">
        <div class="p-4">
          <h2 class="text-lg font-semibold">${course.title}</h2>
          <p class="text-gray-600">${course.instructor}</p>
          <div class="flex items-center mt-2">
            ${Array(5).fill('<i class="fas fa-star text-yellow-500"></i>').join('')}
          </div>
          <div class="flex items-center justify-between mt-4">
            <span class="text-gray-500 line-through">$${course.originalPrice}</span>
            <span class="text-lg font-bold">$${course.price}</span>
          </div>
          <button class="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg add-to-cart" data-id="${course.id}">AGREGAR AL CARRITO</button>
        </div>
      `;
      courseList.appendChild(courseCard);
    });
  }
  
  // Initial render
  renderCourses();
  
  // Add to cart functionality
  document.addEventListener('click', (event) => {
    if (event.target.classList.contains('add-to-cart')) {
      const courseId = parseInt(event.target.getAttribute('data-id'));
      const course = courses.find(c => c.id === courseId);
      cart.push(course);
      updateCartCount();
      showToast(`"${course.title}" agregado al carrito`, 'success');
    }
  });
  
  // Update cart count
  function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    cartCount.textContent = cart.length;
  }
  
  // Show toast notification
  function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = `toast ${type === 'error' ? 'error' : ''}`;
    toast.style.display = 'block';
    setTimeout(() => {
      toast.style.display = 'none';
    }, 3000);
  }
  
  // Open cart modal
  document.getElementById('cart-icon').addEventListener('click', () => {
    const cartModal = document.getElementById('cart-modal');
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';
    cart.forEach((item, index) => {
      const cartItem = document.createElement('div');
      cartItem.className = 'flex justify-between items-center mb-2';
      cartItem.innerHTML = `
        <img src="${item.image}" class="w-12 h-12 object-cover rounded-lg">
        <span class="flex-1 ml-4">${item.title}</span>
        <span class="font-bold">$${item.price}</span>
        <button class="ml-4 text-red-500 remove-from-cart" data-index="${index}">
          <i class="fas fa-trash"></i>
        </button>
      `;
      cartItems.appendChild(cartItem);
    });
    cartModal.classList.remove('hidden');
  });
  
  // Remove item from cart
  document.addEventListener('click', (event) => {
    if (event.target.classList.contains('remove-from-cart') || event.target.parentElement.classList.contains('remove-from-cart')) {
      const index = parseInt(event.target.getAttribute('data-index') || event.target.parentElement.getAttribute('data-index'));
      if (!isNaN(index)) {
        const removedItem = cart.splice(index, 1)[0];
        updateCartCount();
        showToast(`"${removedItem.title}" eliminado del carrito`, 'error');
        const cartModal = document.getElementById('cart-modal');
        const cartItems = document.getElementById('cart-items');
        cartItems.innerHTML = '';
        cart.forEach((item, index) => {
          const cartItem = document.createElement('div');
          cartItem.className = 'flex justify-between items-center mb-2';
          cartItem.innerHTML = `
            <img src="${item.image}" class="w-12 h-12 object-cover rounded-lg">
            <span class="flex-1 ml-4">${item.title}</span>
            <span class="font-bold">$${item.price}</span>
            <button class="ml-4 text-red-500 remove-from-cart" data-index="${index}">
              <i class="fas fa-trash"></i>
            </button>
          `;
          cartItems.appendChild(cartItem);
        });
      }
    }
  });
  
  // Close cart modal
  document.getElementById('close-cart').addEventListener('click', () => {
    const cartModal = document.getElementById('cart-modal');
    cartModal.classList.add('hidden');
  });
  
  // Checkout functionality
  document.getElementById('checkout').addEventListener('click', () => {
    alert('Gracias por su compra!');
    cart = [];
    updateCartCount();
    const cartModal = document.getElementById('cart-modal');
    cartModal.classList.add('hidden');
  });
  
  // Search functionality
  document.getElementById('search-button').addEventListener('click', () => {
    const searchInput = document.getElementById('search-input').value.trim().toLowerCase();
    if (searchInput) {
      const filteredCourses = courses.filter(course => course.title.toLowerCase().includes(searchInput));
      renderCourses(filteredCourses);
    } else {
      renderCourses(courses); // Si el campo de búsqueda está vacío, muestra todos los cursos
    }
  });
  
  // Search on Enter key
  document.getElementById('search-input').addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      const searchInput = document.getElementById('search-input').value.trim().toLowerCase();
      if (searchInput) {
        const filteredCourses = courses.filter(course => course.title.toLowerCase().includes(searchInput));
        renderCourses(filteredCourses);
      } else {
        renderCourses(courses); // Si el campo de búsqueda está vacío, muestra todos los cursos
      }
    }
  });