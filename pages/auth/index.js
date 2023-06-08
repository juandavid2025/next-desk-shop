export default function RedirectAuthPage() {
  return;
}

export function getStaticProps() {
  return {
    redirect: {
      destination: "/auth/login",
      permanent: false,
    },
  };
}
