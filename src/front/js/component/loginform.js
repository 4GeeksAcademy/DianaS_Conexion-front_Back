import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import swal from 'sweetalert';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import "../../styles/index.css";

export const LoginForm = () => {

    const { actions } = useContext(Context)
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            inputEmail: '',
            inputPassword: ''
        },
        validationSchema: Yup.object({
            inputEmail: Yup.string().email('email invalido').required('El email es obligatorio'),
            inputPassword: Yup.string().max(8, 'Debe tener 8 caracteres máximo').min(6, 'Debe tener 6 caracteres mínimo')
                .required('La contraseña es obligatoria'),
        }),
        onSubmit: values => {
            async function handleSubmit() {
                let isLogged = await actions.login(values.inputEmail, values.inputPassword)
                if (isLogged) {
                    const token = localStorage.getItem('token');
                    if (token) {
                        navigate("/");
                } else {
                    swal("Error", "No se pudo obtener el token", "error");
                }
                } else {
                    console.error("correo o contraseña incorrectos");
                    swal("Correo o contraseña incorrectos", "Por favor inténtelo de nuevo", "error")
            }
        };
            handleSubmit()
        },
    });
    return (
        <div className="contactForm">
            <h2 className="text-center pb-4">Iniciar sesión</h2>
            <form onSubmit={formik.handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="inputEmail" className="form-label subtitle">Correo electrónico</label>
                    <input type="email" className="form-control" id="inputEmail" name="inputEmail" placeholder="Ingrese su correo electrónico" onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.inputEmail} />
                    {formik.touched.inputEmail && formik.errors.inputEmail ? (
                        <div className="text-danger">{formik.errors.inputEmail}</div>
                    ) : null}
                </div>
                <div className="mb-2">
                    <label htmlFor="exampleInputPassword" className="form-label subtitle">Contraseña</label>
                    <input type="password" className="form-control" name="inputPassword" id="inputPassword" placeholder="xxxxxxx" onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.inputPassword} />
                    {formik.touched.inputPassword && formik.errors.inputPassword ? (
                        <div className="text-danger">{formik.errors.inputPassword}</div>
                    ) : null}
                </div>
                <div className="d-flex justify-content-center mt-5">
                    <button type="submit" className="login btn-lg btn-custom">Iniciar sesión</button>
                </div>
            </form>
        </div>
    )
};



