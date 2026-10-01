export interface Brand {
  id: number;
  name: string;
  isActive?: boolean;
  status?: boolean;
  createdAt?: string;
  updatedAt?: string;
  _count?: { products?: number };
}

export interface CreateBrandDto {
  name: string;
}

export interface UpdateBrandDto {
  name?: string;
  status?: boolean;
}
