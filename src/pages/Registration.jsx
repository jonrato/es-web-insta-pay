import { useFormik } from "formik";
import React from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";
import InputField from "../components/Input";
import { BeatLoader } from "react-spinners";
import { userRegister } from "../redux/authSlice";
import { registrationSchema } from "../validation/Schema";
import "./pages.css";
const Registration = () => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.auth);
  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
      dob: "",
      gender: "",
      password: "",
      confirmPassword: "",
      whatsapp: "",
    },
    validationSchema: registrationSchema,
    onSubmit: () => {
      const body = {
        name: formik.values.name,
        email: formik.values.email,
        gender: formik.values.gender,
        password: formik.values.password,
        confirmPassword: formik.values.confirmPassword,
      };

      dispatch(userRegister(body)).then((data) => {
        if (data.payload) {
          toast.success("Registrado com sucesso!!!");
          navigate("/dashboard");
        }
      });
    },
  });

  const navigate = useNavigate();
  return (
    <div className="flex justify-center">
      <div className=" flex flex-col justify-center items-center pt-5 lg:p-20">
        <h1 className="text-2xl mb-5 font-medium w-full text-center text-[#171C33]">
          Registra tu cuenta
        </h1>
        <form
          onSubmit={formik.handleSubmit}
          className="form w-full  p-4 pb-12 rounded-xl"
        >
          <InputField
            plain
            label="Nome"
            type="text"
            id="name"
            name="name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
          />
          {formik.touched.name && formik.errors.name ? (
            <ErrorMessage>{formik.errors.name}</ErrorMessage>
          ) : null}
          <InputField
            plain
            type="email"
            label="Su Email"
            id="email"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email ? (
            <ErrorMessage>{formik.errors.email}</ErrorMessage>
          ) : null}
          <div className="flex gap-5">
            <div>
              <InputField
                type="date"
                plain
                label="Fecha de nacimiento"
                id="dob"
                name="dob"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.dob}
              />
              {formik.touched.dob && formik.errors.dob ? (
                <ErrorMessage>{formik.errors.dob}</ErrorMessage>
              ) : null}
            </div>
          </div>
          <InputField
            plain
            type="text"
            id="whatsapp"
            label="Whatsapp"
            name="whatsapp"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.whatsapp}
          />
          {formik.touched.whatsapp && formik.errors.whatsapp ? (
            <ErrorMessage>{formik.errors.email}</ErrorMessage>
          ) : null}

          <label for="gender">Género</label>
          <select
            name="gender"
            id="Gênero"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.gender}
            className="w-full shadow-xl rounded h-12 mb-2 bg-transparent outline-none"
          >
            <option value="" label="Selecione o Gênero">
              Selecciona el Gênero
            </option>
            <option className="cursor-pointer" value="Male">
              Masculino
            </option>
            <option className="cursor-pointer" value="Female">
              Feminino
            </option>
          </select>
          {formik.touched.gender && formik.errors.gender ? (
            <ErrorMessage>{formik.errors.email}</ErrorMessage>
          ) : null}
          <InputField
            type="password"
            id="password"
            plain
            label="Seña"
            name="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password ? (
            <ErrorMessage>{formik.errors.password}</ErrorMessage>
          ) : null}
          <InputField
            type="password"
            id="confirmPassword"
            plain
            label="Confirmar Seña"
            name="confirmPassword"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.confirmPassword}
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
            <ErrorMessage>{formik.errors.confirmPassword}</ErrorMessage>
          ) : null}
          <div className="flex justify-center">
            <button
              type="submit"
              className=" px-20 py-3 bg-dark-purple rounded-lg text-[#fff] font-medium text-lg mt-10"
            >
              {isLoading ? (
                <BeatLoader color="#9e8cb8" loading={true} size={6} />
              ) : (
                "Registrar"
              )}
            </button>
          </div>
          <p className="text-center mt-5 font-semibold">
            ¿Ya tienes una cuenta?{" "}
            <span
              className="cursor-pointer text-dark-purple "
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Registration;
