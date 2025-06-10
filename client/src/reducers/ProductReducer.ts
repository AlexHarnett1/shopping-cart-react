import type { Product as ProductType } from '../types'

export type ProductSortType = "title" | "price" | "quantity";

export interface ProductSortState {
  type: ProductSortType
  isAscending: boolean
}

interface ProductState {
  items: ProductType[],
  sortState: ProductSortState
}

// const initialProductState: ProductState =
// {
//   items: [],
//   sortState: { type: "title", isAscending: true }
// }

type ProductAction =
  | { type: "SET_PRODUCTS"; payload: ProductType[] }
  | { type: "ADD_PRODUCT"; payload: ProductType }
  | { type: "DELETE_PRODUCT"; payload: { id: string } }
  | { type: "UPDATE_PRODUCT"; payload: ProductType }
  | { type: "SORT_PRODUCTS"; payload: ProductSortState };
  
const sortProducts = (products: ProductType[], sortState: ProductSortState) => {
    const { type, isAscending } = sortState;
      const sorted = [...products].sort((a, b) => {
        if (type === "title") {
          return isAscending
            ? a.title.localeCompare(b.title)
            : b.title.localeCompare(a.title);
        }

        return isAscending
          ? a[type] - b[type]
          : b[type] - a[type];
      });

      return sorted;
}

export const productsReducer = (prevState: ProductState, action: ProductAction)=> {
  let updatedProducts = prevState.items
  let sortState = prevState.sortState

  switch (action.type) {
    case "ADD_PRODUCT":
      updatedProducts = [...prevState.items, action.payload];
      break;
    
    case "DELETE_PRODUCT":
      updatedProducts = prevState.items.filter(product => product._id !== action.payload.id);
      break;
    
    case "UPDATE_PRODUCT":
      updatedProducts = prevState.items.map(product =>
        product._id === action.payload._id ? action.payload : product
      );
      break;
      
    case "SET_PRODUCTS":
      updatedProducts = action.payload;
      break;
    
    case "SORT_PRODUCTS":
      sortState = action.payload
      break;
    
    default:
      throw new Error('Incorrect type given to productsReducer.')
  }

  const sortedProducts = sortProducts(updatedProducts, sortState)
  return {items: sortedProducts, sortState: sortState}

}