import { useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Dropzone from "react-dropzone";
import { useRouter } from "next/dist/client/router";

const schema = yup.object().shape({
  firstName: yup
    .string()
    .matches(/^([^0-9]*)$/, "First Name should not contain numbers")
    .required("First Name is a required field"),
  files: yup
    .array()
    .min(1, "You didnt select a file")
    .required("You must select a file!"),
});

export default function Home() {
  const [files, setFiles] = useState([]);
  const router = useRouter();

  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const onSubmit = (formData) => {
    // Handle our stuff here...

    console.log("WOOP", formData);
  };

  console.log(errors);
  console.log(files);

  return (
    <div>
      <h1>My magic form</h1>
      <button onClick={() => router.push("/contact")}>
        Click me to contact me
      </button>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col bg-gray-300 p-5 space-y-2"
      >
        <input
          {...register("firstName")}
          type="text"
          placeholder="First Name"
        />
        <p>{errors.firstName?.message}</p>

        <Controller
          name="files"
          control={control}
          defaultValue={[]}
          render={({ field: { onChange, value } }) => (
            <Dropzone
              onDrop={(acceptedFiles) => onChange([...value, acceptedFiles])}
            >
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p>
                      Drag 'n' drop some files here, or click to select files
                    </p>
                    <p className="text-red-500">{errors.files?.message}</p>
                  </div>
                </section>
              )}
            </Dropzone>
          )}
        />

        <button type="submit">Send all my details</button>
      </form>
    </div>
  );
}
