/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { LexicalExtensionComposer } from "@lexical/react/LexicalExtensionComposer";
import { defineExtension, EditorState } from "lexical";
import { type JSX, useEffect, useMemo } from "react";
import { PLAYGROUND_TRANSFORMERS } from "./plugins/MarkdownTransformers";
import { $convertFromMarkdownString } from "@lexical/markdown";
import { buildHTMLConfig } from "./buildHTMLConfig";
import { SharedHistoryContext } from "./context/SharedHistoryContext";
import { ToolbarContext } from "./context/ToolbarContext";
import Editor from "./Editor";
import PlaygroundNodes from "./nodes/PlaygroundNodes";
import PlaygroundEditorTheme from "./themes/PlaygroundEditorTheme";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";

export default function LexicalEditor({
  onChange,
  markdown,
}: {
  onChange?: (editorState: EditorState) => void;
  markdown?: string;
}): JSX.Element {
  const app = useMemo(
    () =>
      defineExtension({
        $initialEditorState: () => {
          if (markdown) {
            $convertFromMarkdownString(markdown, PLAYGROUND_TRANSFORMERS);
          }
        },
        html: buildHTMLConfig(),
        name: "@lexical/playground",
        namespace: "Playground",
        nodes: PlaygroundNodes,
        theme: PlaygroundEditorTheme,
      }),
    []
  );

  return (
    <LexicalExtensionComposer extension={app} contentEditable={null}>
      <SharedHistoryContext>
        <ToolbarContext>
          <Editor />
        </ToolbarContext>
        {onChange && <OnChangePlugin onChange={onChange} />}
      </SharedHistoryContext>
    </LexicalExtensionComposer>
  );
}
