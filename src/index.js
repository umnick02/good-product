import L from '../node_modules/leaflet/dist/leaflet'

const desktopWidth = 1024;

const products = [
    {
        name: 'Хлеб "Ржаной край" на закваске',
        img: 'bread_3.jpg',
        ingredients: 'мука ржаная обдирная, мука пшеничная, закваска, вода, солод ячменный, соль пищевая йодированная',
        expiry: '72 часа',
        cert: 'СТБ-639',
        weight: '350 г',
        price: {rub: '0', cent: '90'}
    },
    {
        name: 'Хлеб "Ржаной край" зерновой на закваске',
        img: 'bread_2.jpg',
        ingredients: 'мука ржаная обдирная, мука пшеничная, закваска, вода, семена тыквы, семена льна, семена подсолнечника, кунжут, солод ячменный, соль пищевая йодированная, кориандр',
        expiry: '72 часа',
        cert: 'СТБ-639',
        weight: '350 г',
        price: {rub: '1', cent: '10'}
    },
    {
        name: 'Хлеб из пшеничной муки формовой',
        img: 'bread_4.jpg',
        ingredients: 'мука высшего и первого сортов, вода, дрожжи, соль пищевая йодированная',
        expiry: '72 часа',
        cert: 'СТБ-1009',
        weight: '350 г',
        price: {rub: '0', cent: '85'}
    },
    {
        name: 'Хлеб из пшеничной муки "Матнакаш"',
        img: 'bread_1.jpg',
        ingredients: 'мука высшего и первого сортов, закваска, вода, соль пищевая йодированная, кунжут',
        expiry: '72 часа',
        cert: 'СТБ-1009',
        weight: '400 г',
        price: {rub: '1', cent: '10'}
    },
];

const mobileImg = './images/mobile/';
const desktopImg = './images/desktop/';

const map = L.map('map').setView([55.5172, 28.7770], 13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors',
    id: 'map',
}).addTo(map);
L.marker([55.5172, 28.7770]).addTo(map);

let isMobile = window.innerWidth < desktopWidth;

const productsContainer = document.querySelector('.products');

function clean() {
    productsContainer.innerHTML = '';
}

function buildAboutDiv(content) {
    let div = document.createElement('div');
    div.innerHTML = content;
    return div;
}

function appendProducts() {
    for (let i in products) {
        let p = products[i];

        let product = document.createElement('div');
        product.classList.add('product');

        let productImg = document.createElement('div');
        productImg.classList.add('product__img');
        let img = document.createElement('img');

        let productAbout = document.createElement('div');
        productAbout.classList.add('product__about');
        let productName = document.createElement('h3');
        productName.textContent = p.name;

        if (isMobile === false) {
            img.setAttribute('src', desktopImg + p.img);
            productImg.appendChild(img);
            productAbout.appendChild(productName);
            if (i % 2 === 1) {
                product.classList.add('align-right');
                product.appendChild(productAbout);
                product.appendChild(productImg);
            } else {
                product.appendChild(productImg);
                product.appendChild(productAbout);
            }
        } else {
            img.setAttribute('src', mobileImg + p.img);
            productImg.appendChild(img);
            let mobileName = document.createElement('div');
            mobileName.classList.add('grid-x');
            mobileName.appendChild(productImg);
            mobileName.appendChild(productName);
            product.classList.add('grid-y');
            product.appendChild(mobileName);
            product.appendChild(productAbout);
        }
        productAbout.appendChild(buildAboutDiv(`<b>Состав:</b> ${p.ingredients}`));
        productAbout.appendChild(buildAboutDiv(`<b>Срок годности:</b> ${p.expiry}`));
        productAbout.appendChild(buildAboutDiv(`<b>Сертификат:</b> ${p.cert}`));
        productAbout.appendChild(buildAboutDiv(`<b>Масса:</b> ${p.weight}`));
        productAbout.appendChild(buildAboutDiv(`<b>Цена:</b> ${p.price.rub}<sup>${p.price.cent}</sup> р`));

        productsContainer.appendChild(product);
    }
}

window.addEventListener('resize', function () {
    if (window.innerWidth < desktopWidth && isMobile === false) {
        isMobile = true;
        clean();
        appendProducts();
    } else if (window.innerWidth >= desktopWidth && isMobile === true) {
        isMobile = false;
        clean();
        appendProducts();
    }
});

document.addEventListener('DOMContentLoaded', appendProducts);