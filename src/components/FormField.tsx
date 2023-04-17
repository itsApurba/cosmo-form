import React from "react";
import { Field } from "./Form";
import FormFields from "./FormFields";
import {
  Box,
  Button,
  Flex,
  HStack,
  Input,
  Select,
  VStack,
} from "@chakra-ui/react";

type Props = {
  field: Field;
  onChange: (newField: Field) => void;
  onDelete: () => void;
};

const FormField = ({ field, onChange, onDelete }: Props) => {
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...field, name: event.target.value });
  };

  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newType = event.target.value as Field["type"];
    if (newType === "object") {
      onChange({
        ...field,
        type: newType,
        nestedFields: [{ name: "AddName", type: "string" }],
      });
    } else {
      onChange({ ...field, type: newType, nestedFields: undefined });
    }
  };

  const handleNestedFieldsChange = (newNestedFields: Field[]) => {
    onChange({ ...field, nestedFields: newNestedFields });
  };
  const handleAddField = () => {
    const newFields = [
      ...(field.nestedFields || []),
      { name: "AddName", type: "string" },
    ];
    //@ts-ignore
    onChange({ ...field, nestedFields: newFields });
  };

  return (
    <VStack className='formfi' w={"100%"}>
      <HStack className='formfi-in' w={"full"} justifyContent={"space-between"}>
        <Flex gap={2}>
          <Input
            htmlSize={4}
            variant={"filled"}
            width={"auto"}
            size={"md"}
            type='text'
            value={field.name}
            onChange={handleNameChange}
            fontSize={"sm"}
          />
          <Select
            value={field.type}
            width={"max-content"}
            variant={"filled"}
            onChange={handleTypeChange}
          >
            <option value='string'>String</option>
            <option value='number'>Number</option>
            <option value='boolean'>Boolean</option>
            <option value='object'>Object</option>
          </Select>
        </Flex>
        <Flex gap={2}>
          {field.type == "object" && (
            <Button onClick={handleAddField}>Add Field</Button>
          )}
          <Button onClick={onDelete}>Delete</Button>
        </Flex>
      </HStack>
      {field.type === "object" && (
        <FormFields
          fields={field.nestedFields || []}
          handleFieldsChange={handleNestedFieldsChange}
        />
      )}
    </VStack>
  );
};

export default FormField;
