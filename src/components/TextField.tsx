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
import { css } from "@styled-system/css";

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
        <div
          className={css({
            gap: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "stretch",
          })}
        >
          <FieldWrapper isInvalid={isInvalid}>
            <div className={vstack({ alignItems: "start", gap: "4xs" })}>
              <Label>{label}</Label>
              <Input placeholder={placeholder} />
              {description && <Text slot="description">{description}</Text>}
            </div>
          </FieldWrapper>
          <FieldError>{errorMessage}</FieldError>
        </div>
      )}
    </AriaTextField>
  );
}
