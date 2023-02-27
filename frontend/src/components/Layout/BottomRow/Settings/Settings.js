import React from "react";
import useUser from "../../../../hooks/useUser";

const Settings = () => {
  const { user } = useUser();
  return (
    <div className="bg-black opacity-75 fixed bottom-12 left-4 z-50 w-64 h-80 flex flex-col justify-between p-4 rounded-md text-lg">
      <ol className="flex flex-col gap-2">
        <li>Todo</li>
      </ol>

      <ol>
        <li className="text-sm opacity-75">Take a Tour</li>
        <li className="text-sm opacity-75">Help</li>
        <li className="text-sm opacity-75">About</li>
      </ol>
      <div>
        <details>
          <summary className="display flex  items-center gap-2 capitalize">
            <img
              alt="profile"
              src="beautiful_sky.jpg"
              className="h-10 w-10 rounded-full"
            ></img>
            <span>{user.username}</span>
          </summary>
          <ol>
            <li>Profile</li>
            <li>Logout</li>
          </ol>
        </details>
      </div>
    </div>
  );
};

export default Settings;
