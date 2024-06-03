import {LoginForm} from "../../forms";
import {useAuth} from "../../stores/auth/hooks";
import VideoList from "./partials/video-list";

export const Home = () => {
  const {state} = useAuth();
  
  return <article className='w-full flex-1'>{state ? <VideoList /> : <LoginForm />}</article>;
};

export default Home;
