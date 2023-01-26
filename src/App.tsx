import { FormEvent, useState } from "react";
import { AccountForm } from "./forms/AccountForm";
import { AddressForm } from "./forms/AddressForm";
import { UserForm } from "./forms/userForm";
import { useMultistepForm } from "./useMultistepForm";

interface FormData {
  firstName: string;
  lastName: string;
  age: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  email: string;
  password: string;
}

const INITIAL_DATA: FormData = {
  firstName: "",
  lastName: "",
  age: "",
  street: "",
  city: "",
  state: "",
  zip: "",
  email: "",
  password: "",
};

function App() {
  const [data, setData] = useState(INITIAL_DATA);

  function updateFields(fields: Partial<FormData>) {
    setData(prevData => {
      return {
        ...prevData,
        ...fields
      }
    })
  }

  const { steps, currentStepIndex, step, isFirstStep, isLastStep, next, back } =
    useMultistepForm([
      <UserForm {...data} updateFields={updateFields} />,
      <AddressForm {...data} updateFields={updateFields} />,
      <AccountForm {...data} updateFields={updateFields} />,
    ]);

  function onSubmitForm(e: FormEvent) {
    e.preventDefault();
    next();
    if(isLastStep) {
      alert("Successful Account Creation!")
      window.location.reload();
    }
  }

  return (
    <div className="relative bg-white border-black border-2 p-8 m-4 rounded-lg max-w-max">
      <form onSubmit={onSubmitForm}>
        <div className="absolute top-2 right-2">
          {currentStepIndex + 1} / {steps.length}
        </div>
        {step}
        <div className="mt-4 flex gap-2 justify-end">
          {!isFirstStep && (
            <button
              type="button"
              onClick={back}
              className="bg-gray-300 px-2 rounded-sm py-1"
            >
              Back
            </button>
          )}
          <button type="submit" className="bg-gray-300 px-2 rounded-sm">
            {isLastStep ? "Finish" : "Next"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default App;
