<template>
  <div>
    <div>
      <h1 class="text text-2xl font-bold capitalize">PLAYGROUND</h1>
      <br />
      <div class="animate__animated animate__fadeInDown">
        <h1 class="flex">
          Playground For Me and maybe for another user in the future. Stay Tuned
          :)
        </h1>
      </div>
      <hr class="h-px my-3 bg-gray-200 border-0 dark:bg-gray-700" />
    </div>
    <div class="grid gap-2 mt-2">
      <label class="text text-lg font-bold capitalize">Create User</label>
      <div>
        <MoleculesBaseForm
          :intial-values="formValues"
          :on-submit="handleFormSubmit"
        >
          <div class="flex gap-3 mb-2">
            <AtomsInputComponent
              placeholder="First Name"
              :disabled="false"
              :err="!formValues.firstName ? true : false"
              :message="errMessage"
              type="text"
              v-model="formValues.firstName"
            />
            <AtomsInputComponent
              placeholder="Last Name"
              :disabled="false"
              :err="!formValues.lastName ? true : false"
              type="text"
              :message="errMessage"
              v-model="formValues.lastName"
            />
            <AtomsInputComponent
              placeholder="Age"
              :disabled="false"
              :err="!formValues.age ? true : false"
              type="number"
              :message="errMessage"
              v-model="formValues.age"
            />
          </div>
        </MoleculesBaseForm>
      </div>
    </div>
    <br />
    <hr class="h-px my-1 bg-gray-200 border-0 dark:bg-gray-700" />
  </div>
</template>

<script setup lang="ts">
interface FormValues {
  firstName: string;
  lastName: string;
  age: number;
}

let setErr = ref<boolean>(false);
let errMessage = ref<string>("");

const formValues = ref<FormValues>({
  firstName: "",
  lastName: "",
  age: 0,
});

const handleFormSubmit = async (formState: FormValues) => {
  try {
    if (!formState.firstName) {
      errMessage.value = "Please fill First Name";
      setErr.value = true;
    } else if (!formState.lastName) {
      errMessage.value = "Please fill Last Name";
      setErr.value = true;
    }
    console.log("Form submitted with:", formState);
  } catch (err) {
    console.error("Submission failed:", err);
  }
};
</script>
