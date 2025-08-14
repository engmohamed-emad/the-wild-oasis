import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { createCabin } from "../../services/apiCabins";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import FormRow from "../../ui/FormRow";

function CreateCabinForm() {
  const{register, handleSubmit, reset, formState} = useForm();
  const { errors } = formState;
  const queryClient = useQueryClient();   
  const {mutate,isLoading: isCreating} = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      toast.success("Cabin created successfully");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      reset();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  })

  

  function onSubmit(data) {
  if (!data.image || data.image.length === 0) {
    data.image = null;
  }
  console.log("Form submitted with data:", data);
  mutate({...data, image: data.image[0] });
  }
  function onError(errors) {
  console.log("Form submission error:", errors);
  // for (const key in errors) {
  //   const error = errors[key];
  //   if (error) {
  //     toast.error(error.message || `Error in ${key} field`);
  //   }
  // }
}
  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input type="text" id="name" {...register("name", { required:
          "Name field is required" })} />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input type="number" id="maxCapacity" {...register("maxCapacity", { 
          required: "Capacity field is required",
          min: {
            value: 1,
            message: "Capacity must be at least 1"
          }
           })} />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input type="number" id="regularPrice" {...register("regularPrice", { 
          required: "Price field is required",
          min: {
            value: 0,
            message: "Price must be a positive number"
          }
        })} />
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
        })} />
      </FormRow>

      <FormRow label="Description" error={errors?.description?.message}>
        <Textarea id="description" defaultValue="" {...register("description", { required: false })} />
      </FormRow>

      <FormRow label="Cabin photo" error={errors?.image?.message}>
        <FileInput id="image" accept="image/*" {...register("image", {
          required: "Image is required",
        })} />
      </FormRow>

      <FormRow >
  
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button type="submit" disabled={isCreating}>
          {isCreating ? "Adding..." : "Add cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
