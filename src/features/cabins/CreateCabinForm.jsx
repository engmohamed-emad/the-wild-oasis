import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import FormRow from "../../ui/FormRow";
import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";

function CreateCabinForm({cabinToEdit={}, onCloseModal}) {

  const { id:editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId);
  const { register, handleSubmit, reset, formState } = useForm(
    { defaultValues: isEditSession ? editValues : {} }
  );
  const { errors } = formState;

  const {isCreating, createCabin} = useCreateCabin();
  const {isEditing, editCabin} = useEditCabin();

  function onSubmit(data) {
  if (!data.image || data.image.length === 0) {
    data.image = null;
  }
  const img= typeof data.image === 'string' ? data.image : data.image[0];
  console.log("Form submitted with data:", data);
  if( isEditSession) {
    editCabin({newCabinData: {...data, image: img }, id: editId},{
      onSuccess: () => {
        reset();
        onCloseModal?.(); // Close the modal after editing
      }
    });
  } else {
    createCabin({...data, image: img },{
      onSuccess: () => {
        reset();
        onCloseModal?.(); // Close the modal after creating
      }
    });
  }
}
  function onError(errors) {
  console.log("Form submission error:", errors);
}
const isWorking = isCreating || isEditing;
  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)} type={onCloseModal ? "modal" : "regular"}>
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input type="text" id="name" {...register("name", { required:
          "Name field is required" })}  />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input type="number" id="maxCapacity" {...register("maxCapacity", { 
          required: "Capacity field is required",
          min: {
            value: 1,
            message: "Capacity must be at least 1"
          }
        })}  />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input type="number" id="regularPrice" {...register("regularPrice", { 
          required: "Price field is required",
          min: {
            value: 0,
            message: "Price must be a positive number"
          }
        })}  />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input type="number" id="discount" defaultValue={0} {...register("discount", {
          required: false,
          min: {
            value: 0,
            message: "Discount must be a positive number"
          },
          max: {
            value: 100,
            message: "Discount cannot exceed 100%"
          }
        })}  />
      </FormRow>

      <FormRow label="Description" error={errors?.description?.message}>
        <Textarea id="description" defaultValue={''} {...register("description", { required: false })} />
      </FormRow>

      <FormRow label="Cabin photo" error={errors?.image?.message}>
        <FileInput id="image" accept="image/*" {...register("image", {
          required: isEditSession ? false : "Image is required",
        })} />
      </FormRow>

      <FormRow >

        <Button variation="secondary" type="reset" onClick={() => onCloseModal?.()}>
          Cancel
        </Button>
        <Button type="submit" disabled={isWorking}>
          {isWorking ? (isEditSession ? "Updating..." : "Adding...") : (isEditSession ? "Edit cabin" : "Add cabin")}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
