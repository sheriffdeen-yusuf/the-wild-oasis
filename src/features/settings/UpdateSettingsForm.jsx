import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";
import { useSettings } from "./useSettings";
import { useUpdateSetting } from "./useUpdateSetting";

function UpdateSettingsForm() {
  const {
    isLoading,
    settings: {
      maxBookingLen,
      minBookingLen,
      maxGuestPerBook,
      breakfastPrice,
    } = {},
  } = useSettings();

  const { isUpdating, updateSetting } = useUpdateSetting();

  function handleSettingUpdate(e, fieldName) {
    const { value } = e.target;
    // console.log(e.target.value);
    updateSetting({ [fieldName]: value });
  }

  if (isLoading) return <Spinner />;
  return (
    <Form>
      <FormRow lable="Minimum nights/booking">
        <Input
          type="number"
          id="min-nights"
          defaultValue={minBookingLen}
          disabled={isUpdating}
          onBlur={(e) => handleSettingUpdate(e, "minBookingLen")}
        />
      </FormRow>

      <FormRow lable="Maximum nights/booking">
        <Input
          type="number"
          id="max-nights"
          defaultValue={maxBookingLen}
          disabled={isUpdating}
          onBlur={(e) => handleSettingUpdate(e, "maxBookingLen")}
        />
      </FormRow>

      <FormRow lable="Maximum guests/booking">
        <Input
          type="number"
          id="max-guests"
          defaultValue={maxGuestPerBook}
          disabled={isUpdating}
          onBlur={(e) => handleSettingUpdate(e, "maxGuestPerBook")}
        />
      </FormRow>

      <FormRow lable="Breakfast price">
        <Input
          type="number"
          id="breakfast-price"
          defaultValue={breakfastPrice}
          disabled={isUpdating}
          onBlur={(e) => handleSettingUpdate(e, "breakfastPrice")}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
