var entered_text = ""
var container = document.querySelector(".row"); 
var elements = container.querySelectorAll(".col"); 

function check(event) 
{ 
  entered_text = event.target.value.toUpperCase();
  
  for (var i = 0; i < elements.length; i++) 
  {
    if(elements[i].textContent.toUpperCase().indexOf(entered_text) < 0)   
    {
      elements[i].style.display = "none";
    }
    else
    {
      elements[i].style.display = "block";
    }
  }
}

document.querySelectorAll('.add-to-cart').forEach(button => {
  button.addEventListener('click', function() {
      const card = this.closest('.card');
      const itemName = card.querySelector('.card-title').textContent.trim();  
      const quantity = card.querySelector('.in-num').value;
      const itemImageSrc = card.querySelector('img').src;  
      if (parseInt(quantity) > 0) 
      {
          addToCart(itemName, quantity, itemImageSrc);
      } 
      else 
      {
          alert('INVALID QUANTITY!');
      }
  });
});

function itemExistsInCart(itemName) 
{
  const cartTableRows = document.querySelectorAll('#cart-table tbody tr');
  for (let row of cartTableRows) 
  {
      const cartItemName = row.querySelector('td:nth-child(2)').textContent.trim();  
      if (cartItemName.toLowerCase() === itemName.toLowerCase()) 
      {
          return true;
      }
  }
  return false;
}

function addToCart(itemName, quantity, itemImageSrc) 
{
  const cartTable = document.querySelector('#cart-table tbody');
  if (itemExistsInCart(itemName)) 
  {
      alert('THE ITEM ALREADY EXISTS IN THE CART!');
      return; 
  }
  const row = document.createElement('tr');
  row.innerHTML = `
      <td><img src="${itemImageSrc}" alt="${itemName}" style="width: 80px; height: 80px;"></td>
      <td>${itemName}</td>
      <td>${quantity}</td>
      <td><button class="delete-btn" id="del_btn"><i class="fa-regular fa-trash-can"></i>&nbsp; DELETE</button></td>`;
  cartTable.appendChild(row);

  row.querySelector('.delete-btn').addEventListener('click', function() {
      row.remove();
  });
}

// Increment and decrement logic for quantity input
document.querySelectorAll('.plus').forEach(plusButton => {
  plusButton.addEventListener('click', function() {
      const input = this.previousElementSibling;
      input.value = parseInt(input.value) + 1;
  });
});

document.querySelectorAll('.minus').forEach(minusButton => {
  minusButton.addEventListener('click', function() {
      const input = this.nextElementSibling;
      if (parseInt(input.value) > 0) {
          input.value = parseInt(input.value) - 1;
      }
  });
});

function delete_item(event) 
{
   event.target.parentNode.parentNode.remove();
}