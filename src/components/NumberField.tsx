"use client";

import { FieldWrapper } from "@/components/atoms/FieldWrapper";
import { FieldBackground } from "@/components/atoms/FieldBackground";
import { Label } from "@/components/atoms/Label";
import { Input } from "@/components/atoms/Input";
import {
  Text,
  NumberField as AriaNumberField,
  NumberFieldProps,
  ValidationResult,
  Group,
  Button as AriaButton,
} from "react-aria-components";
import { FieldError } from "@/components/atoms/FieldError";
import { LabelInputStack } from "@/components/atoms/LabelInputStack";
import { styled } from "@styled-system/jsx";
import { Minus, Plus } from "lucide-react";
import { hstack } from "@styled-system/patterns";
import { FieldButton } from "@/components/atoms/FieldButton";

interface MyNumberFieldProps extends NumberFieldProps {
  label?: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
  placeholder?: string;
}

export function NumberField({
  label,
  description,
  errorMessage,
  placeholder,
  ...props
}: MyNumberFieldProps) {
  return (
    <AriaNumberField {...props}>
      <Group>
        {({ isInvalid }) => (
          <FieldWrapper>
            <FieldBackground isInvalid={isInvalid}>
              <LabelInputStack>
                <Label>{label}</Label>
                <Input placeholder={placeholder} />
                {description && <Text slot="description">{description}</Text>}
              </LabelInputStack>
              <div className={hstack({ gap: "4xs" })}>
                <FieldButton slot="decrement">
                  <Minus size={14} />
                </FieldButton>
                <FieldButton slot="increment">
                  <Plus size={14} />
                </FieldButton>
              </div>
            </FieldBackground>
            <FieldError>{errorMessage}</FieldError>
          </FieldWrapper>
        )}
      </Group>
    </AriaNumberField>
  );
}
