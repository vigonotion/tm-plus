"use client";

import {
  TextField as AriaTextField,
  Text,
  TextFieldProps,
  ValidationResult,
} from "react-aria-components";
import { styled } from "@styled-system/jsx";
import { Label } from "@/components/atoms/Label";
import { Input } from "@/components/atoms/Input";
import { vstack } from "@styled-system/patterns";
import { FieldError } from "@/components/atoms/FieldError";
import { FieldWrapper } from "@/components/atoms/FieldWrapper";

interface MyTextFieldProps extends TextFieldProps {
  label?: string;
  description?: string;
  placeholder?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
}

export function TextField({
  label,
  description,
  errorMessage,
  placeholder,
  ...props
}: MyTextFieldProps) {
  return (
    <AriaTextField {...props}>
      {({ isInvalid }) => (
        <>
          <FieldWrapper isInvalid={isInvalid}>
            <div className={vstack({ alignItems: "start", gap: "4xs" })}>
              <Label>{label}</Label>
              <Input placeholder={placeholder} />
              {description && <Text slot="description">{description}</Text>}
            </div>
          </FieldWrapper>
          <FieldError>{errorMessage}</FieldError>
        </>
      )}
    </AriaTextField>
  );
}
