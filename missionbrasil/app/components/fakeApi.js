
export const createProduct = (product) => {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    products.push(product);
    localStorage.setItem('products', JSON.stringify(products));
  };
  
  export const getProducts = () => {
    return JSON.parse(localStorage.getItem('products')) || [];
  };
  
  export const updateProduct = (updatedProduct) => {
    let products = JSON.parse(localStorage.getItem('products')) || [];
    products = products.map(product =>
      product.id === updatedProduct.id ? updatedProduct : product
    );
    localStorage.setItem('products', JSON.stringify(products));
  };
  
  export const deleteProduct = (productId) => {
    let products = JSON.parse(localStorage.getItem('products')) || [];
    products = products.filter(product => product.id !== productId);
    localStorage.setItem('products', JSON.stringify(products));
  };