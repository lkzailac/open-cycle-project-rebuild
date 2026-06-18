"use client";

import Link from "next/link";
import { useAuthStore } from "@/store/authStore";
import { useCompanyData } from "@/hooks/useCompanyData";
import { useDeleteProduct } from "@/hooks/useProductMutations";
import "./CompanyDashboard.css";

export default function CompanyDashboard() {
  const company = useAuthStore((s) => s.company)!;
  const { data, isLoading } = useCompanyData(company.id);
  const deleteProduct = useDeleteProduct(company.id);

  if (isLoading) return <div className="loading">Loading products...</div>;

  const products = data?.products ?? [];

  return (
    <div className="company-info-container">
      <div className="tag-contain">
        <img src="/images/tag-background.svg" alt="tags" />
      </div>
      <div className="grid">
        <div className="col1">
          <div className="welcome"><h1>{`Welcome ${company.name}!`}</h1></div>
          <div className="carbon-footprint">
            <h2>Your Carbon Footprint:</h2>
            {company.c_footprint_mt !== 0
              ? company.c_footprint_mt
              : <p>Please add 100% of your products to calculate your overall Carbon Footprint</p>}
          </div>
          <div className="transparency-score">
            <h2>Your Transparency Score:</h2>
            <p>{`${company.transparency_score}/10`}</p>
          </div>
        </div>
        <div className="col2">
          <div className="carbon-goal"><h2>Your Carbon Goal</h2></div>
          <div className="carbon-goal_container">
            <h2>{company.carbon_goal}<br />tCO<span>&#8322;</span>e</h2>
          </div>
        </div>
        <div className="col3">
          <div className="add-product">
            <p>Add more products to increase your<br />Transparency Score.</p>
            <div className="cm-arrow-img bounce3">
              <img className="cm-arrow" src="/images/down-arrow.svg" alt="arrow" />
            </div>
          </div>
          <div className="add-container">
            <div className="add">
              <Link className="add-link" href="/product">ADD PRODUCT</Link>
            </div>
          </div>
        </div>
      </div>

      <div className="c-products-container">
        <div className="flex-prods">
          <div className="your-products-header"><h3>YOUR PRODUCTS</h3></div>
          <div className="product-list">
            {products.map((product) => (
              <div key={product.id} className="single-product">
                <div className="c-product-photo">
                  <img src={product.photo_url} alt="product" />
                </div>
                <div className="c-product-table">
                  <table>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Carbon Footprint</th>
                        <th></th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{product.name}</td>
                        <td>{product.carbon_footprint_kg} kg CO<span>&#8322;</span>e</td>
                        <td>
                          <Link className="edit-button" href={`/company/product/${product.id}`}>
                            <img className="edit-pencil" src="/images/edit-pencil.svg" alt="edit" />
                          </Link>
                        </td>
                        <td>
                          <button
                            className="delete-button"
                            onClick={() => deleteProduct.mutate(product.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
