import { useRouter } from "next/router";
import AuthForm from "@/components/auth/AuthForm";

function AuthPage(props) {
  return <AuthForm authMode={props.mode} />;
}

export default AuthPage;

export function getStaticProps(context) {
  return {
    props: {
      mode: context.params.mode,
    },
  };
}

export function getStaticPaths() {
  return {
    paths: [
      {
        params: { mode: "login" },
      },
      {
        params: { mode: "signup" },
      },
    ],
    fallback: "blocking",
  };
}
