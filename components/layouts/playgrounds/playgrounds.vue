<template>
  <div>
    <div v-if="!isLoading">
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
                :err="errors.firstNameError"
                :message="messages.firstNameMessage"
                type="text"
                v-model="formValues.firstName"
              />
              <AtomsInputComponent
                placeholder="Last Name"
                :disabled="false"
                :err="errors.lastNameError"
                type="text"
                :message="messages.lastNameMessage"
                v-model="formValues.lastName"
              />
              <AtomsInputComponent
                placeholder="Age"
                :disabled="false"
                :err="errors.ageError"
                type="number"
                :message="messages.ageMessage"
                v-model="formValues.age"
              />
            </div>
          </MoleculesBaseForm>
        </div>
      </div>
      <label class="label">List Users</label>
      <div class="h-96 overflow-auto mt-3">
        <table class="table">
          <thead>
            <tr>
              <th>FirstName</th>
              <th>LastName</th>
              <th>Age</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody class="text-white">
            <tr v-for="user in users" :key="user.id">
              <td>{{ user.firstName }}</td>
              <td>{{ user.lastName }}</td>
              <td>{{ user.age }}</td>
              <td>
                <AtomsButtonComponent
                  label=""
                  variant="primary"
                  :disabled="false"
                  @click="removeUsers(user.id)"
                >
                  <Icon name="material-symbols:delete" size="24px"
                /></AtomsButtonComponent>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div v-else>
      <AtomsLoadingComponent label="Please Wait ..." size="50" />
    </div>
  </div>
</template>

<script setup lang="tsx">
import { apiSC } from "~/services/api/api.config";

interface FormValues {
  firstName: string;
  lastName: string;
  age: number;
}

const formValues = ref<FormValues>({
  firstName: "",
  lastName: "",
  age: 0,
});

let users = ref<
  Array<{ id: number; firstName: string; lastName: string; age: number }>
>([]);

let isLoading = ref<boolean>(false);

let errors = ref<{
  firstNameError: boolean;
  lastNameError: boolean;
  ageError: boolean;
}>({
  firstNameError: false,
  lastNameError: false,
  ageError: false,
});

let messages = ref<{
  firstNameMessage: string;
  lastNameMessage: string;
  ageMessage: string;
}>({
  firstNameMessage: "",
  lastNameMessage: "",
  ageMessage: "",
});

const handleFormSubmit = async (formState: FormValues) => {
  try {
    errors.value = {
      firstNameError: false,
      lastNameError: false,
      ageError: false,
    };
    messages.value = {
      firstNameMessage: "",
      lastNameMessage: "",
      ageMessage: "",
    };

    if (!formState.firstName || formState.firstName.length <= 3) {
      messages.value.firstNameMessage =
        "First Name must contain at least three words.";
      errors.value.firstNameError = true;
      console.log("Validating First Name", errors.value.firstNameError);
    }

    if (!formState.lastName || formState.lastName.length <= 3) {
      messages.value.lastNameMessage =
        "Last Name must contain at least three words.";
      errors.value.lastNameError = true;

      console.log("Validating Last Name", errors.value.lastNameError);
    }

    if (formState.age <= 0) {
      messages.value.ageMessage = "Age must be greater than zero";
      errors.value.ageError = true;

      console.log("Validating Age", errors.value.ageError);
    }

    if (
      !errors.value.firstNameError &&
      !errors.value.lastNameError &&
      !errors.value.ageError
    ) {
      const response = await apiSC.get("dev/v1");
      if (response.data.statusCode === 202) {
        try {
          const sendDataUsers = await apiSC.post("/dev/v1/users", formState);
          console.log(sendDataUsers.data);
        } catch (err: any) {
          if (err.response) {
            console.log("Error :\n", err.response.data.message);
          }
        }
      }
    }
  } catch (error) {
    console.log("Error On Validation, Please Check");
  }
};

const getData = async () => {
  isLoading.value = true;
  try {
    const response = await apiSC.get("/dev/v1/users");

    console.log(response.data.user);
    users.value = response.data.user;
    isLoading.value = false;
  } catch (err: any) {
    console.log(err.response.data);
    isLoading.value = false;
  }
};

const removeUsers = async (id: number) => {
  const validation = window.confirm(`Delete this users with ${id}`);

  if (validation) {
    try {
      console.log("id users", id);
      const response = await apiSC.delete(`/dev/v1/users/${id}`);

      console.log(response.data.message);
      location.reload();
    } catch (err: any) {
      console.log(err.response.data.message);
    }
  } else {
    console.log("aborted");
  }
};

onMounted(() => {
  getData();
});
</script>
