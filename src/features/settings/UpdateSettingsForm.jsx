import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import { useSettings } from './useSettings';
import { useUpdateSetting } from './useUpdateSetting';
import Spinner from '../../ui/Spinner';
function UpdateSettingsForm() {
  const { settings: {
    minBookingLength,
    maxBookingLength,
    maxGuestsPerBooking,
    breakfastPrice
  } = {}, isLoading, } = useSettings();

  const { updateSetting, isUpdating } = useUpdateSetting();

  function handleUpdate(settingKey, value) {
    if(!value || value === '') {
      return;
    }
    updateSetting ( { [settingKey]: value }); 
  }
  if (isLoading) return <Spinner />;
  return (
    <Form>
      <FormRow label='Minimum nights/booking'>
        <Input type='number' id='min-nights' defaultValue={minBookingLength} 
        disabled={isUpdating}
        onBlur={(e) => handleUpdate('minBookingLength', e.target.value)}
        />
      </FormRow>
      <FormRow label='Maximum nights/booking'>
        <Input type='number' id='max-nights' defaultValue={maxBookingLength}
        disabled={isUpdating}
        onBlur={(e) => handleUpdate('maxBookingLength', e.target.value)}
        />
      </FormRow>
      <FormRow label='Maximum guests/booking'>
        <Input type='number' id='max-guests' defaultValue={maxGuestsPerBooking}
        disabled={isUpdating}
        onBlur={(e) => handleUpdate('maxGuestsPerBooking', e.target.value)}
        />
      </FormRow>
      <FormRow label='Breakfast price'>
        <Input type='number' id='breakfast-price' defaultValue={breakfastPrice}
        disabled={isUpdating}
        onBlur={(e) => handleUpdate('breakfastPrice', e.target.value)}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
