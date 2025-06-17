export interface Experiment {
  id: string;
  name: string;
  description: string | null;
  primary_metric: boolean;
  version: string;
  status_id: string;
  status: ExperimentStatus;
  field_definitions: [ExperimentFieldDefinition];
  inputs: string;
  experiment_results: string;
}

interface ExperimentStatus {
  id: string;
  name: string;
  description: string | null;
}

export interface ExperimentFieldDefinition {
  id: string;
  experiment: string;
  config: {
    name: string;
    options:[];
    field_type: string;
  }
  is_input: boolean;
  is_metric: boolean;
  is_result_field: boolean;
  field_value: ExperimentFieldValue;
}

interface ExperimentFieldValue {
  id: string;
  experiment: string;
  field_definition_id: string;
  value: {}
}

// export interface GetExperiment extends Experiment {
//   created_at: string;
//   updated_at: string;
//   start_date: string | null;
//   end_date: string | null;
// }