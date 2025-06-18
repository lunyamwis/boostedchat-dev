// components/AddFieldDefinitionModal.tsx
import {
  Modal,
  TextInput,
  Textarea,
  Button,
  Group,
  Select,
  Checkbox,
  Space,
} from '@mantine/core';
import { useForm, Controller } from 'react-hook-form';
import { useState } from 'react';
import React from 'react';
import { useGetExperimenFieldDefinitionsWrapperApi } from '../Hooks/experimentFieldDefinition.hooks';

const FIELD_TYPES = ['text', 'number', 'boolean', 'dropdown'];

export default function AddFieldDefinitionModal({ experimentId, opened, onClose, onSuccess }: {
  experimentId: string;
  opened: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}) {
  const { createExperimentFieldDefinition } = useGetExperimenFieldDefinitionsWrapperApi();
  const [isMetricField, setIsMetricField] = useState(false);


  const { register, handleSubmit, watch, reset, control } = useForm({
    defaultValues: {
      label: '',
      field_type: 'text',
      value: '',
      options: '',
      is_experiment_input: false, // Assuming this is an input field
      is_metric_field: false, // Assuming this is not a metric
      is_result_field: false, // Assuming this is not a result field
    },
  });

  const type = watch('field_type');
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: any) => {
    console.log("Form data submitted:", data);
    console.log("data.type",data.field_type)
    setLoading(true);
    try {
      const payload: any = {
        experiment_id: experimentId,
        name: data.label,
        field_type: data.field_type,
      };

      if (data.field_type === 'dropdown') {
        
        payload.options = data.options.split(',').map((opt: string) => opt.trim());
        payload.field_value = data.value; // default to first
      } else if (data.field_type === 'boolean') {
        payload.options = 'true,false'
        payload.field_value = data.value;
      } else if (data.field_type === 'number') {
        payload.options = null
        payload.field_value = parseFloat(data.value);
      } else {
        payload.field_value = data.value;
        payload.options = null
      }
      console.log("Form data submitted:", payload);
      // console.log("Payload to be sent:", payload);
      // console.log("Submitted Field Definition:", JSON.stringify(payload, null, 2));
      createExperimentFieldDefinition.mutate({
        config: {
          name: payload.name,
          options: data.options,
          field_type: payload.field_type,
        },
        experiment: experimentId,
        field_value: payload.field_value,

        is_experiment_input: false, // Assuming this is an input field
        is_metric_field: data.is_metric_field, // Assuming this is not a metric
        is_result_field: false, // Assuming this is not a result field
      })
      onSuccess?.();
      reset();
      onClose();

    } catch (err) {
      console.error('Failed to add field', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal opened={opened} onClose={onClose} title="Add Field Definition" centered>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextInput label="Label" required {...register('label')} />

        <Controller
          name="field_type"
          control={control}
          defaultValue="text"
          render={({ field }) => (
            <Select
              label="Type"
              data={FIELD_TYPES}
              value={field.value}
              onChange={field.onChange}
              required
            />
          )}
        />

        {type === 'dropdown' && (
          <Textarea
            label="Options (comma-separated)"
            placeholder="Red, Green, Blue"
            {...register('options')}
          />
        )}

        {type === 'dropdown' && (
          <TextInput label="Value" required {...register('value')} />
        )}

        {type === 'boolean' ? (
          <Controller
            name="value"
            control={control}
            defaultValue="true"
            // {...register('value')}
            render={({ field }) => (
              <Select
                label="Value"
                data={['true', 'false']}
                value={field.value}
                
                onChange={(event)=>{
                  field.onChange(event)
                  console.log(field)
                  // console.log(event)
                }}
                required
              />
            )}
          />
        ) : (
          type !== 'dropdown' && (
            <TextInput label="Value" {...register('value')} />
          )
        )}

        <Space h="md" />

        <Checkbox id='is_metric_field' checked={isMetricField} {...register('is_metric_field')}
          onChange={(event) => setIsMetricField(event.currentTarget.checked)} label={"This is a metric field"} />



        <Group mt="md">
          <Button type="submit" loading={loading} onClick={() => {
            console.log("Submitting field definition");

          }}>Add Field</Button>
        </Group>
      </form>
    </Modal>
  );
}
