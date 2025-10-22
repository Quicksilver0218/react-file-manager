import { useMemo } from "react";
import Checkbox from "../../components/Checkbox/Checkbox";
import { useFileNavigation } from "../../contexts/FileNavigationContext";
import { useSelection } from "../../contexts/SelectionContext";
import { useTranslation } from "../../contexts/TranslationProvider";

const FilesHeader = ({ unselectFiles, onSort, sortConfig }) => {
  const t = useTranslation();

  const { selectedFiles, setSelectedFiles } = useSelection();
  const { currentPathFiles } = useFileNavigation();

  const allFilesSelected = useMemo(() => {
    return currentPathFiles.length > 0 && selectedFiles.length === currentPathFiles.length;
  }, [selectedFiles, currentPathFiles]);

  const handleSelectAll = (e) => {
    if (e.target.checked)
      setSelectedFiles(currentPathFiles);
    else
      unselectFiles();
  };

  const handleSort = (key) => {
    if (onSort) {
      onSort(key);
    }
  };

  return (
    <div className="files-header">
      <div className="file-select-all">
        <Checkbox
          id="selectAll"
          checked={allFilesSelected}
          onChange={handleSelectAll}
          title={t("selectAll")}
          disabled={currentPathFiles.length === 0}
        />
      </div>
      <div
        className={`column file-name ${sortConfig?.key === "name" ? "active" : ""}`}
        onClick={() => handleSort("name")}
      >
        {t("name")}
        {sortConfig?.key === "name" && (
          <span className="sort-indicator">{sortConfig.direction === "asc" ? " ▲" : " ▼"}</span>
        )}
      </div>
      <div
        className={`column file-date ${sortConfig?.key === "modified" ? "active" : ""}`}
        onClick={() => handleSort("modified")}
      >
        {t("modified")}
        {sortConfig?.key === "modified" && (
          <span className="sort-indicator">{sortConfig.direction === "asc" ? " ▲" : " ▼"}</span>
        )}
      </div>
      <div
        className={`column file-size ${sortConfig?.key === "size" ? "active" : ""}`}
        onClick={() => handleSort("size")}
      >
        {t("size")}
        {sortConfig?.key === "size" && (
          <span className="sort-indicator">{sortConfig.direction === "asc" ? " ▲" : " ▼"}</span>
        )}
      </div>
    </div>
  );
};

export default FilesHeader;