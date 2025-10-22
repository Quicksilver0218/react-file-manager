import { useEffect, useState } from "react";
import Modal from "../../components/Modal/Modal";
import DeleteAction from "./Delete/Delete.action";
import UploadFileAction from "./UploadFile/UploadFile.action";
import PreviewFileAction from "./PreviewFile/PreviewFile.action";
import { useSelection } from "../../contexts/SelectionContext";
import { useShortcutHandler } from "../../hooks/useShortcutHandler";
import { useTranslation } from "../../contexts/TranslationProvider";
import PasteAction from "./Paste/Paste.action";

const Actions = ({
  fileUploadConfig,
  onFileUploading,
  onFileUploaded,
  onDelete,
  onPaste,
  onRefresh,
  maxFileSize,
  filePreviewPath,
  filePreviewComponent,
  acceptedFileTypes,
  triggerAction,
  permissions,
  pasteState,
  conflictingFiles,
}) => {
  const [activeAction, setActiveAction] = useState(null);
  const { selectedFiles } = useSelection();
  const t = useTranslation();

  // Triggers all the keyboard shortcuts based actions
  useShortcutHandler(triggerAction, onRefresh, permissions);

  const actionTypes = {
    uploadFile: {
      title: t("upload"),
      component: (
        <UploadFileAction
          fileUploadConfig={fileUploadConfig}
          maxFileSize={maxFileSize}
          acceptedFileTypes={acceptedFileTypes}
          onFileUploading={onFileUploading}
          onFileUploaded={onFileUploaded}
        />
      ),
      width: 720,
    },
    delete: {
      title: t("delete"),
      component: <DeleteAction triggerAction={triggerAction} onDelete={onDelete} />,
    },
    previewFile: {
      title: t("preview"),
      component: (
        <PreviewFileAction
          filePreviewPath={filePreviewPath}
          filePreviewComponent={filePreviewComponent}
        />
      ),
      width: 1280,
      height: 720,
    },
    paste: {
      title: pasteState?.operationType === "copy" ? t("copyFiles") : t("moveFiles"),
      component: <PasteAction triggerAction={triggerAction} pasteState={pasteState} conflictingFiles={conflictingFiles} onPaste={onPaste} />,
    },
  };

  useEffect(() => {
    if (triggerAction.isActive) {
      const actionType = triggerAction.actionType;
      if (actionType === "previewFile") {
        actionTypes[actionType].title = selectedFiles?.name ?? t("preview");
      }
      setActiveAction(actionTypes[actionType]);
    } else {
      setActiveAction(null);
    }
  }, [triggerAction.isActive]);

  useEffect(() => {
    if (conflictingFiles.length > 0)
      triggerAction.show("paste");
  }, [conflictingFiles]);

  if (activeAction) {
    return (
      <Modal
        heading={activeAction.title}
        show={triggerAction.isActive}
        setShow={triggerAction.close}
        dialogWidth={activeAction.width}
        dialogHeight={activeAction.height}
      >
        {activeAction?.component}
      </Modal>
    );
  }
};

export default Actions;
