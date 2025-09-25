import React from 'react'
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { AuthPage, CustomFloatingLabel, CustomFormControl, Button } from './Signin.styles'
import { Form } from 'react-bootstrap'
import { Formik } from 'formik'
import { useNavigate } from 'react-router-dom';
import { BrandIcon } from '../../components/BrandIcon';

const validationSchema = Yup.object({
    email: Yup.string()
          .email("Invalid email address")
          .required("Email address is required"),
    password: Yup.string()
          .required("Password is required")
          .min(6, "Password must be at least 6 character")
          .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
          .matches(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character"),
})

export const SignIn = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {email: '', password: ''},
    validationSchema,
    onSubmit: (values) => {
        console.log('Form Data', values);
        navigate('/dashboard');
    }
  })
  return (
    <AuthPage>  
        <BrandIcon/>
        <Form onSubmit={formik.handleSubmit} >
            <CustomFloatingLabel label="Email" className='mb-3'>
                <CustomFormControl 
                    type="email"
                    name="email"
                    placeholder="name@example.com"
                    value={formik.values.email} 
                    onChange={formik.handleChange}
                    onBlur={formik.onBlur}
                />
                {formik.touched.email && formik.errors.password && (
                    <div style={{color: "#e00000", textAlign: "left"}}>{formik.errors.email}</div>
                )}
            </CustomFloatingLabel>
            <CustomFloatingLabel label="Password" className='mb-4'>
                <CustomFormControl
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.onBlur}
                />
                 {formik.touched.password && formik.errors.password && (
                    <div style={{color: "#e00000", textAlign: "left"}}>{formik.errors.password}</div>
                )}
            </CustomFloatingLabel>
            <Button type="submit">Sign In</Button>
        </Form>
    </AuthPage>
  )
}
