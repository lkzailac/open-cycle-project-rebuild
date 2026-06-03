"use client";

import { useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { useProduct } from "@/hooks/useProduct";
import { useCompanyData } from "@/hooks/useCompanyData";
import { useUpdateProduct } from "@/hooks/useProductMutations";
import type { Product } from "@/types";
import "./ProductPage.css";

interface ProductPageProps {
  productId: number;
}

type EditField = keyof Product | null;

export default function ProductPage({ productId }: ProductPageProps) {
  const company = useAuthStore((s) => s.company)!;
  const { data: currentProd, isLoading: prodLoading } = useProduct(productId);
  const { data: companyData, isLoading: dataLoading } = useCompanyData(company.id);
  const updateProduct = useUpdateProduct(productId, company.id);

  const [editField, setEditField] = useState<EditField>(null);
  const [fieldValue, setFieldValue] = useState<string | number | boolean | number[]>("");

  const components = companyData?.components ?? [];
  const manufacturing_processes = companyData?.manufacturing ?? [];
  const consumer_uses = companyData?.consumer_uses ?? [];
  const factories = companyData?.factories ?? [];
  const transport_modes = companyData?.transport_modes ?? [];

  const [componentChecked, setComponentChecked] = useState<boolean[]>([]);
  const [useChecked, setUseChecked] = useState<boolean[]>([]);

  if (prodLoading || dataLoading) return <div className="loading">Loading...</div>;
  if (!currentProd) return null;

  const startEdit = (field: EditField) => {
    setEditField(field);
    setFieldValue("");
    setComponentChecked(new Array(components.length).fill(false));
    setUseChecked(new Array(consumer_uses.length).fill(false));
  };

  const save = async (patch: Partial<Product>) => {
    await updateProduct.mutateAsync({ id: productId, ...patch });
    setEditField(null);
  };

  const getCheckedIds = (checked: boolean[], items: { id: number }[]) =>
    checked.reduce<number[]>((acc, v, i) => (v ? [...acc, items[i].id] : acc), []);

  const toggleArr = (
    i: number,
    arr: boolean[],
    setArr: (v: boolean[]) => void,
    len: number
  ) => {
    const next = arr.length < len ? new Array(len).fill(false) : [...arr];
    next[i] = !next[i];
    setArr(next);
  };

  const pencil = <img className="edit-pencil" src="/images/edit-pencil.svg" alt="edit" />;

  const miniForm = (content: React.ReactNode, onSave: () => void) => (
    <div className="mini-form">
      {content}
      <div className="save-button-contain">
        <button className="save-button" onClick={onSave}>Save</button>
      </div>
    </div>
  );

  const rows: Array<{
    label: string;
    field: EditField;
    display: React.ReactNode;
    editor: React.ReactNode;
  }> = [
    {
      label: "Product Name", field: "name",
      display: currentProd.name,
      editor: miniForm(
        <input type="text" value={fieldValue as string} onChange={(e) => setFieldValue(e.target.value)} />,
        () => save({ name: fieldValue as string })
      ),
    },
    {
      label: "Photo", field: "photo_url",
      display: <div className="product-image"><img src={currentProd.photo_url} alt="product" /></div>,
      editor: miniForm(
        <input type="text" value={fieldValue as string} onChange={(e) => setFieldValue(e.target.value)} />,
        () => save({ photo_url: fieldValue as string })
      ),
    },
    {
      label: "Product Category", field: "product_category",
      display: currentProd.product_category,
      editor: miniForm(
        <input type="text" value={fieldValue as string} onChange={(e) => setFieldValue(e.target.value)} />,
        () => save({ product_category: fieldValue as string })
      ),
    },
    {
      label: "Components", field: "components",
      display: currentProd.components?.map((c) => <p key={c.id}>{c.name}</p>),
      editor: miniForm(
        <ul className="components-list">
          {components.map((c, i) => (
            <li key={c.id}>
              <label htmlFor={`comp-${c.id}`}>{c.name}</label>
              <input type="checkbox" id={`comp-${c.id}`} checked={componentChecked[i] ?? false}
                onChange={() => toggleArr(i, componentChecked, setComponentChecked, components.length)} />
            </li>
          ))}
        </ul>,
        () => save({ components: getCheckedIds(componentChecked, components).map((id) => ({ id, name: "" })) } as Partial<Product>)
      ),
    },
    {
      label: "Manufacturing Process", field: "manufacturing_process_id",
      display: manufacturing_processes.find((p) => p.id === currentProd.manufacturing_process_id)?.name,
      editor: miniForm(
        <select value={fieldValue as number} onChange={(e) => setFieldValue(Number(e.target.value))}>
          {manufacturing_processes.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
        </select>,
        () => save({ manufacturing_process_id: fieldValue as number })
      ),
    },
    {
      label: "Product Weight (g)", field: "product_weight_g",
      display: currentProd.product_weight_g,
      editor: miniForm(
        <input type="number" value={fieldValue as number} onChange={(e) => setFieldValue(Number(e.target.value))} />,
        () => save({ product_weight_g: fieldValue as number })
      ),
    },
    {
      label: "Package Weight (g)", field: "package_weight_g",
      display: currentProd.package_weight_g,
      editor: miniForm(
        <input type="number" value={fieldValue as number} onChange={(e) => setFieldValue(Number(e.target.value))} />,
        () => save({ package_weight_g: fieldValue as number })
      ),
    },
    {
      label: "Factory", field: "factory_id",
      display: factories.find((f) => f.id === currentProd.factory_id)?.name,
      editor: miniForm(
        <select value={fieldValue as number} onChange={(e) => setFieldValue(Number(e.target.value))}>
          {factories.map((f) => <option key={f.id} value={f.id}>{f.name}</option>)}
        </select>,
        () => save({ factory_id: fieldValue as number })
      ),
    },
    {
      label: "Unit", field: "unit",
      display: currentProd.unit,
      editor: miniForm(
        <select value={fieldValue as string} onChange={(e) => setFieldValue(e.target.value)}>
          <option value="Pair">Pair</option>
          <option value="Single">Single</option>
        </select>,
        () => save({ unit: fieldValue as string })
      ),
    },
    {
      label: "Transport Mode", field: "transport_mode_id",
      display: transport_modes.find((m) => m.id === currentProd.transport_mode_id)?.name,
      editor: miniForm(
        <select value={fieldValue as number} onChange={(e) => setFieldValue(Number(e.target.value))}>
          {transport_modes.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}
        </select>,
        () => save({ transport_mode_id: fieldValue as number })
      ),
    },
    {
      label: "Consumer Uses", field: "uses",
      display: currentProd.uses?.length ? currentProd.uses.map((u) => <p key={u.id}>{u.name}</p>) : <p>None</p>,
      editor: miniForm(
        <ul className="uses-list">
          {consumer_uses.map((u, i) => (
            <li key={u.id}>
              <label htmlFor={`use-${u.id}`}>{u.name}</label>
              <input type="checkbox" id={`use-${u.id}`} checked={useChecked[i] ?? false}
                onChange={() => toggleArr(i, useChecked, setUseChecked, consumer_uses.length)} />
            </li>
          ))}
        </ul>,
        () => save({ uses: getCheckedIds(useChecked, consumer_uses).map((id) => ({ id, name: "" })) } as Partial<Product>)
      ),
    },
    {
      label: "Number of Use Cycles", field: "number_of_cycles",
      display: currentProd.number_of_cycles,
      editor: miniForm(
        <select value={fieldValue as number} onChange={(e) => setFieldValue(Number(e.target.value))}>
          {[5, 25, 50, 100, 200, 500].map((n) => <option key={n} value={n}>{n}</option>)}
        </select>,
        () => save({ number_of_cycles: fieldValue as number })
      ),
    },
    {
      label: "Returnable?", field: "returnable",
      display: currentProd.returnable ? "Yes" : "No",
      editor: miniForm(
        <div>
          <input type="radio" name="ret" value="yes" onChange={() => setFieldValue(true)} /> Yes
          <input type="radio" name="ret" value="no" onChange={() => setFieldValue(false)} /> Not Yet
        </div>,
        () => save({ returnable: fieldValue as boolean })
      ),
    },
    ...(currentProd.returnable ? [
      {
        label: "Percentage Returned", field: "product_returned_percent" as EditField,
        display: currentProd.product_returned_percent,
        editor: miniForm(
          <input type="number" min={1} max={100} value={fieldValue as number} onChange={(e) => setFieldValue(Number(e.target.value))} />,
          () => save({ product_returned_percent: fieldValue as number })
        ),
      },
      {
        label: "Percentage Recycled", field: "product_recycled_percent" as EditField,
        display: currentProd.product_recycled_percent,
        editor: miniForm(
          <input type="number" min={1} max={100} value={fieldValue as number} onChange={(e) => setFieldValue(Number(e.target.value))} />,
          () => save({ product_recycled_percent: fieldValue as number })
        ),
      },
    ] : []),
  ];

  return (
    <div className="pp-contain">
      <div className="product-page-container">
        <div className="blurb-container">
          <div className="blurb-p">
            <p>Update your product <br />to recalculate the carbon footprint.</p>
          </div>
          <div className="arrow-img bounce3">
            <img className="pe-arrow" src="/images/down-arrow.svg" alt="arrow" />
          </div>
        </div>
        <div className="footprint-container">
          <h2>Carbon Footprint</h2>
          <p>{currentProd.carbon_footprint_kg}</p>
        </div>
        <div className="edit-prod-table-container">
          <table className="edit-product-table">
            <tbody>
              {rows.map(({ label, field, display, editor }) => (
                <tr key={label}>
                  <th className="prod-table-head">{label}</th>
                  <td>{editField === field ? editor : display}</td>
                  <td>
                    <button className="edit-button" onClick={() => startEdit(editField === field ? null : field)}>
                      {pencil}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
