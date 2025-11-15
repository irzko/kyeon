/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import type { JSX } from "react";

import {
  $isCodeNode,
  normalizeCodeLanguage as normalizeCodeLanguagePrism,
} from "@lexical/code";

import { $isLinkNode, TOGGLE_LINK_COMMAND } from "@lexical/link";
import { $isListNode, ListNode } from "@lexical/list";
import { $isHeadingNode } from "@lexical/rich-text";
import {
  $getSelectionStyleValueForProperty,
  $isParentElementRTL,
} from "@lexical/selection";
import { $isTableNode, $isTableSelection } from "@lexical/table";
import {
  $findMatchingParent,
  $getNearestNodeOfType,
  $isEditorIsNestedEditor,
  IS_APPLE,
  mergeRegister,
} from "@lexical/utils";
import {
  $addUpdateTag,
  $getSelection,
  $isElementNode,
  $isNodeSelection,
  $isRangeSelection,
  $isRootOrShadowRoot,
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  COMMAND_PRIORITY_CRITICAL,
  CommandPayloadType,
  ElementFormatType,
  FORMAT_ELEMENT_COMMAND,
  FORMAT_TEXT_COMMAND,
  INDENT_CONTENT_COMMAND,
  LexicalCommand,
  LexicalEditor,
  LexicalNode,
  NodeKey,
  OUTDENT_CONTENT_COMMAND,
  REDO_COMMAND,
  SELECTION_CHANGE_COMMAND,
  SKIP_DOM_SELECTION_TAG,
  TextFormatType,
  UNDO_COMMAND,
} from "lexical";
import { Dispatch, useCallback, useEffect, useState } from "react";

import {
  blockTypeToBlockName,
  useToolbarState,
} from "../../context/ToolbarContext";
import { isKeyboardInput } from "../../utils/focusUtils";
import { getSelectedNode } from "../../utils/getSelectedNode";
import { sanitizeUrl } from "../../utils/url";
import { SHORTCUTS } from "../ShortcutsPlugin/shortcuts";
import {
  formatBulletList,
  formatCheckList,
  formatCode,
  formatHeading,
  formatNumberedList,
  formatParagraph,
  formatQuote,
} from "./utils";
import { Button, Flex, IconButton, Menu, Portal } from "@chakra-ui/react";
import {
  FiBold,
  FiChevronDown,
  FiItalic,
  FiLink2,
  FiRotateCcw,
  FiRotateCw,
  FiUnderline,
} from "react-icons/fi";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const rootTypeToRootName = {
  root: "Root",
  table: "Table",
};

const ELEMENT_FORMAT_OPTIONS: {
  [key in Exclude<ElementFormatType, "">]: {
    icon: string;
    iconRTL: string;
    name: string;
  };
} = {
  center: {
    icon: "center-align",
    iconRTL: "center-align",
    name: "Center Align",
  },
  end: {
    icon: "right-align",
    iconRTL: "left-align",
    name: "End Align",
  },
  justify: {
    icon: "justify-align",
    iconRTL: "justify-align",
    name: "Justify Align",
  },
  left: {
    icon: "left-align",
    iconRTL: "left-align",
    name: "Left Align",
  },
  right: {
    icon: "right-align",
    iconRTL: "right-align",
    name: "Right Align",
  },
  start: {
    icon: "left-align",
    iconRTL: "right-align",
    name: "Start Align",
  },
};

