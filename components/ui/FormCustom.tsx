// import {
//   FormikErrors,
//   useFormik,
//   Formik,
//   Field,
//   Form,
//   ErrorMessage,
// } from 'formik';
// import * as yup from 'yup';

// interface FormValues {
//   email: string;
// }

// export const FormCustom = () => {
//   const validate = ({ email }: FormValues) => {
//     const errors: FormikErrors<FormValues> = {};

//     if (!email) {
//       errors.email = 'Required';
//     }

//     return errors;
//   };

//   const {
//     handleChange,
//     handleBlur,
//     handleSubmit,
//     handleReset,
//     getFieldProps,
//     values: { email },
//     errors,
//     touched,
//   } = useFormik({
//     initialValues: {
//       email: '',
//     },
//     onSubmit: (values) => {
//       alert(JSON.stringify(values, null, 2));
//     },
//     validationSchema: yup.object({
//       email: yup
//         .string()
//         .email('Email format invalid')
//         .required('Email required'),
//     }),
//     //validate,
//   });
//   return (
//     <>
//       <Formik
//         initialValues={{ email: '' }}
//         onSubmit={(values) => console.log(values)}
//         validationSchema={yup.object({
//           email: yup
//             .string()
//             .email('Email format invalid')
//             .required('Email required'),
//         })}
//       >
//         {({ handleReset: handleResetProps }) => (
//           <Form onSubmit={handleSubmit} noValidate>
//             <label htmlFor="email">Email Address</label>
//             <Field type="email" name="email" />
//             <ErrorMessage name="email" component="span" />
//             <br />
//             <br />
//             <button type="submit">Submit</button>
//             <button onClick={handleResetProps}>Reset</button>
//           </Form>
//         )}
//       </Formik>

//       {/* <form onSubmit={handleSubmit} noValidate>
//         <label htmlFor="email">Email Address</label>
//         <input
//           id="email"
//           type="email"
//           //name="email"
//           // onChange={handleChange}
//           // value={email}
//           // onBlur={handleBlur}
//           {...getFieldProps('email')}
//         />
//         {touched.email && errors.email && <span>{errors.email}</span>}
//         <br />
//         <br />
//         <button type="submit">Submit</button>
//         <button onClick={handleReset}>Reset</button>
//       </form> */}
//     </>
//   );
// };

// export default FormCustom;

export const FormCustom = () => {
  return <div>FormCustom</div>;
};

export default FormCustom;
