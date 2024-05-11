import { TouchableOpacity } from "react-native";
import PlayIcon from "../assets/icons/PlayIcon";
import PauseIcon from "../assets/icons/PauseIcon";
import GoForward10SecIcon from "../assets/icons/GoForward10SecIcon";
import GoBackward10SecIcon from "../assets/icons/GoBackward10SecIcon";
import Backward02Icon from '../assets/icons/Backward02Icon';
import Forward02Icon from '../assets/icons/Forward02Icon';

const AudioPlayerButton = ({ type, handlePress }) => {

  let buttonComponent;

  switch (type) {
    case "play":
      buttonComponent = <PlayIcon />;
      break;
    case "pause":
      buttonComponent = <PauseIcon />;
      break;
    case '10back':
      buttonComponent = <GoBackward10SecIcon />
      break;
    case '10forward':
      buttonComponent = <GoForward10SecIcon />
      break;
    case 'slow':
      buttonComponent = <Backward02Icon />
      break;
    case 'fast':
      buttonComponent = <Forward02Icon />
      break;
    default:
      buttonComponent = null; 
  }


  return (
    <TouchableOpacity
      onPress={handlePress}
      className="my-2 mb-6 rounded-lg w-10 h-10 justify-center items-center bg-slate-200/40"
      activeOpacity={0.7}
    >
      { buttonComponent }
    </TouchableOpacity>
  );
};

export default AudioPlayerButton;