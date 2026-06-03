import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { updateProduct, getCurrentProd } from '../../store/products';
import { getProducts } from '../../store/products';


import downArrow from "../../images/down-arrow.svg";
import editPencil from "../../images/edit-pencil.svg";
import "./productpage.css";

const ProductPage = () => {
    const company = useSelector(state => state.csession.company)
    // const products = useSelector(state => state.products.products)
    // const currentProd = products.filter((prod) => prod.id == id)
    const currentProd = useSelector(state => state.products.product)
    const components = useSelector(state => state.products.components)
    const manufacturing_processes = useSelector(state => state.products.manufacturing)
    const consumer_uses = useSelector(state => state.products.consumer_uses)
    const factories = useSelector(state => state.products.factories)
    const transport_modes = useSelector(state => state.products.transport_modes)

    const [name, setName] = useState("")
    const [editName, setEditName] = useState(false)
    const [photo_url, setphoto_url] = useState("")
    const [editPhoto, setEditPhoto] = useState(false)
    const [product_category, setProductCategory] = useState("")
    const [editCategory , setEditCategory] =useState(false);
    const [componentChecked, setComponentChecked] = useState(new Array(components?.length).fill(false))
    const [compArray, setCompArray] = useState(null)
    const [editcompArray , setEditCompArray] =useState(false);
    const [useSaveed, setUseSaveed] = useState(new Array(consumer_uses?.length).fill(false))
    const [useArray, setUseArray] = useState(null)
    const [editUseArray, setEditUseArray] =useState(false);
    const [manufacturing_process_id, setManufacturing_process_id] = useState(1)
    const [editManu , setEditManu] =useState(false);
    const [product_weight_g, setProduct_weight_g] = useState(0)
    const [editProdWeight , setEditProdWeight] =useState(false);
    const [package_weight_g, setPackage_weight_g] = useState(0)
    const [editPackWeight , setEditPackWeight] =useState(false);
    const [factory_id,  setFactory_id] = useState(1)
    const [editFactId , setEditFactId] =useState(false);
    const [unit, setUnit] = useState("pair")
    const [editUnit , setEditUnit] =useState(false);
    const [transport_mode_id, setTransport_mode_id] = useState(1)
    const [editTransMode , setEditTransMode] =useState(false);
    const [number_of_cycles, setNumber_of_cycles] = useState(0)
    const [editCycles , setEditCycles] =useState(false);
    const [returnable, setReturnable] = useState("")
    const [editRturnable , setEditRetrunable] =useState(false);
    const [product_returned_percent, setProduct_returned_percent] = useState(0)
    const [editProdReturn , setEditProdReturn] =useState(false);
    const [product_recycled_percent, setProduct_recycled_percent] = useState(0)
    const [editProdRecycle, setEditProdRecycle] =useState(false);


    const history = useHistory()
    const dispatch = useDispatch()

    let location = useLocation()
    let arr = location.pathname.split('')
    let num = arr.splice(17)
    let productId = Number(num.join(""))

    useEffect(() => {
        if (productId) {
            dispatch(getCurrentProd(productId))
        }
    }, [dispatch])

    useEffect(() => {

        dispatch(getProducts(company.id))

    }, [dispatch])

    /////////////////////////////  HANDLE SUBMITS
    const handleNameSub = async (e) => {
        e.preventDefault();
        const product = {"id":productId, "name": name}
        const res= await dispatch(updateProduct(product))
        setEditName(false)
    }

    const handlePhotoSub = async (e) => {
        e.preventDefault();
        const product = {"id":productId, "photo_url": photo_url}
        const res= await dispatch(updateProduct(product))
        setEditPhoto(false)
    }

    const handleCategorySub = async (e) => {
        e.preventDefault();
        const product = {"id":productId, "product_category": product_category}
        const res= await dispatch(updateProduct(product))
        setEditCategory(false)
    }

    const handleCompArray = async (e) => {
        e.preventDefault();
        const product = {"id":productId, "compArray": compArray}
        const res= await dispatch(updateProduct(product))
        setEditCompArray(false)
    }

    const handleManu = async (e) => {
        e.preventDefault();
        const product = {"id":productId, "manufacturing_process_id": manufacturing_process_id}
        const res= await dispatch(updateProduct(product))
        setEditManu(false)
    }

    const handleProdWeight = async (e) => {
        e.preventDefault();
        const product = {"id":productId, "product_weight_g": Number(product_weight_g)}
        const res= await dispatch(updateProduct(product))
        setEditProdWeight(false)
    }

    const handlePackWeight = async (e) => {
        e.preventDefault();
        const product = {"id":productId, "package_weight_g": Number(package_weight_g)}
        const res= await dispatch(updateProduct(product))
        setEditPackWeight(false)
    }

    const handleFactory = async (e) => {
        e.preventDefault();
        const product = {"id":productId, "factory_id": Number(factory_id)}
        const res= await dispatch(updateProduct(product))
        setEditFactId(false)
    }

    const handleUnit = async (e) => {
        e.preventDefault();
        const product = {"id":productId, "unit": unit}
        const res= await dispatch(updateProduct(product))
        setEditUnit(false)
    }

    const handleTrans = async (e) => {
        e.preventDefault();
        const product = {"id":productId, "transport_mode_id": Number(transport_mode_id)}
        const res= await dispatch(updateProduct(product))
        setEditTransMode(false)
    }

    const handleUse = async (e) => {
        e.preventDefault();
        const product = {"id":productId, "useArray": useArray}
        const res= await dispatch(updateProduct(product))
        setEditUseArray(false)
    }

    const handleCycles = async (e) => {
        e.preventDefault();
        const product = {"id":productId, "number_of_cycles": Number(number_of_cycles)}
        const res= await dispatch(updateProduct(product))
        setEditCycles(false)
    }

    const handleReturn = async (e) => {
        e.preventDefault();

        let returnBoolean;
        if (returnable === "yes") {
            returnBoolean = true
        } else {
            returnBoolean = false
        }
        const product = {"id":productId, "returnable": returnBoolean}
        const res= await dispatch(updateProduct(product))
        setEditRetrunable(false)
    }

    const handleReturnPer = async (e) => {
        e.preventDefault();
        const product = {"id":productId, "product_returned_percent": Number(product_returned_percent)}
        const res= await dispatch(updateProduct(product))
        setEditProdReturn(false)
    }

    const handleRecyclePer = async (e) => {
        e.preventDefault();
        const product = {"id":productId, "product_recycled_percent": Number(product_recycled_percent)}
        const res= await dispatch(updateProduct(product))
        setEditProdRecycle(false)
    }

    // const onSubmit = async (e) => {
    //     e.preventDefault();

    //     let returnBoolean;
    //     if (returnable === "yes") {
    //         returnBoolean = true
    //     } else {
    //         returnBoolean = false
    //     }

    //     let carbon_footprint_kg = getFootprint()

    //     const product = {
    //         name,
    //         photo_url,
    //         "company_id": company.id,
    //         product_category,
    //         compArray,
    //         "manufacturing_process_id": Number(manufacturing_process_id),
    //         "product_weight_g": Number(product_weight_g),
    //         "package_weight_g": Number(package_weight_g),
    //         "factory_id": Number(factory_id),
    //         unit,
    //         "transport_mode_id": Number(transport_mode_id),
    //         useArray,
    //         "number_of_cycles": Number(number_of_cycles),
    //         "returnable": returnBoolean,
    //         "product_returned_percent": Number(product_returned_percent),
    //         "product_recycled_percent": Number(product_recycled_percent),
    //         carbon_footprint_kg
    //     }
    //     const res= await dispatch(updateProduct(product))

    // }


    ///////////////////////////// UPDATE STATES
    const updateName = (e) => {
        setName(e.target.value)
    }

    const updatephoto_url = (e) => {
        setphoto_url(e.target.value)
    }

    const updateProductCategory = (e) => {
        setProductCategory(e.target.value)
    }


    let totalComponents = [];
    const updateComponents = (position) => {
        const updatedCheckedState = componentChecked.map((item, index) =>
            index === position ? !item : item
        );
        setComponentChecked(updatedCheckedState);

        let arr = [];
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
        const updatedSaveedState = useSaveed.map((item, index) =>
            index === position ? !item : item
        );
        setUseSaveed(updatedSaveedState);

        let arr = new Array();
        for (const [index, element] of updatedSaveedState.entries()) {
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



    ///////////////////////////// SHOW CORRESPONDING EDITOR FORM
    let editor;
    if (editName) {
        editor = (
            <div className="mini-form">
              <form onSubmit={handleNameSub}>
                <input
                    type="text"
                    name="name"
                    onChange={updateName}
                    value={name}
                    required={true}
                ></input>
                <div className='save-button-contain'>
                    <button className='save-button' type="submit">Save</button>
                </div>
              </form>
            </div>
        )
    }
    if (editPhoto) {
        editor = (
            <div className="mini-form">
              <form onSubmit={handlePhotoSub}>
                <input
                    type="text"
                    name="photo_url"
                    onChange={updatephoto_url}
                    value={photo_url}
                ></input>
                <div className='save-button-contain'>
                    <button className='save-button' type="submit">Save</button>
                </div>
              </form>
            </div>
        )
    }

    if (editCategory) {
        editor = (
            <div className="mini-form">
              <form onSubmit={handleCategorySub}>
                <input
                    type="text"
                    name="product_category"
                    onChange={updateProductCategory}
                    value={product_category}
                ></input>
                <div className='save-button-contain'>
                    <button className='save-button' type="submit">Save</button>
                </div>
              </form>
            </div>
        )
    }

    if (editcompArray) {
        editor = (
            <div className="mini-form">
              <form onSubmit={handleCompArray}>
                <ul className= 'components-list'>
                    {components?.map((component, index) => (
                        <li key={index}>
                            <div className='label-container'>
                                <label htmlFor={component.id}>{component.name}</label>
                            </div>
                            <input
                            type="checkbox"
                            id={component.id}
                            onChange={() => updateComponents(index)}
                            name={component.id}
                            value={component.id}
                            checked={componentChecked[index]} >

                            </input>
                        </li>
                    ))}
                    </ul>
                    <div className='save-button-contain'>
                        <button className='save-button' type="submit">Save</button>
                    </div>
              </form>
            </div>
        )
    }

    if (editManu) {
        editor = (
            <div className="mini-form">
              <form onSubmit={handleManu}>
                <select value={manufacturing_process_id} onChange={updateManufProcess}>
                    {manufacturing_processes?.map((process) => (
                        <option key={process.id} value={process.id}>{process.name}</option>
                    ))}
                </select>
                <div className='save-button-contain'>
                    <button className='save-button' type="submit">Save</button>
                </div>
              </form>
            </div>
        )
    }

    if (editProdWeight) {
        editor = (
            <div className="mini-form">
              <form onSubmit={handleProdWeight}>
                <input
                    type="text"
                    name="product_weight_g"
                    onChange={updateProdweight}
                    value={product_weight_g}
                ></input>
                <div className='save-button-contain'>
                    <button className='save-button' type="submit">Save</button>
                </div>
              </form>
            </div>
        )
    }

    if (editPackWeight) {
        editor = (
            <div className="mini-form">
              <form onSubmit={handlePackWeight}>
                <input
                    type="text"
                    name="package_weight_g"
                    onChange={updatePackweight}
                    value={package_weight_g}
                ></input>
                <div className='save-button-contain'>
                    <button className='save-button' type="submit">Save</button>
                </div>
              </form>
            </div>
        )
    }

    if (editFactId) {
        editor = (
            <div className="mini-form">
              <form onSubmit={handleFactory}>
                <select value={factory_id} onChange={updateFactId}>
                    {factories?.map((fact) => (
                        <option key={fact.id} value={fact.id}>{fact.name}</option>
                    ))}
                </select>
                <div className='save-button-contain'>
                    <button className='save-button' type="submit">Save</button>
                </div>
              </form>
            </div>
        )
    }

    if (editUnit) {
        editor = (
            <div className="mini-form">
                <form onSubmit={handleUnit}>
                    <select value={unit} onChange={updateUnit}>
                        <option key="unit1" value="Pair">Pair</option>
                        <option key="unit2" value="Single">Single</option>
                    </select>
                    <div className='save-button-contain'>
                        <button className='save-button' type="submit">Save</button>
                    </div>
                </form>
            </div>
        )
    }

    if (editTransMode) {
        editor = (
            <div className="mini-form">
                <form onSubmit={handleTrans}>
                    <select value={transport_mode_id} onChange={updateTransMode}>
                        {transport_modes?.map((trans) => (
                            <option key={trans.id} value={trans.id}>{trans.name}</option>
                        ))}
                    </select>
                    <div className='save-button-contain'>
                        <button className='save-button' type="submit">Save</button>
                    </div>
                </form>
            </div>
        )
    }

    if (editUseArray) {
        editor = (
            <div className="mini-form">
                <form onSubmit={handleUse}>
                    <ul className= 'uses-list'>
                        {consumer_uses?.map((use, index) => (
                            <li key={index}>
                                <div className='label-container'>
                                    <label htmlFor={use.id}>{use.name}</label>
                                </div>
                                <input
                                type="checkbox"
                                onChange={() => updateUse(index)}
                                id={use.id}
                                name={use.id}
                                value={use.id}
                                checked={useSaveed[index]} >
                                </input>
                            </li>
                        ))}
                    </ul>
                    <div className='save-button-contain'>
                        <button className='save-button' type="submit">Save</button>
                    </div>
                </form>
            </div>
        )
    }

    if (editCycles) {
        editor = (
            <div className="mini-form">
                <form onSubmit={handleCycles}>
                    <select value={number_of_cycles} onChange={updateCycles}>
                        <option key="cycle1" value={5}>5</option>
                        <option key="cycle2" value={25}>25</option>
                        <option key="cycle3" value={50}>50</option>
                        <option key="cycle4" value={100}>100</option>
                        <option key="cycle5" value={200}>200</option>
                        <option key="cycle6" value={500}>500</option>
                    </select>
                    <div className='save-button-contain'>
                        <button className='save-button' type="submit">Save</button>
                    </div>
                </form>
            </div>
        )
    }

    if (editRturnable) {
        editor = (
            <div className="mini-form">
                <form id='radios-form' onSubmit={handleReturn}>
                    <input id='radios' type="radio" name="returnable" value="yes" onChange={updateReturn}></input>
                    <label>Yes</label>
                    <input  id='radios' type="radio" name="returnable" value="no" onChange={updateReturn}></input>
                    <label>Not Yet</label>
                    <div className='save-button-contain'>
                        <button className='save-button' type="submit">Save</button>
                    </div>
                </form>
            </div>
        )
    }

    if (editProdReturn) {
        editor = (
            <div className="mini-form">
                <form onSubmit={handleReturnPer}>
                    <input
                        type="number"
                        min="1" max="100"
                        name="product_returned_percent"
                        onChange={updateReturnPer}
                        value={product_returned_percent}
                    ></input>
                    <div className='save-button-contain'>
                        <button className='save-button' type="submit">Save</button>
                    </div>
                </form>
            </div>
        )
    }

    if (editProdRecycle) {
        editor = (
            <div className="mini-form">
                <form onSubmit={handleRecyclePer}>
                    <input
                    type="number"
                    min="1" max="100"
                    name="product_recycled_percent"
                    onChange={updateRecyPer}
                    value={product_recycled_percent}
                    ></input>
                    <div className='save-button-contain'>
                        <button className='save-button' type="submit">Save</button>
                    </div>
                </form>
            </div>
        )
    }


    ///////////////////////////// RENDER
    return (
        <div className="pp-contain">
        <div className='product-page-container'>
            <div className="blurb-container">
                <div className='blurb-p'>
                    <p>Update your product <br></br>to recalculate the carbon footprint.</p>
                </div>
                <div className='arrow-img bounce3'>
                    <img className ='pe-arrow' src={downArrow} alt='arrow'/>
                </div>
            </div>
            <div className='footprint-container'>
                <h2>Carbon Footprint</h2>
                <p>{`${currentProd?.carbon_footprint_kg}`}</p>
            </div>
            <div className='edit-prod-table-container'>
                <table className='edit-product-table'>
                    <tbody>
                        <tr>
                            <th className='prod-table-head'>Product Name</th>
                            <td>{editName ? [editor] : currentProd?.name}</td>
                            <td><button className='edit-button' onClick={() => setEditName(!editName)}><img className='edit-pencil' src={editPencil} alt="pencil"/></button></td>


                        </tr>
                        <tr>
                            <th>Photo</th>
                            <td><div className='product-image'>{editPhoto ? [editor] : <img src={currentProd?.photo_url} alt="prodimage"/>}</div></td>
                            <td><button className='edit-button' onClick={() => setEditPhoto(!editPhoto)}><img className='edit-pencil' src={editPencil} alt="pencil"/></button></td>
                        </tr>
                        <tr>
                            <th>Product Category</th>
                            <td>{editCategory ? [editor] : currentProd?.product_category}</td>
                            <td><button className='edit-button' onClick={() => setEditCategory(!editCategory)}><img className='edit-pencil' src={editPencil} alt="pencil"/></button></td>
                        </tr>
                        <tr>
                            <th>Components</th>
                            <td>
                            {editcompArray ? [editor] : currentProd?.components?.map((comp) => (
                               <p key={comp.id}>{comp.name}</p>
                            ))}
                            </td>
                            <td><button className='edit-button' onClick={() => setEditCompArray(!editcompArray)}><img className='edit-pencil' src={editPencil} alt="pencil"/></button></td>

                        </tr>
                        <tr>
                            <th>Manufacturing Process</th>
                            <td>{editManu ? [editor] : manufacturing_processes?.filter((pro) => pro.id === currentProd?.manufacturing_process_id)[0]?.name }</td>
                            <td><button className='edit-button' onClick={() => setEditManu(!editManu)}><img className='edit-pencil' src={editPencil} alt="pencil"/></button></td>

                        </tr>
                        <tr>
                            <th>Product Weight (g)</th>
                            <td>{editProdWeight ? [editor] : currentProd?.product_weight_g}</td>
                            <td><button className='edit-button' onClick={() => setEditProdWeight(!editProdWeight)}><img className='edit-pencil' src={editPencil} alt="pencil"/></button></td>
                        </tr>
                        <tr>
                            <th>Package Weight (g)</th>
                            <td>{editPackWeight ? [editor] : currentProd?.package_weight_g}</td>
                            <td><button className='edit-button' onClick={() => setEditPackWeight(!editPackWeight)}><img className='edit-pencil' src={editPencil} alt="pencil"/></button></td>

                        </tr>
                        <tr>
                            <th>Factory</th>
                            <td>{editFactId ? [editor] : factories?.filter((factory) => factory.id === currentProd?.factory_id)[0]?.name}</td>
                            <td><button className='edit-button' onClick={() => setEditFactId(!editFactId)}><img className='edit-pencil' src={editPencil} alt="pencil"/></button></td>
                        </tr>
                        <tr>
                            <th>Unit</th>
                            <td>{editUnit ? [editor] : currentProd?.unit}</td>
                            <td><button className='edit-button' onClick={() => setEditUnit(!editUnit)}><img className='edit-pencil' src={editPencil} alt="pencil"/></button></td>

                        </tr>
                        <tr>
                            <th>Transport Mode</th>
                            <td>{editTransMode ? [editor] : transport_modes?.filter((mode) => mode.id === currentProd?.transport_mode_id)[0]?.name}</td>
                            <td><button className='edit-button' onClick={() => setEditTransMode(!editTransMode)}><img className='edit-pencil' src={editPencil} alt="pencil"/></button></td>
                        </tr>
                        <tr>
                            <th>Consumer Uses</th>
                            <td>
                                {editUseArray ? [editor] : currentProd?.uses ? currentProd?.uses.map((use) => (
                                    <p key={use.id}>{use.name}</p>
                                )) : <p>None</p>}
                            </td>
                            <td><button className='edit-button' onClick={() => setEditUseArray(!editUseArray)}><img className='edit-pencil' src={editPencil} alt="pencil"/></button></td>
                        </tr>
                        <tr>
                            <th>Number of Use Cycles</th>
                            <td>{editCycles ? [editor] : currentProd?.number_of_cycles}</td>
                            <td><button className='edit-button' onClick={() => setEditCycles(!editCycles)}><img className='edit-pencil' src={editPencil} alt="pencil"/></button></td>
                        </tr>
                        <tr>
                            <th>Returnable?</th>
                            <td>{editRturnable ? [editor] : currentProd?.returnable ? "Yes" : "No"}</td>
                            <td><button className='edit-button' onClick={() => setEditRetrunable(!editRturnable)}><img className='edit-pencil' src={editPencil} alt="pencil"/></button></td>

                        </tr>
                        {currentProd?.returnable ?
                        <>
                        <tr>
                            <th>Percentage Returned</th>
                            <td>{editProdReturn ? [editor] : currentProd?.product_returned_percent}</td>
                            <td><button className='edit-button' onClick={() => setEditProdReturn(!editProdReturn)}><img className='edit-pencil' src={editPencil} alt="pencil"/></button></td>

                        </tr>
                        <tr>
                            <th>Percentage Recycled</th>
                            <td>{editProdRecycle ? [editor] : currentProd?.product_recycled_percent}</td>
                            <td><button className='edit-button' onClick={() => setEditProdRecycle(!editProdRecycle)}><img className='edit-pencil' src={editPencil} alt="pencil"/></button></td>
                        </tr>
                        </> :
                        <></>
                        }

                    </tbody>
                </table>
            </div>
        </div>   {/* end product-page-container */}



    </ div>
    )
}

export default ProductPage;
