import { Box, Button, Flex, HStack, Heading, VStack } from "@chakra-ui/react";
import { Field } from "./Form";
import FormField from "./FormField";

type Props = {
  fields: Field[];
  handleFieldsChange: (newFields: Field[]) => void;
};

const FormFields = ({ fields, handleFieldsChange: onChange }: Props) => {
  const handleAddField = () => {
    onChange([...fields, { name: "addName", type: "string" }]);
  };

  // const handleAddNestedField = () => {
  // };

  const handleFieldsChange = (index: number, newField: Field) => {
    const newFields = [...fields];
    newFields[index] = newField;
    onChange(newFields);
  };

  const handleDeleteField = (index: number) => {
    const newFields = [...fields];
    newFields.splice(index, 1);
    onChange(newFields);
  };

  return (
    <VStack
      // align={"flex-start"}
      justify={"flex-start"}
      className='formfields-ou'
      w={"full"}
    >
      <Flex
        direction={"column"}
        align={"flex-start"}
        justify={"flex-start"}
        className='FormFields'
        gap={"2"}
        w={"full"}
        pl={"4"}
      >
        {fields.map((field, index) => (
          <FormField
            key={index}
            field={field}
            onChange={(newField) => handleFieldsChange(index, newField)}
            onDelete={() => handleDeleteField(index)}
          />
        ))}
      </Flex>
      {/* <Button onClick={handleAddField}>Add Field</Button> */}
    </VStack>
  );
};

export default FormFields;
