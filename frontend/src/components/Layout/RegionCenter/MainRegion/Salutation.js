import { useEffect, useState } from "react";
import { selectCurrentUser } from "../../../../features/auth/authSlice";
import { useSelector } from "react-redux";

const Salutation = () => {
  const [greetings, setGreetings] = useState("");

  useEffect(() => {
    const date = new Date();
    const currentHour = date.getHours();
    if (currentHour < 12) {
      setGreetings("Good morning,");
    } else if (currentHour < 18) {
      setGreetings("Good afternoon,");
    } else {
      setGreetings("Good evening,");
    }
  });

  const  user  = useSelector(selectCurrentUser);

  return (
    <div className="self-center text-3xl relative">
      <div className="bgShadow" />
      {greetings} <span className="capitalize">{user}</span>.
    </div>
  );
};
export default Salutation;
