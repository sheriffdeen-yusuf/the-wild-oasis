import { useForm } from "react-hook-form";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";
import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";

function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
  const { id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId);
  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;

  const { createCabin, isCreating } = useCreateCabin();
  const { editCabin, isEditing } = useEditCabin();

  const isWorking = isCreating || isEditing;

  function onSubmit(data) {
    const image = typeof data.image === "string" ? data.image : data.image[0];
    if (isEditSession)
      editCabin(
        { newCabin: { ...data, image }, id: editId },
        {
          onSuccess: (data) => {
            reset();
            onCloseModal?.();
          },
        }
      );
    else
      createCabin(
        { ...data, image: image },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
  }

  function onError(error) {
    // console.log(error);
  }
  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow lable="Cabin name" errors={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isWorking}
          {...register("name", {
            required: "This filed is required!",
          })}
        />
      </FormRow>

      <FormRow lable="Maximum capacity" errors={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isWorking}
          {...register("maxCapacity", {
            required: "This filed is required!",
            min: {
              value: 1,
              message: "Min len is 1",
            },
          })}
        />
      </FormRow>

      <FormRow lable="Regular price" errors={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          disabled={isWorking}
          {...register("regularPrice", {
            required: "This filed is required!",
          })}
        />
      </FormRow>

      <FormRow lable="Discount" errors={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          disabled={isWorking}
          defaultValue={0}
          {...register("discount", {
            required: "This filed is required!",
            validate: (value) =>
              value < getValues().regularPrice ||
              "discount must be less than price",
          })}
        />
      </FormRow>

      <FormRow
        lable="Description for website"
        errors={errors?.description?.message}
      >
        <Textarea
          type="number"
          disabled={isWorking}
          id="description"
          defaultValue=""
          {...register("description", {
            required: "This filed is required!",
          })}
        />
      </FormRow>

      <FormRow lable="Cabin photo">
        <FileInput
          id="image"
          disabled={isWorking}
          accept="image/*"
          {...register("image", {
            required: isEditSession ? false : "This filed is required!",
          })}
        />
      </FormRow>

      <FormRow>
        <Button
          variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isEditSession ? "Edit cabin" : "create cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
