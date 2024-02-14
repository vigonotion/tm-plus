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
import { FieldInnerWrapper } from "@/components/atoms/FieldInnerWrapper";
import { css } from "@styled-system/css";
import { FieldOuterWrapper } from "@/components/atoms/FieldOuterWrapper";

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
        <FieldOuterWrapper>
          <FieldInnerWrapper isInvalid={isInvalid}>
            <Label>{label}</Label>
            <Input placeholder={placeholder} />
            {description && <Text slot="description">{description}</Text>}
          </FieldInnerWrapper>
          <FieldError>{errorMessage}</FieldError>
        </FieldOuterWrapper>
      )}
    </AriaTextField>
  );
}
