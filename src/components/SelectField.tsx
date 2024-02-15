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
import { FieldWrapper } from "@/components/atoms/FieldWrapper";
import { FieldBackground } from "./atoms/FieldBackground";
import { LabelInputStack } from "./atoms/LabelInputStack";
import { ArrowDown, ChevronDown, Minus } from "lucide-react";
import { FieldButton } from "@/components/atoms/FieldButton";

interface ValueType extends ListBoxItemProps<{ text: string }> {}

interface MyComboBoxProps extends Omit<ComboBoxProps<ValueType>, "children"> {
  label?: string;
  description?: string | null;
  errorMessage?: string | ((validation: ValidationResult) => string);
  placeholder?: string;
}

export function SelectField({
  label,
  description,
  errorMessage,
  placeholder,
  ...props
}: MyComboBoxProps) {
  return (
    <ComboBox {...props}>
      {({ isInvalid }) => (
        <>
          <FieldWrapper>
            <FieldBackground isInvalid={isInvalid}>
              <LabelInputStack>
                <Label>{label}</Label>
                <Input placeholder={placeholder} />
              </LabelInputStack>
              <FieldButton>
                <ChevronDown size={14} />
              </FieldButton>
            </FieldBackground>
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
          </FieldWrapper>
        </>
      )}
    </ComboBox>
  );
}
