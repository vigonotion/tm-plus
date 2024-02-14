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
import { FieldBackground } from "@/components/atoms/FieldBackground";
import { css } from "@styled-system/css";
import { FieldWrapper } from "@/components/atoms/FieldWrapper";
import { LabelInputStack } from "./atoms/LabelInputStack";

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
        <FieldWrapper>
          <FieldBackground isInvalid={isInvalid}>
            <LabelInputStack>
              <Label>{label}</Label>
              <Input placeholder={placeholder} />
              {description && <Text slot="description">{description}</Text>}
            </LabelInputStack>
          </FieldBackground>
          <FieldError>{errorMessage}</FieldError>
        </FieldWrapper>
      )}
    </AriaTextField>
  );
}
