import React, {useState} from "react";
import { EditModal } from '../../context/EditModal' ;
import EditProdForm from "./EditProdForm";

import editPencil from "../../images/edit-pencil.svg"

const EditProdModal = () => {
    const [showModal, setShowModal] = useState(false)

    return (
        <>
            <button onClick={() => setShowModal(true)}><img className='edit-pencil' src={editPencil} alt="pencil"/></button>
            {showModal && (
                <EditModal onClose={() => setShowModal(false)}>
                    <EditProdForm />
                </EditModal>
            )}
        </>
    )
}

export default EditProdModal;
