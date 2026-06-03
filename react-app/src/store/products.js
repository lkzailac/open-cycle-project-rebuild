const LOAD_PRODUCTS = "products/LOAD_PRODUCTS";
const ADD_PRODUCT = "products/ADD_PRODUCT";
const DELETE_PRODUCT = "products/DELETE_PRODUCT";
const UPDATE_PRODUCT = "products/UPDATE_PRODUCT";
const LOAD_ONE = "products/LOAD_ONE";
// const LOAD_ALL = 'products/LOAD_ALL';

// const loadAll = (all) => ({
//     type: LOAD_ALL,
//     all
// })

const loadProducts = (products) => ({
    type: LOAD_PRODUCTS,
    products
})

const addProduct = (product) => ({
    type: ADD_PRODUCT,
    product
})

const removeProduct = (product) => ({
    type: DELETE_PRODUCT,
    product
})

const loadProduct = (product) => ({
    type: UPDATE_PRODUCT,
    product
})

const loadOneP = (product) => ({
    type: LOAD_ONE,
    product
})


// thunks
// export const getAll = (id) => async (dispatch) => {
//     const res = await fetch(`/api/consumer/${id}`)

//     if(res.ok) {
//         let data = await res.json()
//         console.log('thunk data---------', data)
//         dispatch(loadAll(data))
//     }
// }

// for consumer
// export const getProductsConsumer = (consumerId) => async (dispatch) => {
//     const res = await fetch(`/api/consumer/${consumerId}`)

//     if(res.ok) {
//         let data = await res.json()
//         dispatch(loadProducts(data))
//     }
// }
// get all products for a company
export const getProducts = (companyId) => async (dispatch) => {
    const res = await fetch(`/api/company/${companyId}`)

    if(res.ok) {
        let data = await res.json()
        dispatch(loadProducts(data))
    }
}

export const createProduct = (newProduct) => async (dispatch) => {
        let name = newProduct.name;
        let photo_url = newProduct.photo_url;
        let company_id = newProduct.company_id;
        let product_category = newProduct.product_category;
        let compArray = newProduct.compArray;
        let manufacturing_process_id = newProduct.manufacturing_process_id;
        let product_weight_g = newProduct.product_weight_g;
        let package_weight_g = newProduct.package_weight_g;
        let factory_id = newProduct.factory_id;
        let unit = newProduct.unit;
        let transport_mode_id = newProduct.transport_mode_id;
        let useArray = newProduct.useArray;
        let number_of_cycles = newProduct.number_of_cycles;
        let returnable = newProduct.returnable;
        let product_returned_percent = newProduct.product_returned_percent;
        let product_recycled_percent = newProduct.product_recycled_percent;
        const res = await fetch("/api/company/products", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                photo_url,
                company_id,
                product_category,
                compArray,
                manufacturing_process_id,
                product_weight_g,
                package_weight_g,
                factory_id,
                unit,
                transport_mode_id,
                useArray,
                number_of_cycles,
                returnable,
                product_returned_percent,
                product_recycled_percent,
            })
        })

        const addedProduct = await res.json()

        if(addedProduct.errors) {
            return addedProduct;
        }
        dispatch(addProduct(addedProduct))
        return {}
}

// Delete a product
export const deleteProduct = (id) => async (dispatch) => {

    const res = await fetch(`/api/company/products/${id}`, {
        method: "DELETE"
    });

    if(res.ok) {
        let product = await res.json();
        dispatch(removeProduct(product))
    }
}

// update a product
export const updateProduct = (product) => async (dispatch) => {
    console.log("thunk updated prod------------------", product)
    const res = await fetch(`/api/company/products/${product.id}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            product
        })
    })

    if(res.ok) {
        const updatedProduct = await res.json()
        dispatch(loadOneP(updatedProduct))
        return updatedProduct;
    }
}

export const getCurrentProd = (id) => async (dispatch) => {

    const res = await fetch(`/api/company/products/${id}`)

    if(res.ok) {
        let data = await res.json()
        dispatch(loadOneP(data))
    }
}


// reducer
let initialState = {}
export default function reducer(state=initialState, action) {
    let newState = {}
    switch (action.type) {
        case LOAD_PRODUCTS:
            return {...state, ...action.products}
        case ADD_PRODUCT:
            newState = { ...state };
            newState.products.push(action.product)
            return newState;
        case DELETE_PRODUCT:
            newState = { ...state }
            let prodArr = newState.products.filter((prod) => prod["id"] !== action.product.id)
            newState.products = prodArr
            return newState;
        // case LOAD_ALL:
        //     newState = { ...state}
        //     newState.all = action.all
        //     return newState;
        // case UPDATE_PRODUCT:
        //     newState = { ...state }
        //     let arr = [];
        //     for (const prod of newState.products) {
        //         if(prod.id === action.product.id) {
        //             arr.push(action.product)
        //         } else {
        //             arr.push(prod)
        //         }
        //     }
        //     newState.products = arr;
        //     return newState;
        case LOAD_ONE:
            newState = { ...state }
            newState.product = action.product
            return newState;
        default:
            return state
    }

}


// name, image_url, company_id, product_category,
// components, manufacturing_process_id,
//     product_weight_g, package_weight_g,
// factory_id, unit, transport_mode_id, consumer_uses,
// number_of_cycles,
//     returnable, product_returned_percent,
// product_recycled_percent
