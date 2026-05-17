import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import css from "./Filter.module.css";
import { FormValues } from "../../../../types/car";

type FilterProps = {
  brands: string[];
  prices : number[];
  onSubmit: (values: FormValues) => void;
};

export function Filter({ brands, prices, onSubmit }: FilterProps) {

  const initialValues: FormValues = {
    brand: "",
    price: "",
    minMileage: "",
    maxMileage: "",
  };

  const validationSchema = Yup.object().shape({
    brand: Yup.string(),
    price: Yup.string(),
    minMileage: Yup.number().typeError("Mileage must be a number").nullable(),
    maxMileage: Yup.number()
      .typeError("Mileage must be a number")
      .nullable()
      .test(
        "maxMileage",
        "Minimum mileage must be less than maximum mileage.",
        function (value) {
          const { minMileage } = this.parent;
          if (!minMileage || !value) return true;
          return minMileage < value;
        },
      ),
  });

  const handleSubmit = (values: FormValues) => {
    onSubmit(values);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isValid, resetForm }) => (
        <Form className={css.filterContainer}>
          <div className={css.inputsContainer}>
          <div>
            <label htmlFor="brand" className={css.label}>
              Car brand
            </label>
            <Field as="select" name="brand" className={css.selectBrand}>
              <option value="">Select a brand</option>
              {brands.map((brand) => (
                <option key={brand} value={brand}>
                  {brand}
                </option>
              ))}
            </Field>
          </div>

          <div className={css.priceContainer}>
            <label htmlFor="price" className={css.label}>
              Price / 1 hour
            </label>
            <Field as="select" name="price" className={css.selectPrice}>
              <option value="">Choose a price</option>
              {prices.map((price) => (
                <option key={price} value={price}>
                  {price}
                </option>
              ))}
            </Field>
          </div>

          <div className={css.mileageGroup}>
            <label className={css.label}>Car mileage / km</label>

            <div className={css.mileageInputs}>
              <div className={css.inputWrapper}>
                <span className={css.inputPrefix}>From</span>
                <Field
                  type="number"
                  name="minMileage"
                  className={css.inputFrom}
                />
              </div>

              <div className={css.inputWrapper}>
                <span className={css.inputPrefix}>To</span>
                <Field
                  type="number"
                  name="maxMileage"
                  className={css.inputTo}
                />
              </div>
            </div>

            <ErrorMessage
              name="maxMileage"
              component="p"
              className={css.errorMessage}
            />
          </div>
          </div>
          <div className={css.buttonContainer}>
            <button
              type="submit"
              className={css.buttonSearch}
              disabled={!isValid}
            >
              Search
            </button>

            <button
              type="button"
              className={css.buttonClear}
              disabled={false}
              onClick={() => {
                resetForm();
                onSubmit(initialValues);
              }}
            >
              Clear filters
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
