import { useEffect, useState } from "react";
import useUser from "../../../../hooks/useUser";

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

  const { user } = useUser();

  return (
    <div className="self-center text-3xl relative">
      <div className="bgShadow" />
      {greetings} <span className="capitalize">{user.username}</span>.
    </div>
  );
};
export default Salutation;
