<template>
  <div>
    <MoleculesBaseForm
      :intial-values="formValues"
      :on-submit="handleFormSubmit"
      :submit-button-text="'Login'"
    >
      <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-1 gap-3 mb-2">
        <AtomsInputComponent
          placeholder="Username"
          :err="errors.userNameError"
          :message="messages.userNameMessage"
          type="text"
          v-model="formValues.userName"
        />
        <AtomsInputComponent
          placeholder="Password"
          :err="errors.passwordError"
          type="password"
          :message="messages.passwordMessage"
          v-model="formValues.password"
        />
      </div>
    </MoleculesBaseForm>
  </div>
</template>

<script setup lang="tsx">
interface FormValues {
  userName: string;
  password: string;
}

const formValues = ref<FormValues>({
  userName: "",
  password: "",
});

let errors = ref<{
  userNameError: boolean;
  passwordError: boolean;
}>({
  userNameError: false,
  passwordError: false,
});

let messages = ref<{
  userNameMessage: string;
  passwordMessage: string;
}>({
  userNameMessage: "",
  passwordMessage: "",
});

const handleFormSubmit = async (formState: FormValues) => {
  try {
    errors.value = {
      userNameError: false,
      passwordError: false,
    };
    messages.value = {
      userNameMessage: "",
      passwordMessage: "",
    };

    if (!formState.userName || formState.userName.length < 3) {
      messages.value.userNameMessage =
        "Username must contain at least 3 words.";
      errors.value.userNameError = true;
    }

    if (!formState.password || formState.password.length < 4) {
      messages.value.passwordMessage =
        "Password must contain at least 4 characters.";
      errors.value.passwordError = true;
    }

    if (!errors.value.userNameError && !errors.value.passwordError) {
      console.log("Everything is removed");
    }
  } catch (error: any) {
    console.log(error);
  }
};
</script>
