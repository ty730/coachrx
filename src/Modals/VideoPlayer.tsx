import { IoIosClose } from "react-icons/io";

interface Props {
    onClose: () => void;
    video: string | undefined;
    name: string | undefined;
}

function VideoPlayer(props: Props) {

    return (
      <div className="VideoPlayer">
        <div>
            <div className="VideoPlayerTop">
                <h4>Demo Video</h4>
                <IoIosClose size={32} onClick={props.onClose}/>
            </div>
            <p>{props.name}</p>
        </div>
        <div>
            {props.video}
        </div>
      </div>
  );
}

export default VideoPlayer;