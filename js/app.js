'use strict';

// Global Variables
let totalClicks = 0;
let clicksAllowed = 25;
let allProducts = [];
// let myContainer = document.querySelector('section');
let myContainer = document.getElementById('imgContainer');
let indexArray = [];

let imageOne = document.querySelector('section img:first-child');
let imageTwo = document.querySelector('section img:nth-child(2)');
let imageThree = document.querySelector('section img:nth-child(3)');

// let myButton = document.querySelector('div');

function Product(name, fileExtension = 'jpg') {
  this.name = name;
  this.src = `img/${name}.${fileExtension}`;
  this.views = 0;
  this.clicks = 0;
  allProducts.push(this);
}

new Product('bag');
new Product('banana');
new Product('bathroom');
new Product('boots');
new Product('breakfast');
new Product('bubblegum');
new Product('chair');
new Product('cthulhu');
new Product('dog-duck');
new Product('dragon');
new Product('pen');
new Product('pet-sweep');
new Product('scissors');
new Product('shark');
new Product('sweep', 'png');
new Product('tauntaun');
new Product('unicorn');
new Product('usb', 'gif');
new Product('water-can');
new Product('wine-glass');

function getRandomIndex() {
  return Math.floor(Math.random() * allProducts.length);
}

// function renderProducts() {
function populateIndexArray() {
  while (indexArray.length < 6) {
    let randomIndex = getRandomIndex();
    while (!indexArray.includes(randomIndex)) {
      indexArray.push(randomIndex);
    }
  }
}

function renderProduct() {
  populateIndexArray();
  let firstProductIndex = indexArray.pop();
  let secondProductIndex = indexArray.pop();
  let thirdProductIndex = indexArray.pop();
  // let firstProductIndex = getRandomIndex();
  // let secondProductIndex = getRandomIndex();
  // let thirdProductIndex = getRandomIndex();
  //  in lab today I recommend using an array.
  // maybe name itindexArray
  // check to see if the index is included in that array
  // pop those results from the array or shift?  maybe?
  // while (firstProductIndex === secondProductIndex === thirdProductIndex) {
  // thirdProductIndex = getRandomIndex();

  imageOne.src = allProducts[firstProductIndex].src;
  imageOne.title = allProducts[firstProductIndex].name;
  allProducts[firstProductIndex].views++;

  imageTwo.src = allProducts[secondProductIndex].src;
  imageTwo.title = allProducts[secondProductIndex].name;
  allProducts[secondProductIndex].views++;

  imageThree.src = allProducts[thirdProductIndex].src;
  imageThree.title = allProducts[thirdProductIndex].name;
  allProducts[thirdProductIndex].views++;

}

// function renderResult() {
//   let myList = document.querySelector('ul');
//   for (let i = 0; i < allProducts.length; i++) {
//     let li = document.createElement('li');
//     li.textContent = `${allProducts[i].name} had ${allProducts[i].clicks} votes, and was seen ${allProducts[i].views} times`;
//     myList.appendChild(li);
//   }
// }

function handleClick(event) {
  if (event.target === myContainer) {
    alert('Please click an image and FOLLOW INSTRUCTIONS');
  }

  totalClicks++;
  let productClicked = event.target.title;

  for (let i = 0; i < allProducts.length; i++) {
    if (productClicked === allProducts[i].name) {
      allProducts[i].clicks++;
    }
  }

  renderProduct();
  if (totalClicks === clicksAllowed) {
    // REMOVE EVENT LISTENER
    myContainer.removeEventListener('click', handleClick);
    renderChart();
  }

}

// function handleButtonClick(event) { //eslint-disable-line
//   if (totalClicks === clicksAllowed) {
//     renderResult();
//   }
// }

// renderProduct();
// if (totalClicks === clicksAllowed) {
//   myContainer.removeEventListener('click', handleButtonClick)
//   renderChart();
// }

renderProduct();

function renderChart() {
  let productNames = [];
  let productViews = [];
  let productClicked = [];
  for (let i = 0; i < allProducts.length; i++) {
    productNames.push(allProducts[i].name);
    productViews.push(allProducts[i].views);
    productClicked.push(allProducts[i].clicks);
  }

  console.log('productNames: ', productNames);
  console.log('productViews: ', productViews);
  console.log('productClicked: ', productClicked);
  var chartObject = {
    type: 'bar',
    data: {
      labels: productNames,
      // labels: ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum','chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass'],
      datasets: [{
        label: '# of Views',
        data: productViews,
        backgroundColor: 'rgba(0, 168, 255,1.0)',
        borderColor: 'rgba(0, 151, 230,1.0)',
        borderWidth: 1
      },
      {
        label: '# of Clicks',
        data: productClicked,
        backgroundColor: 'rgba(232, 65, 24,1.0)',
        borderColor: 'rgba(194, 54, 22,1.0)',
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  };

  let ctx = document.getElementById('myChart').getContext('2d');
  let myChart = new Chart(ctx, chartObject);
}

myContainer.addEventListener('click', handleClick);
