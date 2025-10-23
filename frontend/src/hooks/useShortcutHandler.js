import { useKeyPress } from "./useKeyPress";
import { shortcuts } from "../utils/shortcuts";
import { useClipBoard } from "../contexts/ClipboardContext";
import { useFileNavigation } from "../contexts/FileNavigationContext";
import { useSearch } from "../contexts/SearchContext";
import { useSelection } from "../contexts/SelectionContext";
import { useLayout } from "../contexts/LayoutContext";
import { validateApiCallback } from "../utils/validateApiCallback";
import { useCallback } from "react";

export const useShortcutHandler = (triggerAction, onRefresh, permissions) => {
  const { setClipBoard, handleCutCopy, handlePasting } = useClipBoard();
  const { currentFolder, currentPathFiles } = useFileNavigation();
  const { selectedFiles, setSelectedFiles, handleDownload } = useSelection();
  const searchInputRef = useSearch();
  const { setActiveLayout } = useLayout();

  const triggerCreateFolder = () => {
    if (permissions.create)
      triggerAction.show("createFolder");
  };

  const triggerUploadFiles = () => {
    if (permissions.upload)
      triggerAction.show("uploadFile");
  };

  const triggerCutItems = () => {
    if (permissions.move)
      handleCutCopy(true);
  };

  const triggerCopyItems = () => {
    if (permissions.copy)
      handleCutCopy(false);
  };

  const triggerPasteItems = () => {
    handlePasting(currentFolder);
  };

  const triggerRename = () => {
    if (permissions.rename)
      triggerAction.show("rename");
  };

  const triggerDownload = () => {
    if (permissions.download)
      handleDownload();
  };

  const triggerDelete = () => {
    if (permissions.delete && selectedFiles.length) {
      triggerAction.show("delete");
    }
  };

  const triggerSelectFirst = () => {
    if (currentPathFiles.length > 0) {
      setSelectedFiles([currentPathFiles[0]]);
    }
  };

  const triggerSelectLast = () => {
    if (currentPathFiles.length > 0) {
      setSelectedFiles([currentPathFiles.at(-1)]);
    }
  };

  const triggerSelectAll = () => {
    setSelectedFiles(currentPathFiles);
  };

  const triggerClearSelection = () => {
    setSelectedFiles((prev) => (prev.length > 0 ? [] : prev));
  };

  const triggerRefresh = () => {
    validateApiCallback(onRefresh, "onRefresh");
    setClipBoard(null);
  };

  const triggerSearch = useCallback(() => {
    if (!searchInputRef.current)
      return;
    searchInputRef.current.focus();
    searchInputRef.current.select();
  }, [searchInputRef]);

  const triggerGridLayout = () => {
    setActiveLayout("grid");
  };
  const triggerListLayout = () => {
    setActiveLayout("list");
  };

  // Keypress detection will be disbaled when some Action is in active state.
  useKeyPress(shortcuts.createFolder, triggerCreateFolder, triggerAction.isActive);
  useKeyPress(shortcuts.uploadFiles, triggerUploadFiles, triggerAction.isActive);
  useKeyPress(shortcuts.cut, triggerCutItems, triggerAction.isActive);
  useKeyPress(shortcuts.copy, triggerCopyItems, triggerAction.isActive);
  useKeyPress(shortcuts.paste, triggerPasteItems, triggerAction.isActive);
  useKeyPress(shortcuts.rename, triggerRename, triggerAction.isActive);
  useKeyPress(shortcuts.download, triggerDownload, triggerAction.isActive);
  useKeyPress(shortcuts.delete, triggerDelete, triggerAction.isActive);
  useKeyPress(shortcuts.jumpToFirst, triggerSelectFirst, triggerAction.isActive);
  useKeyPress(shortcuts.jumpToLast, triggerSelectLast, triggerAction.isActive);
  useKeyPress(shortcuts.selectAll, triggerSelectAll, triggerAction.isActive);
  useKeyPress(shortcuts.clearSelection, triggerClearSelection, triggerAction.isActive);
  useKeyPress(shortcuts.refresh, triggerRefresh, triggerAction.isActive);
  useKeyPress(shortcuts.search, triggerSearch, triggerAction.isActive);
  useKeyPress(shortcuts.gridLayout, triggerGridLayout, triggerAction.isActive);
  useKeyPress(shortcuts.listLayout, triggerListLayout, triggerAction.isActive);
};
