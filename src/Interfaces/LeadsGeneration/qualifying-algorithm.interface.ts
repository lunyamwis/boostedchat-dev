interface QualifyingAlgorithm {
  id: string;
  name: string;
  positive_keywords: string;
  number_positive_keywords: string;
  negative_keywords: string;
  number_negative_keywords: string;
}

export type CreateQualifyingAlgorithm = Omit<QualifyingAlgorithm, "id">;

export type GetQualifyingAlgorithm = QualifyingAlgorithm;

export type UpdateQualifyingAlgorithmParams = {
  id: string;
  data: Partial<CreateQualifyingAlgorithm>;
};
