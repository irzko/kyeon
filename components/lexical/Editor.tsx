/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import type { JSX } from "react";

import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { CheckListPlugin } from "@lexical/react/LexicalCheckListPlugin";
import { ClickableLinkPlugin } from "@lexical/react/LexicalClickableLinkPlugin";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { HorizontalRulePlugin } from "@lexical/react/LexicalHorizontalRulePlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { TabIndentationPlugin } from "@lexical/react/LexicalTabIndentationPlugin";
import { TablePlugin } from "@lexical/react/LexicalTablePlugin";
import { useLexicalEditable } from "@lexical/react/useLexicalEditable";
import { CAN_USE_DOM } from "@lexical/utils";
import { useEffect, useState } from "react";

import { useSharedHistoryContext } from "./context/SharedHistoryContext";
import ComponentPickerPlugin from "./plugins/ComponentPickerPlugin";

import LinkPlugin from "./plugins/LinkPlugin";
import MarkdownShortcutPlugin from "./plugins/MarkdownShortcutPlugin";
import ShortcutsPlugin from "./plugins/ShortcutsPlugin";
import TabFocusPlugin from "./plugins/TabFocusPlugin";
import ToolbarPlugin from "./plugins/ToolbarPlugin";
import ContentEditable from "./ui/ContentEditable";
import { Box } from "@chakra-ui/react";

export default function Editor(): JSX.Element {
  const { historyState } = useSharedHistoryContext();

  const isEditable = useLexicalEditable();
  const placeholder = "Hãy viết gì đó ở đây...";

  const [isSmallWidthViewport, setIsSmallWidthViewport] =
    useState<boolean>(false);
  const [editor] = useLexicalComposerContext();
  const [activeEditor, setActiveEditor] = useState(editor);

  useEffect(() => {
    const updateViewPortWidth = () => {
      const isNextSmallWidthViewport =
        CAN_USE_DOM && window.matchMedia("(max-width: 1025px)").matches;

      if (isNextSmallWidthViewport !== isSmallWidthViewport) {
        setIsSmallWidthViewport(isNextSmallWidthViewport);
      }
    };
    updateViewPortWidth();
    window.addEventListener("resize", updateViewPortWidth);
    return () => {
      window.removeEventListener("resize", updateViewPortWidth);
    };
  }, [isSmallWidthViewport]);

  return (
    <>
      <ToolbarPlugin
        editor={editor}
        activeEditor={activeEditor}
        setActiveEditor={setActiveEditor}
      />
      <ShortcutsPlugin editor={activeEditor} />
      <div className={"editor-container"}>
        <AutoFocusPlugin />
        <ComponentPickerPlugin />
        <>
          <HistoryPlugin externalHistoryState={historyState} />
          <RichTextPlugin
            contentEditable={
              <Box position="relative">
                <ContentEditable placeholder={placeholder} />
              </Box>
            }
            ErrorBoundary={LexicalErrorBoundary}
          />
          <MarkdownShortcutPlugin />

          <ListPlugin hasStrictIndent={false} />
          <CheckListPlugin />
          <TablePlugin
            hasCellMerge={true}
            hasCellBackgroundColor={true}
            hasHorizontalScroll={true}
          />
          <HorizontalRulePlugin />
          <LinkPlugin hasLinkAttributes={false} />
          <ClickableLinkPlugin disabled={isEditable} />
          <TabFocusPlugin />
          <TabIndentationPlugin maxIndent={7} />
        </>
      </div>
    </>
  );
}
