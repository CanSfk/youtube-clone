import {LoginForm} from "../../forms";
import FrontEndLayout from "../../layouts/front-end/layout";
import {useAuth} from "../../stores/auth/hooks";
import VideoList from "./partials/video-list";

export const Home = () => {
  const {state} = useAuth();

  return (
    <FrontEndLayout>
      <article className='w-full flex-1'>{state ? <VideoList /> : <LoginForm />}</article>
    </FrontEndLayout>
  );
};

export default Home;
