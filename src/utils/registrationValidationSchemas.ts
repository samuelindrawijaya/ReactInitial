import * as Yup from 'yup'

const stepOneSchema = Yup.object().shape({
  stepOne: Yup.object({
    username: Yup.string().required('Username is required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .matches(/[a-z]/, 'Password must contain a lowercase letter')
      .matches(/[A-Z]/, 'Password must contain an uppercase letter')
      .matches(/[0-9]/, 'Password must contain a number')
      .matches(/[!@#$%^&*]/, 'Password must contain a special character')
      .required('Password is required')
  })
})

const stepTwoSchema = Yup.object().shape({
  stepTwo: Yup.object({
    fullname: Yup.string().required('Full name is required'),
    HpNumber: Yup.string().required('Hp number is required'),
  })
})

const stepThreeSchema = Yup.object().shape({
  stepThree: Yup.object({
    email: Yup.string()
      .required('Email is required')
      .matches(
        /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        'Invalid email format'
      )
  })
})

export { stepOneSchema, stepTwoSchema, stepThreeSchema }
