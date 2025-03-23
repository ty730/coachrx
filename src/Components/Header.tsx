import React from 'react';
import { BiComment } from "react-icons/bi";

type Props = {}

function Header(props: Props) {
    const sayings = ['Progress does not happen in a straight line, it\'s a zig zag', 'Dublin is watching', 'Aim to be constantly consistent'];
    return (
        <div className='HeaderWrapper'>
            <div className="Header">
                <div className='FlexStart'>
                    <div className='CircleProgress'>SJ</div>
                </div>
                <div className='HeaderHello'>
                    <h4>Hi Sara,</h4>
                    <p className='Italic'>{sayings[1]}</p>
                </div>
                <div>
                    <div className='HeaderCommentContainer'>
                        <button className='HeaderCommentButton'>
                            <BiComment size={40}/>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;