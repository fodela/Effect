import useUser from "../../../../hooks/useUser";

const Salutation = () => {
  const { user } = useUser();

  console.log(" 🕵️‍♂️", user);
  return (
    <div className="self-center text-3xl relative">
      <div className="bgShadow" />
      Good evening, <span className="capitalize">{user.username}</span>.
    </div>
  );
};
export default Salutation;
