import { useState } from "react";
// import RegisterForm from "./RegisterFrom";
// import { saveData } from "../interface/userData";
import { Form, Formik, FormikProps, ErrorMessage, useFormik } from "formik";
import * as Yup from "yup";
// interface StepProps {
//   step: number;
// }

const MultiStepForm = () => {
  const [step, setStep] = useState(1);

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleSubmit = (step: number, values: any) => {
    if (step === 3) {
      alert('SUBMITED');
      console.log(values.username);
      console.log(values.password);
      console.log(values.email);
    } else {
      handleNext();
    }
  };

  const validationSchema = Yup.object({
    username: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Required")
  });


  const formik = useFormik({
    onSubmit: (values, { setSubmitting }) => {
      setTimeout(() => {
        handleSubmit(step, values)
        setSubmitting(false)
        console.log(values)
      }, 400)
    },
    initialValues: {
      username: "",
      email: "",
      fullname : "",
      HpNumber : "",
      password: "",
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
    <div className="bg-blue-600 flex items-center justify-center h-screen">
      <div className="bg-blue-300 p-6 rounded-lg shadow-md w-full lg:max-w-xl">
        <h2 className="text-lg font-medium mb-4">Registration Form</h2>
        <div className="flex mb-4">
          <div
            className={`w-1/2 border-r border-gray-400 ${
              step === 1 ? "bg-blue-500 text-white" : "bg-gray-200"
            } p-2 text-center cursor-pointer`}
            onClick={() => setStep(1)}
          >
            Step 1
          </div>
          <div
            className={`w-1/2 ${
              step === 2 ? "bg-blue-500 text-white" : "bg-gray-200"
            } p-2 text-center cursor-pointer`}
            onClick={() => setStep(2)}
          >
            Step 2
          </div>
          <div
            className={`w-1/2 ${
              step === 3 ? "bg-blue-500 text-white" : "bg-gray-200"
            } p-2 text-center cursor-pointer`}
            onClick={() => setStep(3)}
          >
            Step 3
          </div>
        </div>
       
        {step === 1 ? (
              <Step1
                value={formik.values.username}
                value2={formik.values.password}
                onChange1={formik.handleChange}
                onChange2={formik.handleChange}
              />
            ) : step === 2 ? (
              <Step2
                value={formik.values.fullname}
                value2={formik.values.HpNumber}
                onChange1={formik.handleChange}
              />
            ) : (
              <Step3
              value={formik.values.email}
              onChange={formik.handleChange}
              />
            )}

          <div className="flex justify-between mt-6">
            {step > 1 && (
              <button
                className="bg-gray-300 px-6 py-1.5 rounded-lg text-gray-700 hover:bg-gray-400"
                onClick={(values) => {
                  handleBack();
                }}
              >
                Back
              </button>
            )}
      
            {step < 3 && (
              <button
              type="submit"
              className="bg-blue-500 px-6 py-1.5 rounded-lg text-white hover:bg-blue-600"
               >
              Next
            </button>
            )}
            {step === 3 && (
              <button
              type="submit"
              className="bg-blue-500 px-6 py-1.5 rounded-lg text-white hover:bg-blue-600"
            >
              Submit
            </button>
            )}
          </div>
        
      </div>
    </div>
    </form>
  );
};

interface stepOnProps {
  value: any;
  value2: any;
  onChange1: any;
  onChange2: any;
}
const Step1 = ({ value, value2, onChange1,onChange2 }: stepOnProps) => (
  <div>
    <div className="mb-4">
        <label className="block font-medium mb-2 text-gray-700" htmlFor="username">
        username
        </label>
        <input
          type="text"
          id="username"
          name="username"
          className="w-full border border-gray-400 p-2"
          value={value}
          onChange={onChange1}
        />
      </div>
      <div className="mb-4">
      <label
        className="block font-medium mb-2 text-gray-700"
        htmlFor="password"
      >
        Password
      </label>
      <input
        type="password"
        id="password"
        name="password"
        className="w-full border border-gray-400 p-2"
        onChange={onChange2}
        value={value2}
      />
      </div>
  </div>
);

// Step1.validationSchema = Yup.object({
//   firstName: Yup.string().required('required'),
// });

interface stepTwoProps {
  value: any;
  value2: any;
  onChange1: any;
}
const Step2 = ({ value, value2, onChange1 }: stepTwoProps) => (
  <div>
    <div className="mb-4">
        <label className="block font-medium mb-2 text-gray-700" htmlFor="fullname">
        Full Name
        </label>
        <input
          type="text"
          id="fullname"
          name="fullname"
          className="w-full border border-gray-400 p-2"
          value={value}
          onChange={onChange1}
        />
      </div>
      <div className="mb-4">
      <label
        className="block font-medium mb-2 text-gray-700"
        htmlFor="HpNumber"
      >
        Phone Number
      </label>
      <input
        type="number"
        id="HpNumber"
        name="HpNumber"
        className="w-full border border-gray-400 p-2"
        onChange={onChange1}
        value={value2}
      />
      </div>
  </div>
);

interface steptwoProps {
  value: any;
  onChange: any;
}
const Step3 = ({ value, onChange }: steptwoProps) => (
  <div>
    <div className="mb-4">
      <label className="block font-medium mb-2 text-gray-700" htmlFor="email">
        email
      </label>
      <input
        type=""
        id="email"
        name="email"
        className="w-full border border-gray-400 p-2"
        onChange={onChange}
        value={value}
      />
    </div>
  </div>
);

export default MultiStepForm;
