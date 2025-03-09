import { JSX, useEffect } from 'react';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    children: JSX.Element;
    class?: string;
}

function Modal(props: Props) {
    return (
        <div className='ModalWrapper' onClick={() => props.onClose()}>
            <div className={`ModalInner ${props.class}`} onClick={e => e.stopPropagation()}>
                {props.isOpen ? props.children : <></>}
            </div>
        </div>
    );
}

export default Modal;