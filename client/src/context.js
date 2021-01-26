import React, { Component } from 'react';
import axios from 'axios';

const ProductContext = React.createContext();


class ProductProvider extends Component {
    state = {
        products: [],
        detailProduct: [],
        cart: [],
        modalOpen: false,
        modalProduct: [],
        cartSubTotal: 0,
        cartTax: 0,
        cartTotal: 0,
        authenticated: false,
        token: "",
        registered: false,
        login: false,
        EditProduct: {},
        EditId: "",
        doneEditing: false,
        Message:""
    }
    componentDidMount() {
        this.getProducts();
    }
    setEditProduct = (product, id) => {
        this.setState(() => {
            return { EditProduct: product, EditId: id }
        })
    }

    handleDelete = (id) => {
        this.Delete(id);
        this.getProducts();
    }

    handleEdit = (postData) => {
        this.Edit(postData, this.state.EditId);
        this.resetEditProduct();
        this.getProducts();
    }

    Delete = (id) => {
        const url = 'http://localhost:5000/product/delete';
        const config = {
            headers: {
                'content-type': 'application/json'
            }
        }
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['x-auth-token'] = token;
        }
        axios.delete(`${url}/${id}`, config).then((data) => {

            console.log('good request')
        }).catch((err) => {
            console.log('bad request')
        })
    }

    resetEditProduct = () => {
        this.setState(() => {
            return { EditProduct: {}, EditId: "", doneEditing: true }
        })
        this.getProducts();
    }

    Edit = (postData, id) => {
        const url = 'http://localhost:5000/product/edit';
        const config = {
            headers: {
                'content-type': 'application/json'
            }
        }
        const token = localStorage.getItem('token');
        const body = JSON.stringify(postData);
        if (token) {
            config.headers['x-auth-token'] = token;
        }
        axios.patch(`${url}/${id}`, body, config).then((data) => {
            this.setState(() => {
                return { Message:"product Edited"}
            })
            console.log('good request')
        }).catch((err) => {
            this.setState(() => {
                return { Message:"Please fill all fields"}
            })
            console.log('bad request')
        })
    }

    createProduct = (postData) => {
        const url = 'http://localhost:5000/product';
        const config = {
            headers: {
                'content-type': 'application/json'
            }
        }
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['x-auth-token'] = token;
        }
        const body = JSON.stringify(postData)
        axios.post(`${url}/createProduct`, body, config).then((data) => {
            this.setState(() => {
                return {Message:"Product created"}
            })
            console.log('good request')
        }).catch((err) => {
            this.setState(() => {
                return { Message:"Please fill all fields"}
            })
            console.log('bad request')
        });
        this.getProducts();


    }

    getProducts = () => {
        const url = 'http://localhost:5000/product';
        const config = {
            headers: {
                'content-type': 'application/json'
            }
        }
        axios.get(`${url}/getProducts`)
            .then((response) => {
                const datas = response.data;
                let tempProducts = [];
                datas.map((data) => {
                    const singleItem = { ...data };
                    tempProducts = [...tempProducts, singleItem];
                });
                this.setState(() => {
                    return { products: tempProducts }
                })

            })

    }

    getItem = (id) => {
        const product = this.state.products.find(item => item._id === id);
        return product;
    }
    handleDetails = (id) => {
        const product = this.getItem(id);
        this.setState(() => {
            return { detailProduct: product }
        })
    }

    handleSubmit = (postData) => {
        this.register(postData);
    }

    loginHandle = (postData) => {
        this.login(postData);
    }

    register = (postData) => {
        const url = 'http://localhost:5000/authenticate';
        const config = {
            headers: {
                'content-type': 'application/json'
            }
        }
        const body = JSON.stringify(postData)
        axios.post(`${url}/register`, body, config).then((res) => {
            localStorage.setItem('token', res.data.token);
            this.setState(() => {
                return { registered: true,Message:"Registration successful" }
            })
            console.log('good request')
        }).catch((err) => {
            this.setState(() => {
                return { Message:err.message}
            })
            console.log('bad request')
        })

    }

    login = (postData) => {
        const url = 'http://localhost:5000/authenticate';
        const config = {
            headers: {
                'content-type': 'application/json'
            }
        }
        const body = JSON.stringify(postData)
        axios.post(`${url}/login`, body, config).then((res) => {
            localStorage.setItem('login', 'true');
            localStorage.setItem('token', res.data.token);
            this.setState(() => {
                return { login: true,Message:"logged in successfully" }
            })
            console.log('good request')
        }).catch((err) => {
            this.setState(() => {
                return {Message:"failed to log in"}
            })
            console.log('bad request')
        });
    }

    logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('login');
        this.setState(() => {
            return { registered: true, login: true, authenticated: true }
        })
    }

    isAuthenticated = () => {
        return this.state.authenticated;
    }
    addTocart = (id) => {
        let tempProducts = [...this.state.products];
        const index = tempProducts.indexOf(this.getItem(id));
        const product = tempProducts[index];
        product.inCart = true;
        product.count = 1;
        const price = product.price;
        product.total = price;
        this.setState(() => {
            return { products: tempProducts, cart: [...this.state.cart, product] }
        },
            () => {
                this.addTotals();
            })
    }
    openModal = (id) => {
        const product = this.getItem(id);
        this.setState(() => {
            return { modalProduct: product, modalOpen: true }
        })
    }
    closeModal = () => {
        this.setState(() => {
            return { modalOpen: false }
        })
    }
    increament = (id) => {
        let tempCart = [...this.state.cart];
        const selectedProduct = tempCart.find(item => item._id === id);
        const index = tempCart.indexOf(selectedProduct);
        const product = tempCart[index];
        product.count = product.count + 1;
        product.total = product.count * product.price;
        this.setState(() => {
            return {
                cart: [...tempCart]
            }
        }, () => { this.addTotals() })
    }

    decreament = (id) => {
        let tempCart = [...this.state.cart];
        const selectedProduct = tempCart.find(item => item._id === id);
        const index = tempCart.indexOf(selectedProduct);
        const product = tempCart[index];
        product.count = product.count - 1;
        if (product.count === 0) {
            this.removeItem(id);
        } else {
            product.total = product.count * product.price;
            this.setState(() => {
                return {
                    cart: [...tempCart]
                }
            }, () => { this.addTotals() })
        }
    }

    removeItem = (id) => {
        let tempProducts = [...this.state.products];
        let tempCart = [...this.state.cart];
        tempCart = tempCart.filter(item => item._id !== id);
        const index = tempProducts.indexOf(this.getItem(id));
        let removedProduct = tempProducts[index];
        removedProduct.inCart = false;
        removedProduct.count = 0;
        removedProduct.total = 0;
        this.setState(() => {
            return {
                cart: [...tempCart],
                product: [...tempProducts]
            }
        }, () => {
            this.addTotals();
        })
    }

    clearCart = (id) => {
        this.setState(() => {
            return { cart: [] };
        }, () => {
            this.getProducts();
            this.addTotals();
        })
    }

    addTotals = () => {
        let subTotal = 0
        this.state.cart.map(item => subTotal += item.total);
        const tempTax = subTotal * 0.1;
        const tax = parseFloat(tempTax.toFixed(2));
        const total = subTotal + tax;
        this.setState(() => {
            return {
                cartSubTotal: subTotal,
                cartTax: tax,
                cartTotal: total
            }
        })
    }

    render() {
        return (
            <ProductContext.Provider value={{
                ...this.state,
                handleDetails: this.handleDetails,
                addTocart: this.addTocart,
                openModal: this.openModal,
                closeModal: this.closeModal,
                increament: this.increament,
                decreament: this.decreament,
                removeItem: this.removeItem,
                clearCart: this.clearCart,
                register: this.register,
                isAuthenticated: this.isAuthenticated,
                loginHandle: this.loginHandle,
                logout: this.logout,
                handleSubmit: this.handleSubmit,
                createProduct: this.createProduct,
                Edit: this.Edit,
                setEditProduct: this.setEditProduct,
                resetEditProduct: this.resetEditProduct,
                handleEdit: this.handleEdit,
                handleDelete: this.handleDelete
            }}>
                {this.props.children}
            </ProductContext.Provider>
        )
    }
}

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer }
