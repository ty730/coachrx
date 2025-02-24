import React from 'react';
import { LiaHomeSolid } from "react-icons/lia";
import { HiOutlineBell } from "react-icons/hi";
import { BsPersonCircle } from "react-icons/bs";

type Props = {}

function Footer(props: Props) {
  return (
    <div className='FooterWrapper'>
        <div className='Footer'>
            <div>
                <div>
                    <LiaHomeSolid />
                </div>
                <div>Home</div>
            </div>
            <div>
                <div>
                    <HiOutlineBell />
                </div>
                <div>Notifications</div>
            </div>
            <div>
                <div>
                    <BsPersonCircle />
                </div>
                <div>Profile</div>
            </div>
        </div>
    </div>
  );
}

export default Footer;