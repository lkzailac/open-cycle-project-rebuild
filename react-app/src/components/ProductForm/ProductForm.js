import React, {useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { createProduct } from '../../store/products';


import downArrow from "../../images/down-arrow.svg";
import "./productform.css";


const ProductForm = () => {
    const company = useSelector(state => state.csession.company)
    const components = useSelector(state => state.products.components)
    const manufacturing_processes = useSelector(state => state.products.manufacturing)
    const consumer_uses = useSelector(state => state.products.consumer_uses)
    const factories = useSelector(state => state.products.factories)
    const transport_modes = useSelector(state => state.products.transport_modes)
    const [name, setName] = useState('')
    const [photo_url, setphoto_url] = useState('')
    const [product_category, setProductCategory] = useState('')
    const [componentChecked, setComponentChecked] = useState(new Array(components.length).fill(false))
    const [compArray, setCompArray] = useState(null)
    const [useChecked, setUseChecked] = useState(new Array(consumer_uses.length).fill(false))
    const [useArray, setUseArray] = useState(null)
    const [manufacturing_process_id, setManufacturing_process_id] = useState(1)
    const [product_weight_g, setProduct_weight_g] = useState(0)
    const [package_weight_g, setPackage_weight_g] = useState(0)
    const [factory_id,  setFactory_id] = useState(1)
    const [unit, setUnit] = useState("pair")
    const [transport_mode_id, setTransport_mode_id] = useState(1)
    const [number_of_cycles, setNumber_of_cycles] = useState(5)
    const [returnable, setReturnable] = useState("")
    const [product_returned_percent, setProduct_returned_percent] = useState(0)
    const [product_recycled_percent, setProduct_recycled_percent] = useState(0)
    const [nameErrors, setNameErrors] = useState([]);
    const [photoErrors, setPhotoErrors] = useState([]);
    const [categoryErrors, setCategoryErrors] = useState([]);
    const [compErrors, setCompErrors] = useState([]);
    const [prodWeightErrors, setProdWeightErrors] = useState([]);
    const [packWeightErrors, setPackWeightErrors] = useState([]);
    const [useErrors, setUseErrors] = useState([]);

    const history = useHistory()
    const dispatch = useDispatch()

    const onSubmit = async (e) => {
        e.preventDefault();

        let returnBoolean;
        if (returnable === "yes") {
            returnBoolean = true
        } else {
            returnBoolean = false
        }


        const product = {
            name,
            photo_url,
            "company_id": company.id,
            product_category,
            compArray,
            "manufacturing_process_id": Number(manufacturing_process_id),
            "product_weight_g": Number(product_weight_g),
            "package_weight_g": Number(package_weight_g),
            "factory_id": Number(factory_id),
            unit,
            "transport_mode_id": Number(transport_mode_id),
            useArray,
            "number_of_cycles": Number(number_of_cycles),
            "returnable": returnBoolean,
            "product_returned_percent": Number(product_returned_percent),
            "product_recycled_percent": Number(product_recycled_percent),

        }
        const data = await dispatch(createProduct(product))

        if(data.errors) {
            console.log("data.errors------", data.errors)

            setNameErrors(data.errors.filter((error) =>
            error.split(":")[0] === "name ").map((error) => {
                return error.split(":")[1];
            }))

            setPhotoErrors(data.errors.filter((error) =>
            error.split(":")[0] === "photo_url ").map((error) => {
                return error.split(":")[1];
            }))

            setCategoryErrors(data.errors.filter((error) =>
            error.split(":")[0] === "product_category ").map((error) => {
                return error.split(":")[1];
            }))

            setCompErrors(data.errors.filter((error) =>
            error.split(":")[0] === "compArray ").map((error) => {
                return "Please choose one or more.";
            }))

            setProdWeightErrors(data.errors.filter((error) =>
            error.split(":")[0] === "product_weight_g ").map((error) => {
                return error.split(":")[1];
            }))

            setPackWeightErrors(data.errors.filter((error) =>
            error.split(":")[0] === "package_weight_g ").map((error) => {
                return error.split(":")[1];
            }))

            setUseErrors(data.errors.filter((error) =>
            error.split(":")[0] === "useArray ").map((error) => {
                return "Please choose one or more.";
            }))


        } else {
            history.push(`/company/${company.id}`)
        }




    }

    const updateName = (e) => {
        setName(e.target.value)
    }

    const updatephoto_url = (e) => {
        setphoto_url(e.target.value)
    }

    const updateProductCategory = (e) => {
        setProductCategory(e.target.value)
    }


    let totalComponents = new Array();
    const updateComponents = (position) => {
        const updatedCheckedState = componentChecked.map((item, index) =>
            index === position ? !item : item
        );
        setComponentChecked(updatedCheckedState);

        let arr = new Array();
        for (const [index, element] of updatedCheckedState.entries()) {
            if (element === true) {
                arr.push(components[index].id)
            } else {
                arr.push(element)
            }
        }
        totalComponents = arr.filter((el) => el !== false)
        setCompArray(totalComponents)

    }



    const updateManufProcess = (e) => {
        setManufacturing_process_id(e.target.value)
    }

    const updateProdweight = (e) => {
        setProduct_weight_g(e.target.value)
    }

    const updatePackweight = (e) => {
        setPackage_weight_g(e.target.value)
    }

    const updateFactId = (e) => {
        setFactory_id(e.target.value)
    }

    const updateUnit = (e) => {
        setUnit(e.target.value)
    }

    const updateTransMode = (e) => {
        setTransport_mode_id(e.target.value)
    }

    let totalUses = new Array();
    const updateUse = (position) => {
        const updatedCheckedState = useChecked.map((item, index) =>
            index === position ? !item : item
        );
        setUseChecked(updatedCheckedState);

        let arr = new Array();
        for (const [index, element] of updatedCheckedState.entries()) {
            if (element === true) {
                arr.push(consumer_uses[index].id)
            } else {
                arr.push(element)
            }
        }
        totalUses = arr.filter((el) => el !== false)
        setUseArray(totalUses)

    }

    const updateCycles = (e) => {
        setNumber_of_cycles(e.target.value)
    }

    const updateReturn = (e) => {
        setReturnable(e.target.value)
    }

    const updateReturnPer =(e) => {
        setProduct_returned_percent(e.target.value)
    }

    const updateRecyPer = (e) => {
        setProduct_recycled_percent(e.target.value)
    }

    let returnElements;
    if (returnable === "yes") {
        returnElements = (
            <>
            <div className='field-contain'>
                <div className='pf-label-container'>
                    <label>Percentage Returned</label>
                </div>
                    <input
                    type="number"
                    min="1" max="100"
                    name="product_returned_percent"
                    onChange={updateReturnPer}
                    value={product_returned_percent}
                    ></input>
            </div>
            <div className='field-contain'>
                <div className='pf-label-container'>
                    <label>{`Percentage Recycled by ${company.name}`}</label>
                </div>
                <input
                type="number"
                min="1" max="100"
                name="product_recycled_percent"
                onChange={updateRecyPer}
                value={product_recycled_percent}
                ></input>
            </div>
            </>
        )
    } else if (returnable === "no") {
        returnElements = (
            <>
                <p>Consider accepting your product back at the end of its life <br></br>in order to decrease its carbon footprint. </p>
            </>
        )
    } else {
        returnElements = (
            <>
            </>
        )

    }


    return (
        <div className='pf-outer'>
      <div className='product-form-container'>
        <div className="pf-blurb-container">
          <div className='pf-blurb-p'>
            <p>Share your product details <br></br>and spread transparency.</p>
          </div>
          <div className='pf-arrow bounce3'>
            <img alt='arrow' src={downArrow} />
          </div>
        </div>
        <form className='pf-form'onSubmit={onSubmit}>
            <div className='field-contain'>
              <div className='pf-label-container'>
                <label>Product Name</label>
                {nameErrors ? nameErrors.map((error) => (
                    <div className='errors inline-error'>{error}</div>
                )) : null}
              </div>
              <input
                type="text"
                name="name"
                onChange={updateName}
                value={name}
              ></input>
            </div>
            <div className='field-contain'>
              <div className='pf-label-container'>
                <label>Image Url</label>
                {photoErrors ? photoErrors.map((error) => (
                    <div className='errors inline-error'>{error}</div>
                )) : null}
                {/* <button className='question-button' value='admin_email' onClick={(e) => [handleClick(e.target.value), console.log("button")]}><img className='question' src={question} /></button> */}
                {/* <button className='question-button' value='admin_email' onClick={(e) => handleClick(e.target.value)}>Button</button> */}
              </div>
              <input
                type="text"
                name="photo_url"
                onChange={updatephoto_url}
                value={photo_url}
              ></input>
            </div>
            <div className='field-contain'>
              <div className='pf-label-container'>
                <label>Product Category</label>
                {categoryErrors ? categoryErrors.map((error) => (
                    <div className='errors inline-error'>{error}</div>
                )) : null}
              </div>
              <input
                type="text"
                name="product_category"
                onChange={updateProductCategory}
                value={product_category}
              ></input>
            </div>

            <div className='field-contain'>
                <div className='pf-label-container'>
                    <label>Components</label>
                    {compErrors ? compErrors.map((error) => (
                    <div className='errors inline-error'>{error}</div>
                )) : null}
                </div>
                <ul className= 'components-list'>
                {components.map((component, index) => (
                    <li key={index}>
                        <div className='ck-label-container'>
                            <label htmlFor={component.id}>{component.name}</label>
                        </div>
                        <input
                        type="checkbox"
                        id={component.id}
                        onChange={() => updateComponents(index)}
                        name={component.id}
                        value={component.id}
                        checked={componentChecked[index]}>
                        </input>
                    </li>
                ))}
                </ul>
            </div>

            <div className='field-contain'>
              <div className='pf-label-container'>
                <label>Manufacturing Process</label>
              </div>
              <select value={manufacturing_process_id} onChange={updateManufProcess}>
                  {manufacturing_processes.map((process) => (
                      <option key={process.id} value={process.id}>{process.name}</option>
                  ))}
              </select>
            </div>
            <div className='field-contain'>
              <div className='pf-label-container'>
                <label>Product Weight (g)</label>
                {prodWeightErrors ? prodWeightErrors.map((error) => (
                    <div className='errors inline-error'>{error}</div>
                )) : null}
              </div>
              <input
                type="text"
                name="product_weight_g"
                onChange={updateProdweight}
                value={product_weight_g}
              ></input>
            </div>
            <div className='field-contain'>
              <div className='pf-label-container'>
                <label>Package Weight (g)</label>
                {packWeightErrors ?packWeightErrors.map((error) => (
                    <div className='errors inline-error'>{error}</div>
                )) : null}
              </div>
              <input
                type="text"
                name="package_weight_g"
                onChange={updatePackweight}
                value={package_weight_g}
              ></input>
            </div>
            <div className='field-contain'>
              <div className='pf-label-container'>
                <label>Factory</label>
              </div>
              <select value={factory_id} onChange={updateFactId}>
                  {factories.map((fact) => (
                      <option key={fact.id} value={fact.id}>{fact.name}</option>
                  ))}
              </select>
            </div>
            <div className='field-contain'>
              <div className='pf-label-container'>
                <label>Unit</label>
              </div>
              <select value={unit} onChange={updateUnit}>
                    <option key="unit1" value="Pair">Pair</option>
                    <option key="unit2" value="Single">Single</option>
              </select>
            </div>
            <div className='field-contain'>
                <div className='pf-label-container'>
                    <label>Transport Mode</label>
                </div>
                <select value={transport_mode_id} onChange={updateTransMode}>
                    {transport_modes.map((trans) => (
                        <option key={trans.id} value={trans.id}>{trans.name}</option>
                    ))}
                </select>
            </div>
            <div className='field-contain'>
                <div className='pf-label-container'>
                    <label>Consumer Uses</label>
                    {useErrors ? useErrors.map((error) => (
                    <div className='errors inline-error'>{error}</div>
                )) : null}
                </div>
                <ul className= 'uses-list'>
                {consumer_uses.map((use, index) => (
                    <li key={index}>
                        <div className='ck-label-container'>
                            <label htmlFor={use.id}>{use.name}</label>
                        </div>
                        <input
                        type="checkbox"
                        onChange={() => updateUse(index)}
                        id={use.id}
                        name={use.id}
                        value={use.id}
                        checked={useChecked[index]} >
                        </input>
                    </li>
                ))}
                </ul>
            </div>
            <div className='field-contain'>
                <div className='pf-label-container'>
                    <label>Number of Use Cycles</label>
                </div>
                <select value={number_of_cycles} onChange={updateCycles}>
                        <option  key="cycle1" value={5}>5</option>
                        <option  key="cycle2" value={25}>25</option>
                        <option  key="cycle3" value={50}>50</option>
                        <option  key="cycle4" value={100}>100</option>
                        <option  key="cycle5" value={200}>200</option>
                        <option  key="cycle6" value={500}>500</option>
                </select>
            </div>
            <div className='field-contain'>
                <div className='pf-label-container'>
                    <label>Returnable at End of Life?</label>
                </div>
                <input className='pf-radio' type="radio" name="returnable" value="yes" onChange={updateReturn}></input>
                <label className='pf-radio-label'>Yes</label>
                <input className='pf-radio' type="radio" name="returnable" value="no" onChange={updateReturn}></input>
                <label className='pf-radio-label'>Not Yet</label>
            </div>
            <div className='pf-return-elements'>
                { returnElements }
            </div>


            <p className='full-width'>
              <button className='create-button' type="submit">SUBMIT PRODUCT</button>
            </p>

        </form>

      </div>
    </div >
    )
}

export default ProductForm;
