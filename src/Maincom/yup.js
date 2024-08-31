import * as yup from 'yup';

const password = /^(?=.*\d).{8,}$/;
const schema = yup.object().shape({
  email: yup.string().email("Please enter a valid email that contain @ ").required("Required"),
  password: yup.string().min(8).matches(password, { message: "The password must contain at least one number" }).required("Required"),
});


export const schemas = yup.object().shape({
  fullName: yup.string().required("Required"),  
  email: yup.string().email("Please enter a valid email").required("Required"),
  password: yup.string().min(8).matches(password, { message: "The password must contain at least one number" }).required("Required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Required"),
});


export default schema;
