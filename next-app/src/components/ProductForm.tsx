"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { useCompanyData } from "@/hooks/useCompanyData";
import { useCreateProduct } from "@/hooks/useProductMutations";
import "./ProductForm.css";

export default function ProductForm() {
  const router = useRouter();
  const company = useAuthStore((s) => s.company)!;
  const { data } = useCompanyData(company.id);
  const createProduct = useCreateProduct(company.id);

  const components = data?.components ?? [];
  const manufacturing_processes = data?.manufacturing ?? [];
  const consumer_uses = data?.consumer_uses ?? [];
  const factories = data?.factories ?? [];
  const transport_modes = data?.transport_modes ?? [];

  const [name, setName] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [componentChecked, setComponentChecked] = useState<boolean[]>([]);
  const [useChecked, setUseChecked] = useState<boolean[]>([]);
  const [manufacturingProcessId, setManufacturingProcessId] = useState(1);
  const [productWeightG, setProductWeightG] = useState(0);
  const [packageWeightG, setPackageWeightG] = useState(0);
  const [factoryId, setFactoryId] = useState(1);
  const [unit, setUnit] = useState("Pair");
  const [transportModeId, setTransportModeId] = useState(1);
  const [numberOfCycles, setNumberOfCycles] = useState(5);
  const [returnable, setReturnable] = useState("");
  const [productReturnedPercent, setProductReturnedPercent] = useState(0);
  const [productRecycledPercent, setProductRecycledPercent] = useState(0);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const getCheckedIds = (checked: boolean[], items: { id: number }[]) =>
    checked.reduce<number[]>((acc, v, i) => (v ? [...acc, items[i].id] : acc), []);

  const toggleComponent = (i: number) => {
    const next = components.length > componentChecked.length
      ? new Array(components.length).fill(false)
      : [...componentChecked];
    next[i] = !next[i];
    setComponentChecked(next);
  };

  const toggleUse = (i: number) => {
    const next = consumer_uses.length > useChecked.length
      ? new Array(consumer_uses.length).fill(false)
      : [...useChecked];
    next[i] = !next[i];
    setUseChecked(next);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const compArray = getCheckedIds(componentChecked, components);
    const useArray = getCheckedIds(useChecked, consumer_uses);

    try {
      await createProduct.mutateAsync({
        name, photo_url: photoUrl, company_id: company.id,
        product_category: productCategory,
        compArray: compArray.length ? compArray : null,
        manufacturing_process_id: Number(manufacturingProcessId),
        product_weight_g: Number(productWeightG),
        package_weight_g: Number(packageWeightG),
        factory_id: Number(factoryId), unit,
        transport_mode_id: Number(transportModeId),
        useArray: useArray.length ? useArray : null,
        number_of_cycles: Number(numberOfCycles),
        returnable: returnable === "yes",
        product_returned_percent: Number(productReturnedPercent),
        product_recycled_percent: Number(productRecycledPercent),
      });
      router.push(`/company/${company.id}`);
    } catch (err: unknown) {
      const apiErr = err as { errors?: string[] };
      if (apiErr.errors) {
        const map: Record<string, string> = {};
        apiErr.errors.forEach((e) => {
          const [field, msg] = e.split(":");
          if (field && msg) map[field.trim()] = msg.trim();
        });
        setFieldErrors(map);
      }
    }
  };

  return (
    <div className="pf-outer">
      <div className="product-form-container">
        <div className="pf-blurb-container">
          <div className="pf-blurb-p">
            <p>Share your product details <br />and spread transparency.</p>
          </div>
          <div className="pf-arrow bounce3">
            <img alt="arrow" src="/images/down-arrow.svg" />
          </div>
        </div>
        <form className="pf-form" onSubmit={handleSubmit}>
          <div className="field-contain">
            <div className="pf-label-container">
              <label>Product Name</label>
              {fieldErrors.name && <div className="errors inline-error">{fieldErrors.name}</div>}
            </div>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="field-contain">
            <div className="pf-label-container">
              <label>Image Url</label>
              {fieldErrors.photo_url && <div className="errors inline-error">{fieldErrors.photo_url}</div>}
            </div>
            <input type="text" value={photoUrl} onChange={(e) => setPhotoUrl(e.target.value)} />
          </div>
          <div className="field-contain">
            <div className="pf-label-container">
              <label>Product Category</label>
              {fieldErrors.product_category && <div className="errors inline-error">{fieldErrors.product_category}</div>}
            </div>
            <input type="text" value={productCategory} onChange={(e) => setProductCategory(e.target.value)} />
          </div>
          <div className="field-contain">
            <div className="pf-label-container">
              <label>Components</label>
              {fieldErrors.compArray && <div className="errors inline-error">{fieldErrors.compArray}</div>}
            </div>
            <ul className="components-list">
              {components.map((c, i) => (
                <li key={c.id}>
                  <div className="ck-label-container"><label htmlFor={String(c.id)}>{c.name}</label></div>
                  <input type="checkbox" id={String(c.id)} checked={componentChecked[i] ?? false} onChange={() => toggleComponent(i)} />
                </li>
              ))}
            </ul>
          </div>
          <div className="field-contain">
            <div className="pf-label-container"><label>Manufacturing Process</label></div>
            <select value={manufacturingProcessId} onChange={(e) => setManufacturingProcessId(Number(e.target.value))}>
              {manufacturing_processes.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
          </div>
          <div className="field-contain">
            <div className="pf-label-container">
              <label>Product Weight (g)</label>
              {fieldErrors.product_weight_g && <div className="errors inline-error">{fieldErrors.product_weight_g}</div>}
            </div>
            <input type="number" value={productWeightG} onChange={(e) => setProductWeightG(Number(e.target.value))} />
          </div>
          <div className="field-contain">
            <div className="pf-label-container">
              <label>Package Weight (g)</label>
              {fieldErrors.package_weight_g && <div className="errors inline-error">{fieldErrors.package_weight_g}</div>}
            </div>
            <input type="number" value={packageWeightG} onChange={(e) => setPackageWeightG(Number(e.target.value))} />
          </div>
          <div className="field-contain">
            <div className="pf-label-container"><label>Factory</label></div>
            <select value={factoryId} onChange={(e) => setFactoryId(Number(e.target.value))}>
              {factories.map((f) => <option key={f.id} value={f.id}>{f.name}</option>)}
            </select>
          </div>
          <div className="field-contain">
            <div className="pf-label-container"><label>Unit</label></div>
            <select value={unit} onChange={(e) => setUnit(e.target.value)}>
              <option value="Pair">Pair</option>
              <option value="Single">Single</option>
            </select>
          </div>
          <div className="field-contain">
            <div className="pf-label-container"><label>Transport Mode</label></div>
            <select value={transportModeId} onChange={(e) => setTransportModeId(Number(e.target.value))}>
              {transport_modes.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}
            </select>
          </div>
          <div className="field-contain">
            <div className="pf-label-container">
              <label>Consumer Uses</label>
              {fieldErrors.useArray && <div className="errors inline-error">{fieldErrors.useArray}</div>}
            </div>
            <ul className="uses-list">
              {consumer_uses.map((u, i) => (
                <li key={u.id}>
                  <div className="ck-label-container"><label htmlFor={String(u.id)}>{u.name}</label></div>
                  <input type="checkbox" id={String(u.id)} checked={useChecked[i] ?? false} onChange={() => toggleUse(i)} />
                </li>
              ))}
            </ul>
          </div>
          <div className="field-contain">
            <div className="pf-label-container"><label>Number of Use Cycles</label></div>
            <select value={numberOfCycles} onChange={(e) => setNumberOfCycles(Number(e.target.value))}>
              {[5, 25, 50, 100, 200, 500].map((n) => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>
          <div className="field-contain">
            <div className="pf-label-container"><label>Returnable at End of Life?</label></div>
            <input className="pf-radio" type="radio" name="returnable" value="yes" onChange={(e) => setReturnable(e.target.value)} />
            <label className="pf-radio-label">Yes</label>
            <input className="pf-radio" type="radio" name="returnable" value="no" onChange={(e) => setReturnable(e.target.value)} />
            <label className="pf-radio-label">Not Yet</label>
          </div>
          {returnable === "yes" && (
            <div className="pf-return-elements">
              <div className="field-contain">
                <div className="pf-label-container"><label>Percentage Returned</label></div>
                <input type="number" min={1} max={100} value={productReturnedPercent} onChange={(e) => setProductReturnedPercent(Number(e.target.value))} />
              </div>
              <div className="field-contain">
                <div className="pf-label-container"><label>{`Percentage Recycled by ${company.name}`}</label></div>
                <input type="number" min={1} max={100} value={productRecycledPercent} onChange={(e) => setProductRecycledPercent(Number(e.target.value))} />
              </div>
            </div>
          )}
          {returnable === "no" && (
            <div className="pf-return-elements">
              <p>Consider accepting your product back at the end of its life to decrease its carbon footprint.</p>
            </div>
          )}
          <p className="full-width">
            <button className="create-button" type="submit" disabled={createProduct.isPending}>
              {createProduct.isPending ? "Submitting..." : "SUBMIT PRODUCT"}
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}
