<template>
  <div v-if="!isLoading">
    <div class="grid gap-2 mt-2">
      <label class="text text-lg font-bold capitalize">Create User</label>
      <div>
        <MoleculesBaseForm
          :intial-values="formValues"
          :on-submit="handleFormSubmit"
          :submit-button-text="'Create'"
          :submit-button-boolean="false"
        >
          <div
            class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-3 mb-2"
          >
            <AtomsInputComponent
              placeholder="Username"
              :disabled="false"
              :err="errors.userNameError"
              type="text"
              :message="messages.userNameMessage"
              v-model="formValues.userName"
            />
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
              placeholder="Password"
              :disabled="false"
              :err="errors.passwordError"
              type="password"
              :message="messages.passwordMessage"
              v-model="formValues.password"
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
        <p v-if="isError" class="text-red-500 mt-2 text-lg animate-pulse">
          {{ isError }}
        </p>
      </div>
    </div>
    <label class="label mt-2">List Users</label>
    <div class="h-80 overflow-auto mt-1">
      <table class="table">
        <thead>
          <tr>
            <th>UserName</th>
            <th>FirstName</th>
            <th>LastName</th>
            <th>Age</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody
          :class="{
            'font-bold text-slate-950': store.selectedTheme === 'acid',
            'font-bold text-slate-200': store.selectedTheme !== 'acid',
          }"
        >
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.userName }}</td>
            <td>{{ user.firstName }}</td>
            <td>{{ user.lastName }}</td>
            <td>{{ user.age }}</td>
            <td>{{ user.role }}</td>
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
</template>

<script setup lang="tsx">
import { apiSC } from "~/services/api/api.config";

const store = useMyStore();

interface FormValues {
  userName: string;
  firstName: string;
  lastName: string;
  age: number;
  password: string;
  role: string;
}

const formValues = ref<FormValues>({
  userName: "",
  firstName: "",
  lastName: "",
  age: 0,
  password: "",
  role: "user",
});

let users = ref<
  Array<{
    userName: string;
    id: number;
    firstName: string;
    lastName: string;
    age: number;
    password: string;
    role: string;
  }>
>([]);

let isLoading = ref<boolean>(false);
let isError = ref<string | undefined>(undefined);
let accessToken = ref<string | null>("");
if (process.client) {
  accessToken.value = localStorage.getItem("access_token");
}

let errors = ref<{
  userNameError: boolean;
  firstNameError: boolean;
  lastNameError: boolean;
  ageError: boolean;
  passwordError: boolean;
  roleError: boolean;
}>({
  userNameError: false,
  firstNameError: false,
  lastNameError: false,
  ageError: false,
  passwordError: false,
  roleError: false,
});

let messages = ref<{
  userNameMessage: string;
  firstNameMessage: string;
  lastNameMessage: string;
  ageMessage: string;
  passwordMessage: string;
  roleMessage: string;
}>({
  userNameMessage: "",
  firstNameMessage: "",
  lastNameMessage: "",
  ageMessage: "",
  passwordMessage: "",
  roleMessage: "",
});

const handleFormSubmit = async (formState: FormValues) => {
  try {
    errors.value = {
      userNameError: false,
      firstNameError: false,
      lastNameError: false,
      ageError: false,
      passwordError: false,
      roleError: false,
    };
    messages.value = {
      userNameMessage: "",
      firstNameMessage: "",
      lastNameMessage: "",
      ageMessage: "",
      passwordMessage: "",
      roleMessage: "",
    };

    if (!formState.firstName || formState.firstName.length < 3) {
      messages.value.firstNameMessage =
        "First Name must contain at least three words.";
      errors.value.firstNameError = true;
      console.log("Validating First Name", errors.value.firstNameError);
    }

    if (!formState.lastName || formState.lastName.length < 3) {
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

    if (!formState.userName || formState.userName.length < 3) {
      messages.value.userNameMessage =
        "Username must contain at least three words.";
      errors.value.userNameError = true;
    }

    if (!formState.password || formState.password.length < 6) {
      messages.value.passwordMessage =
        "Password must contain at least eight characters.";
      errors.value.passwordError = true;
    }

    if (
      !errors.value.firstNameError &&
      !errors.value.lastNameError &&
      !errors.value.ageError &&
      !errors.value.userNameError &&
      !errors.value.passwordError
    ) {
      const response = await apiSC.get("dev/v1");
      if (response.data.statusCode === 202) {
        try {
          const config = {
            headers: { Authorization: `Bearer ${accessToken.value}` },
          };
          const sendDataUsers = await apiSC.post(
            "/dev/v1/users",
            formState,
            config
          );
          console.log(sendDataUsers.data);

          formValues.value.firstName = "";
          formValues.value.lastName = "";
          formValues.value.age = 0;
          location.reload();
        } catch (err: any) {
          if (err.response) {
            console.log("Error :\n", err.response.data.message);
            isError.value = err.response.data.message;
          }
        }
      }
    }
  } catch (error: any) {
    console.log("Error On Validation, Please Check");
    isError.value = error.response.data.message;
  }
};

const getData = async () => {
  isLoading.value = true;
  const config = {
    headers: { Authorization: `Bearer ${accessToken.value}` },
  };
  try {
    const response = await apiSC.get("/dev/v1/users", config);
    users.value = response.data.user;
    isLoading.value = false;
  } catch (err: any) {
    console.log(err.response.data);
    if (err.response.data.statusCode === 401) {
      console.log(
        `Login dahulu, Error Response: ${err.response.data.statusCode} ${err.response.data.error} `
      );
    }
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
      isError.value = err.response.data.message;
    }
  } else {
    console.log("aborted");
  }
};

onMounted(() => {
  if (store.isLoggedIn) {
    getData();
    console.log("Data token:", accessToken);
  } else {
    console.log("Logged in false");
  }
});

watch(
  () => store.isLoggedIn,
  (newVal) => {
    if (newVal) {
      getData();
      console.log("Data token:", accessToken);
    } else {
      console.log("Logged in false");
    }
  }
);
</script>
