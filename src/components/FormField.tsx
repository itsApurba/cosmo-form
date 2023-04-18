import React from "react";
import { Field } from "./Form";
import FormFields from "./FormFields";
import {
  Button,
  Flex,
  FormLabel,
  HStack,
  Input,
  Select,
  Switch,
  VStack,
} from "@chakra-ui/react";

type Props = {
  field: Field;
  onChange: (newField: Field) => void;
  onDelete: () => void;
};

/**
 * Renders a form field component.
 * @param {object} props - The component props.
 * @param {object} props.field - The field object to render.
 * @param {Function} props.onChange - The change handler to be called when the field value changes.
 * @param {Function} props.onDelete - The delete handler to be called when the field is deleted.
 * @returns {JSX.Element} The rendered form field.
 */
const FormField = ({ field, onChange, onDelete }: Props): JSX.Element => {
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...field, name: event.target.value });
  };

  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newType = event.target.value as Field["type"];
    if (newType === "object") {
      onChange({
        ...field,
        type: newType,
        nestedFields: [{ name: "AddName", type: "string", isRequired: true }],
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

  const handleToggleEvent = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...field, isRequired: event.target.checked });
  };

  return (
    <VStack className='formfi' w={"100%"}>
      <HStack
        className='formfi-in'
        w={"full"}
        justifyContent={"space-between"}
        borderRadius={"md"}
        transition={"all 0.5s"}
        _hover={{
          shadow: "sm",
          transform: "translateY(-2px)",
          transition: "all 0.3s",
        }}
      >
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
        <Flex gap={2} align={"center"}>
          {field.type == "object" && (
            <Button onClick={handleAddField}>Add Field</Button>
          )}
          <Button variant={"solid"} colorScheme='red' onClick={onDelete}>
            Delete
          </Button>
          <Flex align={"center"} gap={1}>
            <FormLabel
              opacity={"0.5"}
              fontSize={"xs"}
              m={0}
              p={0}
              htmlFor='isRequired'
            >
              Required
            </FormLabel>
            <Switch
              id='isRequired'
              isChecked={field.isRequired}
              onChange={handleToggleEvent}
            />
          </Flex>
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
