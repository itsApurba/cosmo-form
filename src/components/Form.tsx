import React, { useState } from "react";
import FormFields from "./FormFields";
import { Box, Button, Center, HStack, Heading, VStack } from "@chakra-ui/react";

export type Field = {
  name: string;
  type: "string" | "number" | "boolean" | "object";
  isRequired: boolean;
  nestedFields?: Field[];
};

type MyFormData = {
  fields: Field[];
};
/**
 * This function renders a form with fields that can be dynamically added and removed.
 *
 * @return {JSX.Element} The rendered form component
 */
function Form(): JSX.Element {
  const [formData, setFormData] = useState<MyFormData>({
    fields: [
      {
        name: "Person",
        type: "object",
        isRequired: true,
        nestedFields: [
          {
            name: "name",
            type: "string",
            isRequired: true,
          },
          {
            name: "mobile",
            type: "number",
            isRequired: false,
          },
          {
            name: "email",
            type: "string",
            isRequired: true,
          },
        ],
      },
      {
        name: "NewPerson",
        type: "object",
        isRequired: false,
        nestedFields: [
          {
            name: "Name",
            type: "string",
            isRequired: true,
          },
          {
            name: "Friends",
            type: "object",
            isRequired: false,
            nestedFields: [
              {
                name: "name",
                type: "string",
                isRequired: true,
              },
            ],
          },
        ],
      },
    ],
  });
  const handleFieldsChange = (newFields: Field[]): void => {
    setFormData({ fields: newFields });
  };
  const handleAddField = () => {
    const fields = [...formData.fields];
    handleFieldsChange([
      ...fields,
      { name: "addName", type: "string", isRequired: true },
    ]);
  };

  console.log(formData);
  return (
    <VStack
      maxH={"90vh"}
      height={"full"}
      className='center'
      margin={"auto"}
      width={"100%"}
      overflow={"auto"}
      shadow={"md"}
      padding={4}
      borderWidth={1}
      borderRadius={"lg"}
    >
      <HStack width={"full"} align={"center"} justify={"space-between"}>
        <Heading size={"md"}>Field name and type</Heading>
        <Button onClick={handleAddField}>Add Field</Button>
      </HStack>
      <hr style={{ width: "100%", margin: "0.5rem 0 0.5rem 0" }} />
      <Box className='style' margin={"auto"} width={"100%"}>
        <FormFields
          fields={formData.fields}
          handleFieldsChange={handleFieldsChange}
        />
      </Box>
    </VStack>
  );
}

export default Form;
