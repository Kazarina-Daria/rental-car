import css from "./BookingModal.module.css";
import { Formik, Form, Field } from "formik";
import { BookingRequest } from "../../../../types/bookingModal";
import * as Yup from "yup";

interface BookingModalProps {
  id: string;
  onSubmit :(values : BookingRequest, resetForm : ()=> void) => void;
}

export default function BookingModal(props: BookingModalProps) {
  const initialValues: BookingRequest = {
    name: "",
    email: "",
    comment: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    comment: Yup.string().max(500, "Comment must be at almost 500 characters"),
  });

  return (
    <section className={css.bookingSection}>
      <h2 className={css.titleBooking}>Book your car now</h2>
      <p className={css.description}>
        Stay connected! We are always ready to help you.
      </p>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => props.onSubmit(values, resetForm)}
      >
        <Form className={css.form}>
          <Field
            type="text"
            className={css.field}
            id="name"
            name="name"
            placeholder="Name*"
          />
          <Field
            type="email"
            className={css.field}
            id="email"
            name="email"
            placeholder="Email*"
          />
          <Field
            as="textarea"
            type="text"
            className={css.textField}
            id="comment"
            name="comment"
            placeholder="Comment"
          />

          <button type="submit" className={css.submitButton}>
            Buchen
          </button>
        </Form>
      </Formik>
    </section>
  );
}
