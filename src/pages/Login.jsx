import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import ErrorMessage from "../components/ErrorMessage";
import InputField from "../components/Input";
import { resetState, userLogin } from "../redux/authSlice";
import { getUserData, resetDashboardState } from "../redux/DashboardSlice";
import { loginSchema } from "../validation/Schema";
import "./pages.css";

const Login = () => {
  const navigate = useNavigate();
  const { isLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      const body = {
        email: formik.values.email,
        password: formik.values.password,
      };
      dispatch(userLogin(body)).then((data) => {
        if (data.payload === "undefined" || !data.payload) return;
        dispatch(getUserData());
        navigate("/dashboard");
      });
    },
  });

  useEffect(() => {
    dispatch(resetState());
    dispatch(resetDashboardState());
  }, [dispatch]);
  return (
    <div className="h-screen">
      <div className=" flex flex-col justify-center items-center h-screen  lg:p-20">
        <form
          onSubmit={formik.handleSubmit}
          className="w-full form p-4 pb-12 rounded-xl md:w-2/4"
        >
          <h1 className="text-2xl font-medium mb-10 w-full text-center text-[#171C33]">
            Inicia sesión y empieza a ganar
          </h1>
          <InputField
            type="text"
            label="Email"
            plain
            id="email"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email ? (
            <ErrorMessage>{formik.errors.email}</ErrorMessage>
          ) : null}
          <InputField
            type="password"
            plain
            label="Seña"
            id="password"
            name="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password ? (
            <ErrorMessage>{formik.errors.password}</ErrorMessage>
          ) : null}
          <div className="flex justify-center">
            <button
              type="submit"
              className="h-12 w-1/2 bg-dark-purple rounded-lg text-[#fff]  font-medium text-lg mt-10 flex justify-center items-center"
            >
              {isLoading ? (
                <BeatLoader color="#9e8cb8" loading={true} size={6} />
              ) : (
                "Login"
              )}
            </button>
          </div>
          <p className="text-center mt-5 font-semibold">
            ¿No tienes una cuenta?{" "}
            <span
              className="cursor-pointer text-dark-purple "
              onClick={() => navigate("/signup")}
            >
              Registro
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
