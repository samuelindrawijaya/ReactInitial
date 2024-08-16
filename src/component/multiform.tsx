import { useState } from "react";
// import RegisterForm from "./RegisterFrom";
// import { saveData } from "../interface/userData";
import { Form, Formik, FormikProps, ErrorMessage, useFormik } from "formik";
import * as Yup from "yup";
import { userData } from "../interface/userData";
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

  const Step1Validation = Yup.object({
    username: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Required")
  });


  const formik = useFormik<userData>({
    initialValues: {
      stepOne: {
        username: '',
        password: ''
      },
      stepTwo : {
        fullname  :'',
        HpNumber : '',
      },
      stepThree : {
        email : ''
      }
    },
    onSubmit: (values, { setSubmitting }) => {
      setTimeout(() => {
        handleSubmit(step, values)
        setSubmitting(false)
        console.log(values)
      }, 400)
    }
  })
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
                values={formik.values.stepOne}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                errors={formik.errors}
                touched={formik.touched}
              />
            ) : step === 2 ? (
              <Step2
                values={formik.values.stepTwo}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                errors={formik.errors}
                touched={formik.touched}
              />
            ) : (
              <Step3
              values={formik.values.stepThree}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              errors={formik.errors}
              touched={formik.touched}
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

// interface stepOnProps {
//   value: any;
//   value2: any;
//   onChange1: any;
//   onChange2: any;
// }

interface stepOnProps {
  values: {
    username: string
    password: string
  }
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void
  errors: {
    stepOne?: {
      username?: string
      password?: string
    }
  }
  touched: {
    stepOne?: {
      username?: boolean
      password?: boolean
    }
  }
}
const Step1 = ({ values, onChange, onBlur,errors,touched }: stepOnProps) => (
  <div>
    <div className="mb-4">
        <label className="block font-medium mb-2 text-gray-700" htmlFor="username">
        username
        </label>
        <input
          type="text"
          id="username"
          name='stepOne.username'
          className="w-full border border-gray-400 p-2"
          value={values.username}
          onChange={onChange}
          onBlur={onBlur}
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
        name='stepOne.password'
        className="w-full border border-gray-400 p-2"
        onChange={onChange}
        value={values.password}
      />
      </div>
  </div>
);

// Step1.validationSchema = Yup.object({
//   firstName: Yup.string().required('required'),
// });


interface stepTwoProps {
  values: {
    fullname: string
    HpNumber: string
  }
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void
  errors: {
    stepTwo?: {
      fullname?: string
      HpNumber?: string
    }
  }
  touched: {
    stepTwo?: {
      fullname?: boolean
      HpNumber?: boolean
    }
  }
}
const Step2 = ({ values, onChange, onBlur, errors,touched }: stepTwoProps) => (
  <div>
    <div className="mb-4">
        <label className="block font-medium mb-2 text-gray-700" htmlFor="fullname">
        Full Name
        </label>
        <input
          type="text"
          id="fullname"
          name="stepTwo.fullname"
          className="w-full border border-gray-400 p-2"
          value={values.fullname}
          onChange={onChange}
          onBlur={onBlur}
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
        name="stepTwo.HpNumber"
        className="w-full border border-gray-400 p-2"
        onChange={onChange}
        value={values.HpNumber}
        onBlur={onBlur}
      />
      </div>
  </div>
);

interface stepThreeProps {
  values: {
    email: string
  }
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void
  errors: {
    stepThree?: {
      email?: string
    }
  }
  touched: {
    stepThree?: {
      email?: boolean
    }
  }
}
const Step3 = ({ values, onChange, onBlur, errors , touched }: stepThreeProps) => (
  <div>
    <div className="mb-4">
      <label className="block font-medium mb-2 text-gray-700" htmlFor="email">
        email
      </label>
      <input
        type="email"
        id="email"
        name="stepThree.email"
        className="w-full border border-gray-400 p-2"
        onChange={onChange}
        value={values.email}
        onBlur={onBlur}
      />
    </div>
  </div>
);

export default MultiStepForm;
