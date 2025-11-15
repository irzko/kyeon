/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import type { JSX } from "react";

import "./ContentEditable.css";

import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { Text, Textarea } from "@chakra-ui/react";

type Props = {
  className?: string;
  placeholderClassName?: string;
  placeholder: string;
};

export default function LexicalContentEditable({
  placeholder,
}: Props): JSX.Element {
  return (
    <Textarea minH="150px" rounded="xl" outline="none" bg="gray.900" asChild>
      <ContentEditable
        aria-placeholder={placeholder}
        placeholder={
          <Text
            overflow="hidden"
            textOverflow="ellipsis"
            color="gray.500"
            top="8px"
            left="12px"
            display="inline-block"
            fontSize="sm"
            position="absolute"
            pointerEvents="none"
            userSelect="none"
            whiteSpace="nowrap"
          >
            {placeholder}
          </Text>
        }
      />
    </Textarea>
  );
}
