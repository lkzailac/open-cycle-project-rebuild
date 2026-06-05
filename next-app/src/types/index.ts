export interface User {
  id: number;
  username: string;
  email: string;
  role: "user";
}

export interface Company {
  id: number;        // company_profile.id
  account_id: number;
  email: string;     // was admin_email
  role: "company";
  name: string;
  logo_url: string;
  statement: string;
  warehouse_location: string;
  products_sold: number;
  carbon_goal: number;
  carbon_goal_date: string;
  c_footprint_mt: number;
  transparency_score: number;
}

export interface Component {
  id: number;
  name: string;
}

export interface ManufacturingProcess {
  id: number;
  name: string;
}

export interface ConsumerUse {
  id: number;
  name: string;
}

export interface Factory {
  id: number;
  name: string;
}

export interface TransportMode {
  id: number;
  name: string;
}

export interface Product {
  id: number;
  name: string;
  photo_url: string;
  company_id: number;
  company_name: string;
  product_category: string;
  manufacturing_process_id: number;
  product_weight_g: number;
  package_weight_g: number;
  factory_id: number;
  unit: string;
  transport_mode_id: number;
  number_of_cycles: number;
  returnable: boolean;
  product_returned_percent: number;
  product_recycled_percent: number;
  carbon_footprint_kg: number;
  components: Component[];
  uses: ConsumerUse[];
}

export interface CompanyDashboardData {
  products: Product[];
  components: Component[];
  manufacturing: ManufacturingProcess[];
  consumer_uses: ConsumerUse[];
  factories: Factory[];
  transport_modes: TransportMode[];
}

export interface AllProductsData {
  all: Product[];
}

export interface NewProductPayload {
  name: string;
  photo_url: string;
  company_id: number;
  product_category: string;
  compArray: number[] | null;
  manufacturing_process_id: number;
  product_weight_g: number;
  package_weight_g: number;
  factory_id: number;
  unit: string;
  transport_mode_id: number;
  useArray: number[] | null;
  number_of_cycles: number;
  returnable: boolean;
  product_returned_percent: number;
  product_recycled_percent: number;
}

// Flat update payload matching FastAPI's ProductUpdate schema
export interface ProductUpdatePayload {
  id: number;
  name?: string;
  photo_url?: string;
  product_category?: string;
  compArray?: number[];
  manufacturing_process_id?: number;
  product_weight_g?: number;
  package_weight_g?: number;
  factory_id?: number;
  unit?: string;
  transport_mode_id?: number;
  useArray?: number[];
  number_of_cycles?: number;
  returnable?: boolean;
  product_returned_percent?: number;
  product_recycled_percent?: number;
}

export interface CompanySignUpData {
  name: string;
  admin_email: string;
  password: string;
  logo_url: string;
  statement: string;
  warehouse_location: string;
  products_sold: string;
  carbon_goal: string;
  carbon_goal_date: string;
}
