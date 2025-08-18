import styled from "styled-components";
import CreateCabinForm from "./CreateCabinForm";
import { useDeleteCabin } from "./useDeleteCabin";
import { HiTrash, HiPencil } from "react-icons/hi";
import { HiSquare2Stack } from "react-icons/hi2";
import { useCreateCabin } from "./useCreateCabin";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Modal from "../../ui/Modal";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
// const TableRow = styled.div`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;
//   padding: 1.4rem 2.4rem;

//   &:not(:last-child) {
//     border-bottom: 1px solid var(--color-grey-100);
//   }
// `;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;


function CabinRow({ cabin }) {
  const { id, image, name, maxCapacity, regularPrice, discount, description } = cabin;
  const {isDeleting, deleteCabin} = useDeleteCabin();
  const {isCreating : isDuplicating, createCabin: duplicateCabin} = useCreateCabin();
  function handleDuplicate() {
    duplicateCabin({ name: `Copy of ${name}`,
      maxCapacity,
      regularPrice,
      discount,
      image: image ? image : null,
      description: description ? description : ""
    })
  }
  //kg
  return (
    <>
      <Table.Row role='row'>
      <Img src={image} />
      <Cabin>{name}</Cabin>
      <div>Fits up to {maxCapacity} guests</div>
      <Price>{regularPrice} €</Price>
      <Discount>{discount ? `${discount}%` : "No discount"}</Discount>
      <div>
      <button onClick={handleDuplicate} disabled={isDuplicating}><HiSquare2Stack/></button>
      <Modal>
        <Modal.Open opens='cabin-edit-form'>
          <button><HiPencil/></button>
        </Modal.Open>
        <Modal.Window name="cabin-edit-form">
          <CreateCabinForm cabinToEdit={cabin} />
        </Modal.Window>
        <Modal.Open opens='cabin-delete-confirm'>
          <button><HiTrash/></button>
        </Modal.Open>
        <Modal.Window name="cabin-delete-confirm">
          <ConfirmDelete onConfirm={() => deleteCabin(id)} resourceName={name} disabled={isDeleting}/>
        </Modal.Window>
      </Modal>
      <Menus>
      <Menus.Menu>
        <Menus.Toggle id={id}/>
          <Menus.List id={id}>
            <Menus.Button icon={<HiSquare2Stack/>} onClick={handleDuplicate}>Duplicate {name}</Menus.Button>
            <Menus.Button icon={<HiPencil/>}>Edit {name}</Menus.Button>
            <Menus.Button icon={<HiTrash/>}>Delete {name}</Menus.Button>
          </Menus.List>
      </Menus.Menu>
      </Menus>
     </div>
    </Table.Row>
   
 </>
);
}

export default CabinRow;