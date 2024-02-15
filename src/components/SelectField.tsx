"use client";

import {
  Button,
  ComboBox,
  ComboBoxProps,
  Popover,
  ValidationResult,
  Text,
  ListBoxItemProps,
  ListBoxItem,
  Group,
} from "react-aria-components";
import { Label } from "@/components/atoms/Label";
import { Input } from "@/components/atoms/Input";
import { FieldError } from "@/components/atoms/FieldError";
import { Key } from "react";
import { FieldWrapper } from "@/components/atoms/FieldWrapper";
import { FieldBackground } from "./atoms/FieldBackground";
import { LabelInputStack } from "./atoms/LabelInputStack";
import { ArrowDown, Check, ChevronDown, Minus } from "lucide-react";
import { FieldButton } from "@/components/atoms/FieldButton";
import { FieldPopover } from "@/components/atoms/FieldPopover";
import { ListItem } from "@/components/atoms/ListItem";
import { ListBox } from "@/components/atoms/ListBox";

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
        <Group>
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
            <FieldPopover crossOffset={-12}>
              <ListBox>
                {(item: ValueType) => (
                  <ListBoxItem {...item}>
                    {({ isSelected }) => (
                      <ListItem isSelected={isSelected}>
                        <span>{item.value?.text}</span>
                        {isSelected && <Check size={14} />}
                      </ListItem>
                    )}
                  </ListBoxItem>
                )}
              </ListBox>
            </FieldPopover>
          </FieldWrapper>
        </Group>
      )}
    </ComboBox>
  );
}
