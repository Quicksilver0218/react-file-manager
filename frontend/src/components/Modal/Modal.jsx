import { MdClose } from "react-icons/md";
import { useEffect, useRef } from "react";
import { useTranslation } from "../../contexts/TranslationProvider";
import "./Modal.scss";

const Modal = ({
  children,
  show,
  setShow,
  heading,
  dialogWidth = 400,
  dialogHeight,
  closeButton = true,
  onClose,
}) => {
  const modalRef = useRef(null);
  const t = useTranslation();

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      setShow(false);
    }
  };

  useEffect(() => {
    if (show) {
      modalRef.current.showModal();
    } else {
      modalRef.current.close();
    }
  }, [show]);

  return (
    <dialog
      ref={modalRef}
      className="backdrop"
      onClick={() => {
        onClose?.();
        setShow(false);
      }}
    >
      <div
        className="dialog"
        style={{ width: dialogWidth, height: dialogHeight }}
        onKeyDown={handleKeyDown}
        onClick={e => e.stopPropagation()}
      >
        <div className="fm-modal-header">
          <span className="fm-modal-heading">{heading}</span>
          {closeButton && (
            <MdClose
              size="1.5em"
              onClick={() => setShow(false)}
              className="close-icon"
              title={t("close")}
            />
          )}
        </div>
        {children}
      </div>
    </dialog>
  );
};

export default Modal;
