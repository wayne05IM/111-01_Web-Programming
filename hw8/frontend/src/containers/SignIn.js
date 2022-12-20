import AppTitle from "../components/Title";
import LogIn from "../components/LogIn";
import { useChat } from "./hook/useChat";

const SignIn = () => {
  const { me, setMe, setSignedIn, displayStatus } = useChat();
  const handleLogin = (name) => {
    "signedIn";
    if (!name)
      displayStatus({
        type: "error",
        msg: "Missing user name",
      });
    else setSignedIn(true);
  };
  return (
    <>
      <AppTitle />
      <LogIn me={me} setName={setMe} onLogin={handleLogin} />
    </>
  );
};

export default SignIn;