function BlockFormatDropDown({
  editor,
  blockType,
  disabled = false,
}: {
  blockType: keyof typeof blockTypeToBlockName;
  rootType: keyof typeof rootTypeToRootName;
  editor: LexicalEditor;
  disabled?: boolean;
}): JSX.Element {
  return (
    <Menu.Root>
      <Menu.Trigger asChild>
        <Button
          disabled={disabled}
          aria-label="Formatting options for text style"
          variant="outline"
          size="xs"
        >
          {blockTypeToBlockName[blockType]}
          <FiChevronDown />
        </Button>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content>
            <Menu.Item
              value="paragraph"
              onSelect={() => formatParagraph(editor)}
            >
              Normal
              <Menu.ItemCommand>{SHORTCUTS.NORMAL}</Menu.ItemCommand>
            </Menu.Item>
            <Menu.Item
              value="h1"
              onSelect={() => formatHeading(editor, blockType, "h1")}
            >
              Heading 1<Menu.ItemCommand>{SHORTCUTS.HEADING1}</Menu.ItemCommand>
            </Menu.Item>
            <Menu.Item
              value="h2"
              onSelect={() => formatHeading(editor, blockType, "h2")}
            >
              Heading 2<Menu.ItemCommand>{SHORTCUTS.HEADING2}</Menu.ItemCommand>
            </Menu.Item>
            <Menu.Item
              value="h3"
              onSelect={() => formatHeading(editor, blockType, "h3")}
            >
              Heading 3<Menu.ItemCommand>{SHORTCUTS.HEADING3}</Menu.ItemCommand>
            </Menu.Item>
            <Menu.Item
              value="number"
              onSelect={() => formatNumberedList(editor, blockType)}
            >
              Numbered List
              <Menu.ItemCommand>{SHORTCUTS.NUMBERED_LIST}</Menu.ItemCommand>
            </Menu.Item>
            <Menu.Item
              value="bullet"
              onSelect={() => formatBulletList(editor, blockType)}
            >
              Bullet List
              <Menu.ItemCommand>{SHORTCUTS.BULLET_LIST}</Menu.ItemCommand>
            </Menu.Item>
            <Menu.Item
              value="check"
              onSelect={() => formatCheckList(editor, blockType)}
            >
              Check List
              <Menu.ItemCommand>{SHORTCUTS.CHECK_LIST}</Menu.ItemCommand>
            </Menu.Item>
            <Menu.Item
              value="quote"
              onSelect={() => formatQuote(editor, blockType)}
            >
              Quote
              <Menu.ItemCommand>{SHORTCUTS.QUOTE}</Menu.ItemCommand>
            </Menu.Item>
            <Menu.Item
              value="code"
              onSelect={() => formatCode(editor, blockType)}
            >
              Code Block
              <Menu.ItemCommand>{SHORTCUTS.CODE_BLOCK}</Menu.ItemCommand>
            </Menu.Item>
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
}

function ElementFormatDropdown({
  editor,
  value,
  disabled = false,
}: {
  editor: LexicalEditor;
  value: ElementFormatType;
  disabled: boolean;
}) {
  const formatOption = ELEMENT_FORMAT_OPTIONS[value || "left"];

  return (
    <>
      <Menu.Root>
        <Menu.Trigger asChild>
          <Button
            disabled={disabled}
            aria-label="Formatting options for text alignment"
            variant="outline"
            size="xs"
          >
            {formatOption.name}
            <FiChevronDown />
          </Button>
        </Menu.Trigger>
        <Portal>
          <Menu.Positioner>
            <Menu.Content>
              <Menu.ItemGroup>
                <Menu.Item
                  value="left"
                  onSelect={() => {
                    editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "left");
                  }}
                >
                  Left Align
                  <Menu.ItemCommand>{SHORTCUTS.LEFT_ALIGN}</Menu.ItemCommand>
                </Menu.Item>
                <Menu.Item
                  value="center"
                  onSelect={() => {
                    editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "center");
                  }}
                >
                  Center Align
                  <Menu.ItemCommand>{SHORTCUTS.CENTER_ALIGN}</Menu.ItemCommand>
                </Menu.Item>
                <Menu.Item
                  value="right"
                  onSelect={() => {
                    editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "right");
                  }}
                >
                  Right Align
                  <Menu.ItemCommand>{SHORTCUTS.RIGHT_ALIGN}</Menu.ItemCommand>
                </Menu.Item>
                <Menu.Item
                  value="justify"
                  onSelect={() => {
                    editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "justify");
                  }}
                >
                  Justify Align
                  <Menu.ItemCommand>{SHORTCUTS.JUSTIFY_ALIGN}</Menu.ItemCommand>
                </Menu.Item>
              </Menu.ItemGroup>
              <Menu.Separator />
              <Menu.ItemGroup>
                <Menu.Item
                  value="outdent"
                  onSelect={() => {
                    editor.dispatchCommand(OUTDENT_CONTENT_COMMAND, undefined);
                  }}
                >
                  Outdent
                  <Menu.ItemCommand>{SHORTCUTS.OUTDENT}</Menu.ItemCommand>
                </Menu.Item>
                <Menu.Item
                  value="indent"
                  onSelect={() => {
                    editor.dispatchCommand(INDENT_CONTENT_COMMAND, undefined);
                  }}
                >
                  Indent
                  <Menu.ItemCommand>{SHORTCUTS.INDENT}</Menu.ItemCommand>
                </Menu.Item>
              </Menu.ItemGroup>
            </Menu.Content>
          </Menu.Positioner>
        </Portal>
      </Menu.Root>
    </>
  );
}

