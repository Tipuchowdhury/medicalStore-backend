export interface createMedicineData {
  id: string;
  name: string;
  description: string;
  price: float;
  quantity: int;
  categoryId: string;
  sellerId: string;
}

export interface createCategoryData {
  name: string;
}

export interface createOrderData {
  medicineId: string;
  quantity: int;
}

export interface createOrderItemData {
  quantity: int;
  price: float;
}

export interface updateMedicineType {
  name?: string;
  description?: string;
  price?: number;
  quantity?: number;
  categoryId?: string;
}
