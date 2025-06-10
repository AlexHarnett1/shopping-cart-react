import { type ProductSortState, type Product } from "../types";

export const sortProducts = (products: Product[], sortState: ProductSortState) => {
    const { type, isAscending } = sortState;
      const sorted = [...products].sort((a, b) => {
        if (type === "name") {
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