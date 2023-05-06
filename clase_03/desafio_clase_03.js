const fs = require("fs");

class ProductManager {
    constructor(path) {
        this.path = path;
        this.id = 1;
    }

    addProduct(product) {
        const { title, description, price, thumbnail, code, stock } = product;
        if (!(title && description && price && thumbnail && code && stock)) {
            console.log("Error: Todos los campos son obligatorios.");
            return;
        };

        const products = this.getProducts();
        const findCode = products.find((p) => p.code === product.code);
        if (findCode) {
            console.log("Error: Este código ya existe.");
            return;
        } else {
            let newProduct = {
                id: this.id,
                title: title,
                description: description,
                price: price,
                thumbnail: thumbnail,
                code: code,
                stock: stock,
            };
            products.push(newProduct);
            this.saveProducts(products);
            this.id++;
        };
    }

    getProducts() {
        const data = fs.readFileSync(this.path, "utf-8");
        return JSON.parse(data);
    }

    getProductById(id) {
        const products = this.getProducts();
        const findProduct = products.find((product) => product.id === id);
        if (findProduct) {
            return findProduct;
        } else {
            console.log("Not found.");
        };
    }

    updateProduct(id, updateData) {
        const products = this.getProducts();
        const productId = products.findIndex((product) => product.id === id);
        if (productId !== -1) {
            products[productId] = { ...products[productId], ...updateData };
            this.saveProducts(products);
            console.log("Producto actualizado")
        } else {
            console.log("Id no encontrado, no puede actualizarse el producto");
        }
    }

    deleteProduct(id) {
        const products = this.getProducts();
        const updatedProducts = products.filter((product) => product.id !== id);
        if (updatedProducts.length !== products.length) {
            this.saveProducts(updatedProducts);
            console.log("Producto eliminado")
        } else {
            console.log("Id no encontrado, no puede borrarse el producto");
        }
    }

    saveProducts(products) {
        fs.writeFileSync(this.path, JSON.stringify(products));
    }
}

//Probando el código
const product = new ProductManager('products.json');

const product1 = {
    title: 'Asus Vivobook',
    description: 'Laptop',
    price: 100,
    thumbnail: 'img1',
    code: 'ABC123',
    stock: 2
};

const product2 = {
    title: 'Lenovo Yoga',
    description: 'Laptop',
    price: 100,
    thumbnail: 'img2',
    code: 'DEF456',
    stock: 2
};

const product3 = {
    title: 'DELL Latitude',
    description: 'Laptop',
    price: 100,
    thumbnail: 'img3',
    code: 'GHI789',
    stock: 1
};

product.addProduct(product1);
product.addProduct(product2);
product.addProduct(product3);

const products = product.getProducts();
console.log("Todos los productos ");
console.log(products);

const findCode2 = product.getProductById(2);
console.log("Producto encontrado con ID");
console.log(findCode2);

const findCode4 = product.getProductById(4);

const newProduct2 = {
    price: 150,
    stock: 3
};
product.updateProduct(2, newProduct2);
console.log(product.getProducts());

product.deleteProduct(3);
console.log(product.getProducts());