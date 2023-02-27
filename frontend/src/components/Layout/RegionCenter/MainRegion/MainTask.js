import { useEffect, useRef, useState } from "react";
import TodoItem from "../../BottomRow/Todo/TodoItem/TodoItem";

const MainTask = () => {
  const mainFocusInputRef = useRef(null);
  const [mainFocus, setMainFocus] = useState(null);

  // fetch from localstorage focus that we stored with date
  useEffect(() => {
    mainFocusInputRef.current?.focus();
  }, []);

  const handleSubmit = () => {
    setMainFocus({
      description: mainFocusInputRef.current.value,
      task_state: { is_completed: false },
    });
  };
  return (
    <div className="max-w-3xl text-2xl sm:text-3xl md:text-4xl md:max-w-4xl self-center text-white">
      {mainFocus ? (
        <div className="relative">
          <div className="bgShadow" />
          <TodoItem
            // done={() => changeMainTaskState()}
            task={mainFocus}
          />
        </div>
      ) : (
        <div className="relative">
          <div className="bgShadow" />
          <h3 className=" my-2">What is your main focus for today?</h3>
          <form onSubmit={handleSubmit}>
            <input
              className="outline-none bg-inherit border-b-white border-b-2 w-full overflow-scroll"
              ref={mainFocusInputRef}
            />
          </form>
        </div>
      )}
    </div>
  );
};
export default MainTask;
