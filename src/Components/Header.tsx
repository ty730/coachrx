import React from 'react';
import { BiComment } from "react-icons/bi";

type Props = {}

function Header(props: Props) {
  return (
    <div className='HeaderWrapper'>
        <div className="Header">
            <div className='FlexStart'>
                <div className='CircleProgress'>SJ</div>
            </div>
            <div className='HeaderHello'>
                <h4>Hi Sara,</h4>
                <p className='Italic'>Aim to be constantly consistent</p>
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