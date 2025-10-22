import { useCallback } from "react";
import Button from "../../../components/Button/Button";
import { useTranslation } from "../../../contexts/TranslationProvider";
import "./Paste.action.scss";

export default function PasteAction({ triggerAction, pasteState, conflictingFiles, onPaste }) {
  const t = useTranslation();

  const handlePaste = useCallback(mode => {
    onPaste(pasteState.copiedFiles, pasteState.destinationFolder, pasteState.operationType, mode);
    triggerAction.close();
  }, [onPaste, pasteState, triggerAction]);

  return (
    <div className="file-paste-confirm">
      <div className="file-paste-confirm-text">
        {conflictingFiles.length === 1 ? t("pasteConflict", { fileName: conflictingFiles[0] }) : t("pasteConflicts")}
        {conflictingFiles.length > 1 &&
          <div className="file-paste-conflict-text">
            <p>{t("conflictingFiles")}</p>
            <div className="file-paste-conflict-list">
              {conflictingFiles.map((file, index) => <div key={index}>{file}</div>)}
            </div>
          </div>
        }
      </div>
      <div className="file-paste-confirm-actions">
        <Button type="secondary" onClick={() => triggerAction.close()}>
          {t("cancel")}
        </Button>
        <Button type="danger" onClick={() => handlePaste("replace")}>
          {t("replace")}
        </Button>
        <Button onClick={() => handlePaste("skip")}>
          {t("skip")}
        </Button>
      </div>
    </div>
  );
};