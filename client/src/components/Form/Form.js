import React from "react";
import { withFormik, Form, Field } from "formik";
import * as yup from "yup";
import axios from "axios";

function OnboardingForm({ users, setUsers, touched, errors }) {
  return (
    <Form className="OnboardForm">
      <h2>Create Users</h2>
      <label htmlFor="name">
        Name:
        <Field id="name" name="name" type="text" placeholder="Enter Name" />
        {touched.name && errors.name && <p className="errors">{errors.name}</p>}
      </label>
      <label htmlFor="email">
        Email:
        <Field id="email" name="email" type="text" placeholder="Enter Email" />
        {touched.email && errors.email && (
          <p className="errors">{errors.email}</p>
        )}
      </label>
      <label htmlFor="password">
        Password:
        <Field
          id="password"
          name="password"
          type="text"
          placeholder="Enter Password"
        />
        {touched.password && errors.password && (
          <p className="errors">{errors.password}</p>
        )}
      </label>
      <label htmlFor="terms">
        Accept terms of service{" "}
        <Field id="terms" name="isTermAccepted" type="checkbox" />
        {touched.isTermAccepted && errors.isTermAccepted && (
          <p className="errors">{errors.isTermAccepted}</p>
        )}
      </label>
      <button type="submit" className="onboardSubmit">
        Submit
      </button>
    </Form>
  );
}

export default withFormik({
  mapPropsToValues: () => {
    return {
      name: "",
      email: "",
      password: "",
      isTermAccepted: false
    };
  },
  validationSchema: yup.object().shape({
    name: yup.string().required(),
    email: yup.string().required(),
    password: yup.string().required(),
    isTermAccepted: yup
      .boolean()
      .oneOf([true], "Must Accept Terms and Conditions")
  }),
  handleSubmit: (values, { props, resetForm }) => {
    axios
      .post("https://reqres.in/api/users", {
        name: values.name,
        email: values.email,
        password: values.password
      })
      .then(res => {
        console.log(res.data);
        props.setUsers([
          ...props.users,
          { id: res.data.id, name: res.data.name, email: res.data.email }
        ]);
        resetForm();
      })
      .catch(err => {
        console.log(err);
      });
  }
})(OnboardingForm);
