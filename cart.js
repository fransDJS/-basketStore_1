document.addEventListener('DOMContentLoaded', function (){
  //Каталог товаров
  const productList = [
    { id: 1, name: "Носки", price: 150},
    { id: 2, name: "Футболка", price: 550},
    { id: 3, name: "Кроссовки", price: 3650},
    { id: 4, name: "Джинсы", price: 2000}
  ];
  console.log('Каталог товаров:', productList);

  // Получаем корзину из localStorage или создаём пустую
  let cart = JSON.parse(localStorage.getItem('cart') || '[]');
  console.log('Корзина при загрузке:', cart);

  const productsDiv = document.getElementById('products');
  const cartDiv = document.getElementById('cart');

  // Функция для отображения каталога товаров
  function renderProtucts() {
    console.log('Рисуем каталог товаров...');
    productsDiv.innerHTML = '';
    productList.forEach(product => {
      const div = document.createElement('div');
      div.className = 'product';
      div.textContent = `${product.name} - ${product.price}₽ `;
      const btn = document.createElement('button');
      btn.textContent = 'В корзину';
      btn.onclick = () => {
        console.log('Клик по кнопке "В корзину" для:', product);
        addToCart(product);
      };
      div.appendChild(btn);
      productsDiv.appendChild(div);
    });
  }

  // Функция для отображения корзины
  function renderCart() {
    console.log('Текущее состояние корзины перед отрисовкой:', cart);
    cartDiv.innerHTML = '';
    if (cart.length === 0) {
      cartDiv.textContent = 'Корзина пуста';
      console.log('Корзина пуста');
      return;
    }
    const ul = document.createElement('ul');
    cart.forEach((item) => {
      console.log('Отрисовываем товар в корзине', item);
      const li = document.createElement('li');

      // Информация о товаре
      const infoSpan = document.createElement('span');
      infoSpan.className = 'cart-item-info';
      infoSpan.textContent = `${item.name} - ${item.price}₽ * ${item.quantity}`;

      // Кнопки управления
      const btnsDiv = document.createElement('div');
      btnsDiv.className = 'carts-btns';

      //Кнопка уменьшить
      const minusBtn = document.createElement('button');
      minusBtn.textContent = '-';
      minusBtn.className = 'minus';
      minusBtn.onclick = () => {
        console.log('Клик по кнопке "-" для:', item);
        decreaseQuantity(item.id);
      };

      //Кнопка увеличить
      const plusBtn = document.createElement('button');
      plusBtn.textContent = '+';
      plusBtn.className = 'plus';
      plusBtn.onclick = () => {
        console.log('Клик по кнопке "+" для:', item);
        increaseQuantity(item.id);
      };

      //Кнопка удалить
      const delBtn = document.createElement('button');
      delBtn.textContent = 'Удалить';
      delBtn.className = 'delete';
      delBtn.onclick = () => {
        console.log('Клик по кнопке "Удалить" для:', item);
        removeFromCart(item.id);
      };

      btnsDiv.appendChild(minusBtn);
      btnsDiv.appendChild(plusBtn);
      btnsDiv.appendChild(delBtn);

      li.appendChild(infoSpan);
      li.appendChild(btnsDiv);
      ul.appendChild(li);
    });
    cartDiv.appendChild(ul);

    // Итоговая сумма
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const totalDiv = document.createElement('div');
    totalDiv.textContent = `Итого: ${total}₽`;
    cartDiv.appendChild(totalDiv);
    console.log('Сумма корзины:', total);
  }

  // Добавить товар в корзину
  function addToCart(product) {
    console.log('Добавляем товар в корзину:', product);
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      existing.quantity += 1;
      console.log('Товар уже есть, увеличиваем количество', existing);
    } else {
      const newItem = { ...product, quantity: 1};
      cart.push(newItem);
      console.log('Товар новый, добавялем:', newItem);
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    console.log('Корзина после добавления:', cart);
    renderCart();
  }

  // Увеличиваем количество товара
  function increaseQuantity(id) {
    const item = cart.find(item => item.id === id);
    if (item) {
      item.quantity += 1;
      console.log('Увеличиваем количество товара:', item);
      localStorage.setItem('cart', JSON.stringify(cart));
      renderCart();
    }
  }

  // Уменьшить количество товара
  function decreaseQuantity(id) {
    const item = cart.find(item => item.id === id);
    if (item) {
      if (item.quantity > 1) {
        item.quantity -= 1;
        console.log('Уменьшили количество товара:', item);
      } else {
        cart = cart.filter(i => i.id !==id);
        console.log('Удалили товар из корзины, потому что quantity стал 0:', id);
      }
      localStorage.setItem('cart', JSON.stringify(cart));
      renderCart();
    }
  }

  //Удалить товар из корзины полностью
  function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    console.log('Удалили товар полностью из корзины:', id);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
  }

  // Первая отрисовка
  renderProtucts();
  renderCart();
})