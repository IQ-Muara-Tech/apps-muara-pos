export interface Branch {
  id: number
  name: string
  address: string
  phone: string
  is_active: boolean
}

export interface Role {
  id: number
  name: string
}

export interface Category {
  id: number
  branch_id: number
  name: string
  branch?: Branch
}

export interface Product {
  id: number
  category_id: number
  branch_id: number
  name: string
  price: number
  category?: Category
}

export interface RawMaterial {
  id: number
  branch_id: number
  name: string
  unit: string
  min_stock: number
  branch?: Branch
  created_at: string
  updated_at: string
}

export interface RawMaterialStock {
  id: string
  raw_material_id: number
  branch_id: number
  created_user_id: number
  stock: number
  remaining: number
  date: string
  raw_material?: { id: number; name: string; unit: string; min_stock: number }
  branch?: Branch
  created_user?: { id: number; name: string }
  created_at: string
  updated_at: string
}

export interface Employee {
  id: number
  user_id: number
  name: string
  phone: string
  position: string
  user?: User
  branches?: Branch[]
}

export interface SaleItem {
  id?: number
  product_id: number
  qty: number
  price: number
  subtotal: number
  product?: Product
}

export interface Sale {
  id: string
  kode: string
  branch_id: number
  created_user_id: number
  payment_type_id?: number
  total: number
  status: 'processing' | 'done'
  date_time: string
  created_at: string
  branch?: Branch
  created_user?: { id: number; name: string }
  items?: SaleItem[]
  payment_type?: TypePayment
}

export interface TypePayment {
  id: number
  name: string
  description: string | null
}

export interface User {
  id: number
  name: string
  username: string
  role_id: number
  role?: Role
  branches?: Branch[]
}

export interface DashboardSummary {
  today_sales: number
  today_revenue: number
}

export interface ExpenditureCategory {
  id: number
  branch_id: number
  name: string
  description: string | null
  key: string | null
  branch?: Branch
  created_at: string
  updated_at: string
}

export interface Expenditure {
  id: number
  expenditure_category_id: number
  branch_id: number
  created_user_id: number
  description: string
  amount: number
  date: string
  expenditure_category?: { id: number; name: string }
  branch?: Branch
  created_user?: { id: number; name: string }
  created_at: string
  updated_at: string
}
