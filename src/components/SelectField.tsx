"use client";

import {
  Button,
  ComboBox,
  ComboBoxProps,
  ListBox,
  Popover,
  ValidationResult,
  Text,
  ListBoxItemProps,
  ListBoxItem,
} from "react-aria-components";
import { Label } from "@/components/atoms/Label";
import { Input } from "@/components/atoms/Input";
import { FieldError } from "@/components/atoms/FieldError";
import { Key } from "react";

interface ValueType extends ListBoxItemProps<{ text: string }> {}

interface MyComboBoxProps extends Omit<ComboBoxProps<ValueType>, "children"> {
  label?: string;
  description?: string | null;
  errorMessage?: string | ((validation: ValidationResult) => string);
}

export function SelectField({
  label,
  description,
  errorMessage,
  ...props
}: MyComboBoxProps) {
  return (
    <ComboBox {...props}>
      <Label>{label}</Label>
      <div className="my-combobox-container">
        <Input />
        <Button>▼</Button>
      </div>
      {description && <Text slot="description">{description}</Text>}
      <FieldError>{errorMessage}</FieldError>
      <Popover>
        <ListBox>
          {(item: ValueType) => (
            <ListBoxItem {...item}>
              {({ isSelected }) => (
                <div>
                  {isSelected && <span>☑️</span>}
                  <span>{item.value?.text}</span>
                </div>
              )}
            </ListBoxItem>
          )}
        </ListBox>
      </Popover>
    </ComboBox>
  );
}
