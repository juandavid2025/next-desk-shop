import { getSession } from "next-auth/react";
import { Field, Form, Formik } from "formik";

function profilePage() {
  const submitHandler = async (values, actions) => {
    const { oldPassword, newPassword } = values;
    const response = await fetch("/api/user/change-password", {
      method: "PATCH",
      body: JSON.stringify({ oldPassword, newPassword }),
    });
    const data = await response.json();
    console.log(data);
  };

  return (
    <Formik
      initialValues={{ oldPassword: "", newPassword: "" }}
      onSubmit={submitHandler}
    >
      {(props) => (
        <Form>
          <Field
            type="password"
            name="oldPassword"
            placeholder="Previous password"
          />
          <Field
            type="password"
            name="newPassword"
            placeholder="New password"
          />
          <button type="submit">Change Password</button>
        </Form>
      )}
    </Formik>
  );
}

export default profilePage;

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}
