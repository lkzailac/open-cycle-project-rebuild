const LOAD_ALL = 'allproducts/LOAD_ALL';

const loadAll = (all) => ({
    type: LOAD_ALL,
    all
})

// THUNKS
//  get all the companies and all their products
export const getAll = (id) => async (dispatch) => {
    const res = await fetch(`/api/consumer/${id}`)

    if(res.ok) {
        let data = await res.json()
        dispatch(loadAll(data))
    }
}

// reducer
let initialState = {}
export default function reducer(state=initialState, action) {
    let newState = {}
    switch (action.type) {
        case LOAD_ALL:
            newState = { ...state, }
            newState.all = action.all
            return newState;

        default:
            return state
    }

}
