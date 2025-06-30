// components/AddFieldDefinitionModal.tsx
import {
  Modal,
  TextInput,
  Textarea,
  Button,
  Group,
  Select,
  // Checkbox,
  Space,
} from '@mantine/core';
import { useForm, Controller } from 'react-hook-form';
// import { useState } from 'react';
import React from 'react';
import { useGetExperimenFieldDefinitionsWrapperApi, useUpdatetExperimentFieldDefinition } from '../Hooks/experimentFieldDefinition.hooks';
import { ExperimentFieldDefinition } from '@/Interfaces/Instagram/Experiments/experiment.interface';

const FIELD_TYPES = ['text', 'number', 'boolean', 'dropdown'];

export default function AddFieldDefinitionModal({ experimentId, opened, onClose, onSuccess, fieldDefinition }: {
  experimentId: string;
  opened: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  fieldDefinition?: ExperimentFieldDefinition | null;
}) {
  const { createExperimentFieldDefinition } = useGetExperimenFieldDefinitionsWrapperApi();
  const { updateExperimentFieldDefinition } = useUpdatetExperimentFieldDefinition();
  // const [isMetricField, setIsMetricField] = useState(false);
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
  const optionsRaw = watch('options');
  const parsedOptions = React.useMemo(() => {
    if (Array.isArray(optionsRaw)) {
      return optionsRaw
    } else {
      return optionsRaw
        ? optionsRaw
          .split(',')
          .map((opt: string) => opt.trim().toLowerCase())
          .filter(Boolean)
        : [];
    }
  }, [optionsRaw]);

  const onSubmit = async (data: any) => {
    console.log("Form data submitted:", data);
    console.log("data.type", data.field_type)
    try {
      const payload: any = {
        experiment_id: experimentId,
        name: data.label,
        field_type: data.field_type,
      };

      if (data.field_type === 'dropdown') {
        if (Array.isArray(data.options)) {
          payload.options = data.options.map((option: any) => option.toLowerCase())
        } else {
          payload.options = data.options.split(',').map((opt: string) => opt.trim().toLowerCase());
        }
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

      if (fieldDefinition) {
        updateExperimentFieldDefinition.mutate({
          id: fieldDefinition.id,
          data: {
            id: fieldDefinition.id,
            experiment: experimentId,
            is_experiment_input: false, // Assuming this is an input field
            is_metric_field: data.is_metric_field, // Assuming this is not a metric
            is_result_field: false, // Assuming this is not a result field
            field_value: payload.field_value,
            config: {
              name: payload.name,
              options: payload.options,
              field_type: payload.field_type,
            },
          },
        },
          {
            onSuccess: () => {
              onSuccess?.();
              reset({
                label: '',
                field_type: 'text',
                value: '',
                options: '',
                is_experiment_input: false, // Assuming this is an input field
                is_metric_field: false, // Assuming this is not a metric
                is_result_field: false, // Assuming this is not a result field
              });
              onClose();
            },
            onError: (error) => {
              console.error("Error adding field definition:", error);
            },
          }
        )

      } else {
        createExperimentFieldDefinition.mutate({
          config: {
            name: payload.name,
            options: data.options ? data.options.split(',').map((opt: string) => opt.trim()) : data.options,
            field_type: payload.field_type,
          },
          experiment: experimentId,
          field_value: payload.field_value,

          is_experiment_input: false, // Assuming this is an input field
          is_metric_field: data.is_metric_field, // Assuming this is not a metric
          is_result_field: false, // Assuming this is not a result field
        },
          {
            onSuccess: () => {
              onSuccess?.();
              reset({
                label: '',
                field_type: 'text',
                value: '',
                options: '',
                is_experiment_input: false, // Assuming this is an input field
                is_metric_field: false, // Assuming this is not a metric
                is_result_field: false, // Assuming this is not a result field
              });
              onClose();
            },
            onError: (error) => {
              console.error("Error adding field definition:", error);
            },
          }
        )
      }

    } catch (err) {
      console.error('Failed to add field', err);
    }
  };

  React.useEffect(() => {
    if (fieldDefinition) {
      reset({
        label: fieldDefinition.config.name || '',
        field_type: fieldDefinition.config.field_type || 'text',
        value: fieldDefinition.field_value ?? '',
        options: fieldDefinition?.config?.options,
        is_metric_field: fieldDefinition.is_metric_field || false,
      });
      // setIsMetricField(fieldDefinition.is_metric_field || false);
    } else {
      reset({
        label: '',
        field_type: 'text',
        value: '',
        options: '',
        is_experiment_input: false, // Assuming this is an input field
        is_metric_field: false, // Assuming this is not a metric
        is_result_field: false, // Assuming this is not a result field
      });
    }
  }, [reset, fieldDefinition]);

  return (
    <Modal opened={opened} onClose={
      () => {
        reset({
          label: '',
          field_type: 'text',
          value: '',
          options: '',
          is_experiment_input: false,
          is_metric_field: false,
          is_result_field: false,
        });
        onClose();
      }
    } title="Add Field Definition" centered>
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
          <Controller
            name="value"
            control={control}
            render={({ field }) => (
              <Select
                label="Value"
                placeholder="Pick a value"
                data={parsedOptions}
                value={field.value}
                onChange={field.onChange}
                required
              />
            )}
          />
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

                onChange={(event) => {
                  field.onChange(event)
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

        {/* <Checkbox id='is_metric_field' checked={isMetricField} {...register('is_metric_field')}
          onChange={(event) => setIsMetricField(event.currentTarget.checked)} label={"This is a metric field"} /> */}



        <Group mt="md">
          <Button type="submit" loading={createExperimentFieldDefinition.isPending} onClick={() => { }}>{fieldDefinition ? "Update Field" : "Add Field"}</Button>
        </Group>
      </form>
    </Modal>
  );
}
