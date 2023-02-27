import { useContext, useState } from "react";
import Todo from "./Todo/Todo";
import { FiSettings } from "react-icons/fi";
import Modal from "../../Modal";
import Settings from "./Settings/Settings";
import WallpaperContext from "../../../context/WallpaperProvider";

const BottomRow = () => {
  const [isTodoOpen, setIsTodoOpen] = useState(true);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const { wallpaperDetails } = useContext(WallpaperContext);

  return (
    <div className="flex justify-between ">
      <div className="bottom-left flex items-center gap-2 relative">
        <div className="bgShadow" />
        <FiSettings
          className="text-2xl"
          onClick={() => setIsSettingsOpen(true)}
        />
        <Modal
          modalId="root-modal"
          open={isSettingsOpen}
          onClose={() => setIsSettingsOpen(false)}
        >
          <Settings />
        </Modal>

        <div className="flex flex-col">
          {wallpaperDetails?.location && <p>{wallpaperDetails?.location}</p>}
          {wallpaperDetails && (
            <p className="text-sm">
              {wallpaperDetails?.user?.first_name}{" "}
              {wallpaperDetails?.user?.last_name}/ Unsplash
            </p>
          )}
        </div>
      </div>
      <div className="bottom-right relative">
        <div className="bgShadow" />
        <button onClick={() => setIsTodoOpen(!isTodoOpen)}>Todo</button>
        <Todo isTodoOpen={isTodoOpen} />
      </div>
    </div>
  );
};
export default BottomRow;
