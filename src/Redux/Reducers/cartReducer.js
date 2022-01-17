let defaultState = {
    selectedItems: { items: [] }
}
export default cartReducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'ADD_TO_CART': {
            let newState = { ...state }
            if (action.payload.productValue) {
                console.log('ADD TO CAR$T')
                newState.selectedItems = {
                    items: [...newState.selectedItems.items, action.payload]
                }

            }
            else {
                console.log('remove cart')
                newState.selectedItems = {
                    items: [...newState.selectedItems.items.filter(
                        (item) => item.productName !== action.payload.productName
                    )]
                }
            }
            console.log(newState.selectedItems.items, '👍');
            return newState;
        }
        case "REMOVE": {
            state.selectedItems = {
                items: []
            }
            return state
        }
        default:
            return state;
    }
}