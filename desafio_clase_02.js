class ProductManager {
    constructor() {
        this.products = [];
        this.id = 1;
    }

    addProduct(title, description, price, thumbnail, code, stock) {
        if (!(title && description && price && thumbnail && code && stock)) {
            console.log("Error: Todos los campos son obligatorios.");
            return;
        }

        const findCode = this.products.find((p) => p.code === code);
        if (findCode) {
            console.log("Error: Este código ya existe.");
            return;
        } else {
        let product = {
            id: this.id,
            title: title,
            description: description,
            price: price,
            thumbnail: thumbnail,
            code: code,
            stock: stock,
        };
        this.products.push(product);
        this.id++;
        }
    }

    getProducts() {
        return this.products;
    }

    getProductById(id) {
        const findProduct = this.products.find((product) => product.id === id);
        if (findProduct) {
            return findProduct;
        } else {
            console.log("Not found.");
        }
    }
}

//Probando el código
const product = new ProductManager();

product.addProduct('Asus Vivobook', 'Laptop', 100, 'img', 101, 2);
product.addProduct('Lenovo Yoga', 'Laptop', 100, 'img', 102, 2);
product.addProduct('Lenovo Yoga', 'Laptop', 100, 'img', 102, 2);

const products = product.getProducts();
console.log("Todos los productos ");
console.log(products);

const findCode2 = product.getProductById(2);
console.log("Producto encontrado con ID");
console.log(findCode2);

const findCode4 = product.getProductById(4);