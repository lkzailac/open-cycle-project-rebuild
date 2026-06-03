import React, {useState} from "react";
import { useSelector, useDispatch } from 'react-redux';
import { updateProduct } from '../../store/products';


const EditProdForm = (props) => {
    const dispatch = useDispatch();
    const currentProd = useSelector(state => state.products.product)
    const [updatedProperty, setUpdatedProperty] = useState()

    const [errors, setErrors] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();

        let updatedProd = {
            "id": currentProd?.id,
            updatedProperty
        }
        setErrors([]);
        return dispatch(updateProduct(updateProduct)).catch(
            async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            }
        )
    }

    const updateP = (e) => {
        setUpdatedProperty(e.target.value)
    }

    let formRowContent;
    if (props.name) {
        formRowContent =(
            <div>
              <div className='label-container'>
                <label>Product Name</label>
              </div>
              <input
                type="text"
                name="name"
                onChange={updateP}
                value={updateP}
                required={true}
              ></input>
            </div>
        )
    }

    return (
        <div className="edit-form-contain">
            <h1>HIIIIIIIIIIIII</h1>
            <form onSubmit={handleSubmit}>
                <ul>
                    {errors.map((error, idx) => (
                        <li key={idx}>{error}</li>
                    ))}
                </ul>


            </form>
        </div>

    )
}

export default EditProdForm;
