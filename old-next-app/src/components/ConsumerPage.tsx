"use client";

import { useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { useAllProducts } from "@/hooks/useAllProducts";
import Search from "@/components/Search";
import "./ConsumerPage.css";

export default function ConsumerPage() {
  const user = useAuthStore((s) => s.user)!;
  const { data, isLoading } = useAllProducts(user.id);
  const [term, setTerm] = useState("");

  if (isLoading) return <div className="loading">Loading products...</div>;

  const all = data?.all ?? [];

  const filtered = all.filter(
    (item) =>
      item.name.toLowerCase().includes(term.toLowerCase()) ||
      item.company_name.toLowerCase().includes(term.toLowerCase()) ||
      item.product_category.toLowerCase().includes(term.toLowerCase())
  );

  return (
    <div className="consumer-page-container">
      <div className="consumer-page-content">
        <div className="blurb-search">
          <div className="consumer-blurb">
            <p>Check out the Carbon Scores<br />of your favorite company&apos;s products.</p>
            <div className="arrow-img bounce3">
              <img className="arrow" src="/images/down-arrow.svg" alt="arrow" />
            </div>
          </div>
          <div className="search-container">
            <Search onChange={setTerm} />
          </div>
        </div>
        <div className="all-prod-container">
          {filtered.map((item, j) => (
            <div key={j} className="item-container">
              <div className="single-company-products">
                <h3>{item.company_name}</h3>
                <div className="product-photo_cp">
                  <img src={item.photo_url} alt="product" />
                </div>
                <div className="p-name-contain">
                  <h2 className="prod-name">{item.name}</h2>
                </div>
              </div>
              <div className="prod-info">
                <div className="footprint">
                  Carbon Footprint:
                  <p>{item.carbon_footprint_kg} kg CO<span>&#8322;</span>e</p>
                </div>
                <div className="returnable">
                  Returnable at the end of life?
                  {item.returnable
                    ? <p>Yes, this item can be returned <br />to {item.company_name}.</p>
                    : <p>No, please consider repairing or recycling.</p>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
