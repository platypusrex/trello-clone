import React from 'react';
import { InputField } from '../InputField';

interface TeamFormInputsProps {
  inputSize?: 'small' | 'default' | 'large';
}

export const TeamFormInputs: React.FC<TeamFormInputsProps> = ({ inputSize }) => (
  <>
    <InputField
      label="Team Name"
      name="name"
      placeholder="Your team name..."
      size={inputSize || 'default'}
    />

    <InputField
      label="Team Description"
      name="description"
      placeholder="Your team description..."
      size={inputSize || 'default'}
    />
  </>
);