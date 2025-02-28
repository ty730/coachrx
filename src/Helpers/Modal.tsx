import { JSX, useEffect } from 'react';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    children: JSX.Element;
}

function Modal(props: Props) {
    return (
        <div className='ModalWrapper' onClick={() => props.onClose()}>
            <div className='ModalInner' onClick={e => e.stopPropagation()}>
                {props.isOpen ? props.children : <></>}
            </div>
        </div>
    );
}

export default Modal;