function $findTopLevelElement(node: LexicalNode) {
  let topLevelElement =
    node.getKey() === "root"
      ? node
      : $findMatchingParent(node, (e) => {
          const parent = e.getParent();
          return parent !== null && $isRootOrShadowRoot(parent);
        });

  if (topLevelElement === null) {
    topLevelElement = node.getTopLevelElementOrThrow();
  }
  return topLevelElement;
}

export default function ToolbarPlugin({
  editor,
  activeEditor,
  setActiveEditor,
}: {
  editor: LexicalEditor;
  activeEditor: LexicalEditor;
  setActiveEditor: Dispatch<LexicalEditor>;
}): JSX.Element {
  const [selectedElementKey, setSelectedElementKey] = useState<NodeKey | null>(
    null
  );
  // const [modal, showModal] = useModal();
  const [isEditable, setIsEditable] = useState(() => editor.isEditable());
  const { toolbarState, updateToolbarState } = useToolbarState();

  const dispatchToolbarCommand = <T extends LexicalCommand<unknown>>(
    command: T,
    payload: CommandPayloadType<T> | undefined = undefined,
    skipRefocus: boolean = false
  ) => {
    activeEditor.update(() => {
      if (skipRefocus) {
        $addUpdateTag(SKIP_DOM_SELECTION_TAG);
      }

      // Re-assert on Type so that payload can have a default param
      activeEditor.dispatchCommand(command, payload as CommandPayloadType<T>);
    });
  };

  const dispatchFormatTextCommand = (
    payload: TextFormatType,
    skipRefocus: boolean = false
  ) => dispatchToolbarCommand(FORMAT_TEXT_COMMAND, payload, skipRefocus);

  const $handleHeadingNode = useCallback(
    (selectedElement: LexicalNode) => {
      const type = $isHeadingNode(selectedElement)
        ? selectedElement.getTag()
        : selectedElement.getType();

      if (type in blockTypeToBlockName) {
        updateToolbarState(
          "blockType",
          type as keyof typeof blockTypeToBlockName
        );
      }
    },
    [updateToolbarState]
  );

  const $handleCodeNode = useCallback(
    (element: LexicalNode) => {
      if ($isCodeNode(element)) {
        const language = element.getLanguage();
        updateToolbarState(
          "codeLanguage",
          language ? normalizeCodeLanguagePrism(language) || language : ""
        );
        const theme = element.getTheme();
        updateToolbarState("codeTheme", theme || "");
        return;
      }
    },
    [updateToolbarState]
  );

  const $updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      if (activeEditor !== editor && $isEditorIsNestedEditor(activeEditor)) {
        const rootElement = activeEditor.getRootElement();
        updateToolbarState(
          "isImageCaption",
          !!rootElement?.parentElement?.classList.contains(
            "image-caption-container"
          )
        );
      } else {
        updateToolbarState("isImageCaption", false);
      }

      const anchorNode = selection.anchor.getNode();
      const element = $findTopLevelElement(anchorNode);
      const elementKey = element.getKey();
      const elementDOM = activeEditor.getElementByKey(elementKey);

      updateToolbarState("isRTL", $isParentElementRTL(selection));

      // Update links
      const node = getSelectedNode(selection);
      const parent = node.getParent();
      const isLink = $isLinkNode(parent) || $isLinkNode(node);
      updateToolbarState("isLink", isLink);

      const tableNode = $findMatchingParent(node, $isTableNode);
      if ($isTableNode(tableNode)) {
        updateToolbarState("rootType", "table");
      } else {
        updateToolbarState("rootType", "root");
      }

      if (elementDOM !== null) {
        setSelectedElementKey(elementKey);
        if ($isListNode(element)) {
          const parentList = $getNearestNodeOfType<ListNode>(
            anchorNode,
            ListNode
          );
          const type = parentList
            ? parentList.getListType()
            : element.getListType();

          updateToolbarState("blockType", type);
        } else {
          $handleHeadingNode(element);
          $handleCodeNode(element);
        }
      }

      // Handle buttons
      updateToolbarState(
        "fontColor",
        $getSelectionStyleValueForProperty(selection, "color", "#000")
      );
      updateToolbarState(
        "bgColor",
        $getSelectionStyleValueForProperty(
          selection,
          "background-color",
          "#fff"
        )
      );
      updateToolbarState(
        "fontFamily",
        $getSelectionStyleValueForProperty(selection, "font-family", "Arial")
      );
      let matchingParent;
      if ($isLinkNode(parent)) {
        // If node is a link, we need to fetch the parent paragraph node to set format
        matchingParent = $findMatchingParent(
          node,
          (parentNode) => $isElementNode(parentNode) && !parentNode.isInline()
        );
      }

      // If matchingParent is a valid node, pass it's format type
      updateToolbarState(
        "elementFormat",
        $isElementNode(matchingParent)
          ? matchingParent.getFormatType()
          : $isElementNode(node)
          ? node.getFormatType()
          : parent?.getFormatType() || "left"
      );
    }
    if ($isRangeSelection(selection) || $isTableSelection(selection)) {
      // Update text format
      updateToolbarState("isBold", selection.hasFormat("bold"));
      updateToolbarState("isItalic", selection.hasFormat("italic"));
      updateToolbarState("isUnderline", selection.hasFormat("underline"));
      updateToolbarState(
        "isStrikethrough",
        selection.hasFormat("strikethrough")
      );
      updateToolbarState("isSubscript", selection.hasFormat("subscript"));
      updateToolbarState("isSuperscript", selection.hasFormat("superscript"));
      updateToolbarState("isHighlight", selection.hasFormat("highlight"));
      updateToolbarState("isCode", selection.hasFormat("code"));

      updateToolbarState("isLowercase", selection.hasFormat("lowercase"));
      updateToolbarState("isUppercase", selection.hasFormat("uppercase"));
      updateToolbarState("isCapitalize", selection.hasFormat("capitalize"));
    }
    if ($isNodeSelection(selection)) {
      const nodes = selection.getNodes();
      for (const selectedNode of nodes) {
        const parentList = $getNearestNodeOfType<ListNode>(
          selectedNode,
          ListNode
        );
        if (parentList) {
          const type = parentList.getListType();
          updateToolbarState("blockType", type);
        } else {
          const selectedElement = $findTopLevelElement(selectedNode);
          $handleHeadingNode(selectedElement);
          $handleCodeNode(selectedElement);
          // Update elementFormat for node selection (e.g., images)
          if ($isElementNode(selectedElement)) {
            updateToolbarState(
              "elementFormat",
              selectedElement.getFormatType()
            );
          }
        }
      }
    }
  }, [
    activeEditor,
    editor,
    updateToolbarState,
    $handleHeadingNode,
    $handleCodeNode,
  ]);

  useEffect(() => {
    return editor.registerCommand(
      SELECTION_CHANGE_COMMAND,
      (_payload, newEditor) => {
        setActiveEditor(newEditor);
        $updateToolbar();
        return false;
      },
      COMMAND_PRIORITY_CRITICAL
    );
  }, [editor, $updateToolbar, setActiveEditor]);

  useEffect(() => {
    activeEditor.getEditorState().read(
      () => {
        $updateToolbar();
      },
      { editor: activeEditor }
    );
  }, [activeEditor, $updateToolbar]);

  useEffect(() => {
    return mergeRegister(
      editor.registerEditableListener((editable) => {
        setIsEditable(editable);
      }),
      activeEditor.registerUpdateListener(({ editorState }) => {
        editorState.read(
          () => {
            $updateToolbar();
          },
          { editor: activeEditor }
        );
      }),
      activeEditor.registerCommand<boolean>(
        CAN_UNDO_COMMAND,
        (payload) => {
          updateToolbarState("canUndo", payload);
          return false;
        },
        COMMAND_PRIORITY_CRITICAL
      ),
      activeEditor.registerCommand<boolean>(
        CAN_REDO_COMMAND,
        (payload) => {
          updateToolbarState("canRedo", payload);
          return false;
        },
        COMMAND_PRIORITY_CRITICAL
      )
    );
  }, [$updateToolbar, activeEditor, editor, updateToolbarState]);

  return (
    <Flex roundedTop="sm" py={2} align="center" gap="0.25rem" overflowX="auto">
      <IconButton
        variant="ghost"
        size="xs"
        disabled={!toolbarState.canUndo || !isEditable}
        onClick={(e) =>
          dispatchToolbarCommand(UNDO_COMMAND, undefined, isKeyboardInput(e))
        }
        title={IS_APPLE ? "Undo (⌘Z)" : "Undo (Ctrl+Z)"}
        type="button"
        aria-label="Undo"
      >
        <FiRotateCcw />
      </IconButton>
      <IconButton
        variant="ghost"
        size="xs"
        disabled={!toolbarState.canRedo || !isEditable}
        onClick={(e) =>
          dispatchToolbarCommand(REDO_COMMAND, undefined, isKeyboardInput(e))
        }
        title={IS_APPLE ? "Redo (⇧⌘Z)" : "Redo (Ctrl+Y)"}
        type="button"
        aria-label="Redo"
      >
        <FiRotateCw />
      </IconButton>
      {toolbarState.blockType in blockTypeToBlockName &&
        activeEditor === editor && (
          <>
            <BlockFormatDropDown
              disabled={!isEditable}
              blockType={toolbarState.blockType}
              rootType={toolbarState.rootType}
              editor={activeEditor}
            />
          </>
        )}

      <>
        <IconButton
          size="xs"
          variant={toolbarState.isBold ? "surface" : "ghost"}
          disabled={!isEditable}
          onClick={(e) => dispatchFormatTextCommand("bold", isKeyboardInput(e))}
          title={`Bold (${SHORTCUTS.BOLD})`}
          type="button"
          aria-label={`Format text as bold. Shortcut: ${SHORTCUTS.BOLD}`}
        >
          <FiBold />
        </IconButton>
        <IconButton
          size="xs"
          variant={toolbarState.isItalic ? "surface" : "ghost"}
          disabled={!isEditable}
          onClick={(e) =>
            dispatchFormatTextCommand("italic", isKeyboardInput(e))
          }
          title={`Italic (${SHORTCUTS.ITALIC})`}
          type="button"
          aria-label={`Format text as italics. Shortcut: ${SHORTCUTS.ITALIC}`}
        >
          <FiItalic />
        </IconButton>
        <IconButton
          size="xs"
          variant={toolbarState.isUnderline ? "surface" : "ghost"}
          disabled={!isEditable}
          onClick={(e) =>
            dispatchFormatTextCommand("underline", isKeyboardInput(e))
          }
          title={`Underline (${SHORTCUTS.UNDERLINE})`}
          type="button"
          aria-label={`Format text to underlined. Shortcut: ${SHORTCUTS.UNDERLINE}`}
        >
          <FiUnderline />
        </IconButton>
      </>

      <ElementFormatDropdown
        disabled={!isEditable}
        value={toolbarState.elementFormat}
        editor={activeEditor}
      />
    </Flex>
  );
}
