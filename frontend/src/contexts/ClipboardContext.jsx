import { createContext, useContext } from "react";
import { useSelection } from "./SelectionContext";
import { validateApiCallback } from "../utils/validateApiCallback";
import useSessionStorage from "../hooks/useSessionStorage";

const ClipBoardContext = createContext();

export const ClipBoardProvider = ({ children, onPaste, onCut, onCopy, setPasteState, setConflictingFiles }) => {
  const [clipBoard, setClipBoard] = useSessionStorage("clipBoard", null);
  const { selectedFiles, setSelectedFiles } = useSelection();

  const handleCutCopy = (isMoving) => {
    setClipBoard({
      files: selectedFiles,
      isMoving: isMoving,
    });

    if (isMoving) {
      !!onCut && onCut(selectedFiles);
    } else {
      !!onCopy && onCopy(selectedFiles);
    }
  };

  // Todo: Show error if destination folder already has file(s) with the same name
  const handlePasting = (destinationFolder) => {
    if (destinationFolder && !destinationFolder.isDirectory) return;

    const copiedFiles = clipBoard.files;
    const operationType = clipBoard.isMoving ? "move" : "copy";

    validateApiCallback(onPaste, "onPaste", copiedFiles, destinationFolder, operationType).then(conflicts => {
      if (conflicts && conflicts.length) {
        setConflictingFiles(conflicts);
        setPasteState({ copiedFiles, destinationFolder, operationType });
      }
    });

    clipBoard.isMoving && setClipBoard(null);
    setSelectedFiles([]);
  };

  return (
    <ClipBoardContext.Provider value={{ clipBoard, setClipBoard, handleCutCopy, handlePasting }}>
      {children}
    </ClipBoardContext.Provider>
  );
};

export const useClipBoard = () => useContext(ClipBoardContext);
